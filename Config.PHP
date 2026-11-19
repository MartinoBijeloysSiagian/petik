<?php
// Pengaturan koneksi database. Sesuaikan dengan MySQL kamu.
// XAMPP bawaan: pengguna "root" dengan kata sandi kosong.
// Hosting (cPanel): isi dengan nama database, pengguna, dan kata sandi yang kamu buat di sana.
const DB_HOST = 'localhost';
const DB_NAME = 'ruang_belajar_sk';
const DB_USER = 'root';
const DB_PASS = '';

function db(): PDO
{
    static $pdo = null;
    if ($pdo === null) {
        $pdo = new PDO(
            'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
            DB_USER,
            DB_PASS,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]
        );
    }
    return $pdo;
}