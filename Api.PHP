<?php
declare(strict_types=1);

require __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'httponly' => true,
    'samesite' => 'Lax',
    'secure' => !empty($_SERVER['HTTPS']),
]);
session_name('sk_sesi');
session_start();

const MODUL_ID = ['m1', 'm2', 'm3', 'm4', 'm5'];
const JUMLAH_SOAL = 10;

function kirim(array $data, int $kode = 200)
{
    http_response_code($kode);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function galat(string $pesan, int $kode = 400)
{
    kirim(['error' => $pesan], $kode);
}

function pengguna_saat_ini()
{
    if (empty($_SESSION['uid'])) {
        return null;
    }
    $s = db()->prepare('SELECT id, username, nama, kelas, role FROM users WHERE id = ?');
    $s->execute([$_SESSION['uid']]);
    $u = $s->fetch();
    return $u ?: null;
}

function wajib_login(): array
{
    $u = pengguna_saat_ini();
    if (!$u) {
        galat('Silakan masuk dulu.', 401);
    }
    return $u;
}

function data_pengguna(array $u): array
{
    return [
        'id' => (int) $u['id'],
        'username' => $u['username'],
        'nama' => $u['nama'],
        'kelas' => $u['kelas'],
        'role' => $u['role'],
    ];
}

function daftar_modul(?string $json): array
{
    $d = json_decode($json ?? '[]', true);
    if (!is_array($d)) {
        return [];
    }
    return array_values(array_filter($d, function ($x) {
        return is_string($x) && in_array($x, MODUL_ID, true);
    }));
}

function progres_pengguna(int $uid): array
{
    $s = db()->prepare('SELECT modul_selesai, nilai_terbaik FROM progress WHERE user_id = ?');
    $s->execute([$uid]);
    $r = $s->fetch();
    return [
        'done' => $r ? daftar_modul($r['modul_selesai']) : [],
        'best' => ($r && $r['nilai_terbaik'] !== null) ? (int) $r['nilai_terbaik'] : null,
    ];
}

function wajib_post(string $metode)
{
    if ($metode !== 'POST') {
        galat('Metode tidak diizinkan.', 405);
    }
}

$aksi = $_GET['aksi'] ?? '';
$metode = $_SERVER['REQUEST_METHOD'];
$in = [];

if ($metode === 'POST') {
    // Header ini hanya bisa dikirim dari halaman kita sendiri (perlindungan CSRF dasar).
    if (($_SERVER['HTTP_X_REQUESTED_WITH'] ?? '') !== 'fetch') {
        galat('Permintaan tidak valid.');
    }
    $mentah = file_get_contents('php://input');
    $in = json_decode(($mentah === false || $mentah === '') ? '{}' : $mentah, true);
    if (!is_array($in)) {
        galat('Data tidak valid.');
    }
}

try {
    switch ($aksi) {
        case 'saya':
            $u = pengguna_saat_ini();
            kirim([
                'user' => $u ? data_pengguna($u) : null,
                'progress' => $u ? progres_pengguna((int) $u['id']) : null,
            ]);
            break;

        case 'daftar':
            wajib_post($metode);
            $username = strtolower(trim((string) ($in['username'] ?? '')));
            $nama = trim((string) ($in['nama'] ?? ''));
            $kelas = trim((string) ($in['kelas'] ?? ''));
            $pass = (string) ($in['password'] ?? '');

            if (!preg_match('/^.{1,100}$/su', $nama)) {
                galat('Isi nama lengkap (maksimal 100 karakter).');
            }
            if (!preg_match('/^.{0,30}$/su', $kelas)) {
                galat('Kelas maksimal 30 karakter.');
            }
            if (!preg_match('/^[a-z0-9][a-z0-9._-]{2,29}$/', $username)) {
                galat('NIS atau nama pengguna harus 3 sampai 30 karakter berupa huruf, angka, titik, garis bawah, atau strip.');
            }
            if (strlen($pass) < 8 || strlen($pass) > 72) {
                galat('Kata sandi harus 8 sampai 72 karakter.');
            }

            try {
                $s = db()->prepare('INSERT INTO users (username, nama, kelas, password_hash) VALUES (?, ?, ?, ?)');
                $s->execute([$username, $nama, $kelas, password_hash($pass, PASSWORD_DEFAULT)]);
            } catch (PDOException $e) {
                if ($e->getCode() === '23000') {
                    galat('NIS atau nama pengguna ini sudah terdaftar. Pilih tab Masuk.', 409);
                }
                throw $e;
            }
            $uid = (int) db()->lastInsertId();
            session_regenerate_id(true);
            $_SESSION['uid'] = $uid;
            $u = pengguna_saat_ini();
            kirim(['user' => data_pengguna($u), 'progress' => progres_pengguna($uid)]);
            break;

        case 'masuk':
            wajib_post($metode);
            $username = strtolower(trim((string) ($in['username'] ?? '')));
            $pass = (string) ($in['password'] ?? '');
            $s = db()->prepare('SELECT id, password_hash FROM users WHERE username = ?');
            $s->execute([$username]);
            $row = $s->fetch();
            if (!$row || !password_verify($pass, $row['password_hash'])) {
                usleep(700000); // memperlambat tebak-tebakan kata sandi
                galat('NIS atau kata sandi salah.', 401);
            }
            session_regenerate_id(true);
            $_SESSION['uid'] = (int) $row['id'];
            $u = pengguna_saat_ini();
            kirim(['user' => data_pengguna($u), 'progress' => progres_pengguna((int) $u['id'])]);
            break;

        case 'keluar':
            wajib_post($metode);
            $_SESSION = [];
            session_destroy();
            kirim(['ok' => true]);
            break;

        case 'simpan_progres':
            wajib_post($metode);
            $u = wajib_login();
            $daftar = (isset($in['done']) && is_array($in['done'])) ? $in['done'] : [];
            $bersih = array_values(array_unique(array_filter($daftar, function ($x) {
                return is_string($x) && in_array($x, MODUL_ID, true);
            })));
            $s = db()->prepare(
                'INSERT INTO progress (user_id, modul_selesai) VALUES (?, ?)
                 ON DUPLICATE KEY UPDATE modul_selesai = VALUES(modul_selesai)'
            );
            $s->execute([$u['id'], json_encode($bersih)]);
            kirim(['ok' => true]);
            break;

        case 'kuis':
            wajib_post($metode);
            $u = wajib_login();
            $skor = filter_var($in['skor'] ?? null, FILTER_VALIDATE_INT);
            if ($skor === false || $skor < 0 || $skor > JUMLAH_SOAL) {
                galat('Skor tidak valid.');
            }
            db()->prepare('INSERT INTO kuis_percobaan (user_id, skor, total) VALUES (?, ?, ?)')
                ->execute([$u['id'], $skor, JUMLAH_SOAL]);
            db()->prepare(
                'INSERT INTO progress (user_id, nilai_terbaik) VALUES (?, ?)
                 ON DUPLICATE KEY UPDATE nilai_terbaik = GREATEST(COALESCE(nilai_terbaik, 0), VALUES(nilai_terbaik))'
            )->execute([$u['id'], $skor]);
            kirim(['ok' => true]);
            break;

        case 'rekap':
            $u = wajib_login();
            if ($u['role'] !== 'guru') {
                galat('Halaman ini khusus guru.', 403);
            }
            $rows = db()->query(
                "SELECT u.nama, u.kelas, u.username, p.modul_selesai, p.nilai_terbaik,
                        (SELECT COUNT(*) FROM kuis_percobaan k WHERE k.user_id = u.id) AS percobaan
                 FROM users u
                 LEFT JOIN progress p ON p.user_id = u.id
                 WHERE u.role = 'siswa'
                 ORDER BY u.kelas, u.nama"
            )->fetchAll();
            $siswa = [];
            foreach ($rows as $r) {
                $siswa[] = [
                    'nama' => $r['nama'],
                    'kelas' => $r['kelas'],
                    'username' => $r['username'],
                    'modul' => count(daftar_modul($r['modul_selesai'])),
                    'nilai' => $r['nilai_terbaik'] !== null ? (int) $r['nilai_terbaik'] : null,
                    'percobaan' => (int) $r['percobaan'],
                ];
            }
            kirim(['siswa' => $siswa]);
            break;

        default:
            galat('Aksi tidak dikenal.', 404);
    }
} catch (PDOException $e) {
    error_log('Ruang Belajar SK: ' . $e->getMessage());
    galat('Terjadi masalah pada database. Periksa pengaturan di config.php dan pastikan database sudah di-import.', 500);
}