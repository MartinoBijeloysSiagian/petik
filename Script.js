(function () {
    "use strict";
  
    /* ---------- data ---------- */
    var MODULES = [
      { id: "m1", code: "M1", name: "Pengantar Sistem Komputer",
        goal: "Setelah modul ini kamu dapat menjelaskan komponen sistem komputer dan alur kerjanya.",
        html:
          "<h3>Apa itu sistem komputer?</h3>" +
          "<p>Sistem komputer adalah gabungan beberapa komponen yang bekerja sama untuk menerima data, mengolahnya, lalu menghasilkan informasi. Komponen itu dibagi menjadi tiga unsur.</p>" +
          "<div class='tablewrap'><table><thead><tr><th>Unsur</th><th>Arti</th><th>Contoh</th></tr></thead><tbody>" +
          "<tr><td><b>Hardware</b></td><td>Perangkat keras yang bisa disentuh</td><td>Keyboard, CPU, monitor, SSD</td></tr>" +
          "<tr><td><b>Software</b></td><td>Program yang memberi perintah ke hardware</td><td>Windows, Linux, browser, Word</td></tr>" +
          "<tr><td><b>Brainware</b></td><td>Manusia yang mengoperasikan dan mengelola sistem</td><td>Pengguna, teknisi, administrator</td></tr>" +
          "</tbody></table></div>" +
          "<h3>Alur kerja: input, proses, output, storage</h3>" +
          "<ul><li><b>Input</b>: data masuk lewat keyboard, mouse, mikrofon, atau kamera.</li>" +
          "<li><b>Proses</b>: CPU mengolah data sesuai instruksi program.</li>" +
          "<li><b>Output</b>: hasil ditampilkan lewat monitor, speaker, atau printer.</li>" +
          "<li><b>Storage</b>: data disimpan agar bisa dipakai lagi, misalnya di SSD atau flashdisk.</li></ul>" +
          "<div class='callout'><b>Contoh sehari-hari.</b> Saat kamu mengetik tugas di laptop: ketikan masuk lewat keyboard (input), diolah aplikasi dan CPU (proses), muncul di layar (output), lalu kamu tekan Simpan (storage).</div>"
      },
      { id: "m2", code: "M2", name: "Perangkat Keras Komputer",
        goal: "Setelah modul ini kamu dapat menyebutkan fungsi komponen utama di dalam komputer.",
        html:
          "<h3>Komponen utama</h3>" +
          "<div class='tablewrap'><table><thead><tr><th>Komponen</th><th>Fungsi</th><th>Catatan</th></tr></thead><tbody>" +
          "<tr><td><b>CPU</b></td><td>Menjalankan instruksi program dan mengolah data</td><td>Kecepatan dinyatakan dalam GHz, jumlah inti (core) memengaruhi kerja serentak</td></tr>" +
          "<tr><td><b>RAM</b></td><td>Memori kerja sementara untuk program yang sedang berjalan</td><td>Bersifat volatile: isinya hilang saat listrik padam</td></tr>" +
          "<tr><td><b>Storage (SSD/HDD)</b></td><td>Menyimpan data dan program secara permanen</td><td>SSD jauh lebih cepat dari HDD karena tanpa piringan berputar</td></tr>" +
          "<tr><td><b>Motherboard</b></td><td>Papan utama yang menghubungkan semua komponen</td><td>Menentukan jenis CPU dan RAM yang cocok</td></tr>" +
          "<tr><td><b>PSU</b></td><td>Mengubah listrik AC dari stopkontak menjadi DC untuk komponen</td><td>Daya dinyatakan dalam watt</td></tr>" +
          "<tr><td><b>GPU</b></td><td>Mengolah tampilan grafis</td><td>Bisa menyatu dengan CPU atau berupa kartu terpisah</td></tr>" +
          "</tbody></table></div>" +
          "<h3>Perbedaan RAM dan storage</h3>" +
          "<p>RAM ibarat meja kerja: cepat, tetapi terbatas dan dikosongkan saat selesai. Storage ibarat lemari arsip: lebih lambat, tetapi menyimpan data dalam waktu lama. Komputer dengan RAM kecil akan terasa lambat saat membuka banyak aplikasi sekaligus.</p>" +
          "<div class='callout'><b>Ingat.</b> Kapasitas RAM dan storage sama-sama memakai satuan GB, tetapi fungsinya berbeda. Laptop 8 GB RAM dan 512 GB SSD artinya memori kerja 8 GB dan ruang simpan 512 GB.</div>"
      },
      { id: "m3", code: "M3", name: "Perangkat Lunak dan Sistem Operasi",
        goal: "Setelah modul ini kamu dapat membedakan jenis perangkat lunak dan menyebutkan fungsi sistem operasi.",
        html:
          "<h3>Jenis perangkat lunak</h3>" +
          "<ul><li><b>Sistem operasi</b>: mengatur seluruh sumber daya komputer. Contoh: Windows, Linux, macOS, Android.</li>" +
          "<li><b>Aplikasi</b>: program untuk tugas pengguna. Contoh: pengolah kata, browser, editor video.</li>" +
          "<li><b>Utilitas dan driver</b>: program pendukung, misalnya antivirus atau driver printer yang membuat sistem operasi bisa berkomunikasi dengan perangkat.</li></ul>" +
          "<h3>Fungsi sistem operasi</h3>" +
          "<ul><li>Mengelola proses: membagi waktu CPU untuk banyak program.</li>" +
          "<li>Mengelola memori: mengatur pemakaian RAM oleh tiap program.</li>" +
          "<li>Mengelola file: menyusun data dalam folder dan menjaga hak akses.</li>" +
          "<li>Mengelola perangkat: menjalankan keyboard, printer, dan lainnya lewat driver.</li>" +
          "<li>Menyediakan antarmuka: tampilan grafis (GUI) atau baris perintah (CLI).</li></ul>" +
          "<h3>Proses menyalakan komputer</h3>" +
          "<p>Saat tombol power ditekan, firmware (BIOS atau UEFI) memeriksa perangkat keras lebih dulu. Setelah itu ia mencari bootloader pada storage, lalu bootloader memuat sistem operasi ke RAM.</p>" +
          "<div class='callout'><b>Literasi digital.</b> Perbarui sistem operasi dan aplikasi secara berkala. Banyak pembaruan berisi perbaikan celah keamanan.</div>"
      },
      { id: "m4", code: "M4", name: "Representasi Data dan Bilangan Biner",
        goal: "Setelah modul ini kamu dapat menjelaskan bit dan byte serta mengubah bilangan desimal menjadi biner.",
        html:
          "<h3>Komputer hanya mengenal 0 dan 1</h3>" +
          "<p>Perangkat digital memakai dua keadaan, misalnya arus ada atau tidak ada. Satu keadaan disebut <b>bit</b> (binary digit) dan bernilai 0 atau 1. Delapan bit membentuk <b>1 byte</b>, yang bisa mewakili 256 nilai berbeda (0 sampai 255).</p>" +
          "<div class='tablewrap'><table><thead><tr><th>Satuan</th><th>Besar</th></tr></thead><tbody>" +
          "<tr><td>1 byte</td><td>8 bit</td></tr><tr><td>1 KB</td><td>1.024 byte</td></tr><tr><td>1 MB</td><td>1.024 KB</td></tr><tr><td>1 GB</td><td>1.024 MB</td></tr>" +
          "</tbody></table></div>" +
          "<h3>Cara membaca bilangan biner</h3>" +
          "<p>Setiap posisi bit punya bobot kelipatan dua, dari kanan ke kiri: 1, 2, 4, 8, 16, 32, 64, 128. Jumlahkan bobot posisi yang bernilai 1. Contoh: <span class='mono'>00001101</span> = 8 + 4 + 1 = <b>13</b>.</p>" +
          "<div class='lab'><h4>Simulasi: nyalakan bit</h4><p style='color:var(--muted);font-size:14px'>Klik bit untuk mengubahnya, atau ketik angka 0 sampai 255.</p>" +
          "<div class='bits' id='bits'></div>" +
          "<div class='readout'><span>Biner: <b id='out-bin'>00000000</b></span><span>Desimal: <b id='out-dec'>0</b></span><span>Heksadesimal: <b id='out-hex'>0x00</b></span></div>" +
          "<label class='fld' for='dec-in' style='margin-top:12px;max-width:220px'>Ketik angka desimal<input type='number' id='dec-in' min='0' max='255' value='0'></label></div>" +
          "<h3>Teks juga berupa angka</h3>" +
          "<p>Huruf disimpan sebagai kode angka. Dalam standar ASCII, huruf A berkode 65 dan a berkode 97. Itu sebabnya komputer membedakan huruf besar dan kecil, termasuk pada kata sandi.</p>"
      },
      { id: "m5", code: "M5", name: "Jaringan dan Keamanan Dasar",
        goal: "Setelah modul ini kamu dapat menjelaskan fungsi jaringan dasar dan kebiasaan aman saat daring.",
        html:
          "<h3>Jaringan komputer</h3>" +
          "<p>Jaringan menghubungkan dua perangkat atau lebih agar bisa bertukar data. Beberapa istilah yang sering muncul:</p>" +
          "<div class='tablewrap'><table><thead><tr><th>Istilah</th><th>Arti</th></tr></thead><tbody>" +
          "<tr><td><b>IP address</b></td><td>Alamat perangkat di jaringan, contoh <span class='mono'>192.168.1.10</span></td></tr>" +
          "<tr><td><b>Router</b></td><td>Perangkat yang meneruskan data antarjaringan, termasuk ke internet</td></tr>" +
          "<tr><td><b>Wi-Fi</b></td><td>Koneksi jaringan nirkabel</td></tr>" +
          "<tr><td><b>DNS</b></td><td>Menerjemahkan nama situs menjadi alamat IP</td></tr>" +
          "<tr><td><b>HTTPS</b></td><td>Cara mengakses web dengan data terenkripsi</td></tr>" +
          "</tbody></table></div>" +
          "<h3>Kebiasaan aman saat daring</h3>" +
          "<ul><li>Gunakan kata sandi panjang dan berbeda untuk tiap akun.</li>" +
          "<li>Aktifkan verifikasi dua langkah bila tersedia.</li>" +
          "<li>Periksa alamat situs sebelum memasukkan data. Waspadai tautan yang meniru situs resmi (phishing).</li>" +
          "<li>Hati-hati dengan Wi-Fi publik. Hindari membuka akun penting di jaringan yang tidak kamu percaya.</li>" +
          "<li>Jangan membagikan OTP kepada siapa pun, termasuk yang mengaku petugas.</li></ul>" +
          "<div class='callout'><b>Coba sekarang.</b> Buka menu Literasi Digital dan periksa kekuatan kata sandi contoh dengan pemeriksa yang tersedia.</div>"
      }
    ];
  
    var QUIZ = [
      { q: "Unsur sistem komputer yang berupa manusia pengguna dan pengelola disebut...", o: ["Hardware", "Software", "Brainware", "Firmware"], a: 2, e: "Brainware adalah manusia yang mengoperasikan dan mengelola sistem komputer." },
      { q: "Urutan alur kerja sistem komputer yang benar adalah...", o: ["Output, proses, input", "Input, proses, output", "Proses, input, output", "Input, output, proses"], a: 1, e: "Data masuk (input), diolah (proses), lalu hasilnya ditampilkan (output)." },
      { q: "Komponen yang menjalankan instruksi program dan mengolah data adalah...", o: ["PSU", "RAM", "CPU", "Motherboard"], a: 2, e: "CPU adalah pusat pengolah. RAM hanya menyimpan sementara, PSU mengatur daya." },
      { q: "Isi RAM akan hilang ketika listrik padam. Sifat ini disebut...", o: ["Volatile", "Permanen", "Optik", "Magnetik"], a: 0, e: "RAM bersifat volatile. Data permanen disimpan di SSD, HDD, atau flashdisk." },
      { q: "Manakah yang termasuk sistem operasi?", o: ["Google Chrome", "Linux", "Microsoft Word", "Antivirus"], a: 1, e: "Linux adalah sistem operasi. Chrome dan Word adalah aplikasi." },
      { q: "Yang bukan fungsi sistem operasi adalah...", o: ["Mengelola memori", "Mengelola file", "Menjalankan perangkat lewat driver", "Mengubah listrik AC menjadi DC"], a: 3, e: "Mengubah listrik AC menjadi DC adalah tugas PSU, yaitu perangkat keras." },
      { q: "Satu byte terdiri dari...", o: ["4 bit", "8 bit", "16 bit", "1.024 bit"], a: 1, e: "1 byte = 8 bit, sehingga dapat mewakili 256 nilai." },
      { q: "Bilangan biner 00001101 bernilai desimal...", o: ["11", "12", "13", "14"], a: 2, e: "8 + 4 + 1 = 13." },
      { q: "Protokol akses web yang mengenkripsi data antara browser dan situs adalah...", o: ["HTTP", "HTTPS", "FTP", "DNS"], a: 1, e: "HTTPS memakai enkripsi, sehingga data lebih sulit disadap." },
      { q: "Kamu menerima pesan berisi kode OTP dan seseorang meminta kode itu. Tindakan yang tepat adalah...", o: ["Memberikan karena dia petugas", "Memberikan setengahnya", "Tidak memberikan kepada siapa pun", "Membagikannya ke grup kelas"], a: 2, e: "OTP bersifat rahasia. Penyedia layanan resmi tidak pernah memintanya." }
    ];
  
    var HOAX = [
      { t: "Tidak ada nama penulis atau nama media yang jelas", w: 2 },
      { t: "Judulnya heboh dan memakai huruf kapital atau banyak tanda seru", w: 1 },
      { t: "Meminta saya segera menyebarkan ke banyak orang", w: 2 },
      { t: "Tidak ada tanggal, atau tanggalnya sudah lama", w: 1 },
      { t: "Tidak ada sumber atau bukti yang bisa dicek", w: 2 },
      { t: "Berita yang sama tidak ditemukan di media tepercaya", w: 2 }
    ];
  
    /* ---------- keadaan aplikasi dan API ---------- */
    var mem = { done: {}, best: null };
    var currentUser = null;
  
    function api(aksi, body) {
      var opt = { credentials: "same-origin", headers: { "X-Requested-With": "fetch" } };
      if (body !== undefined) {
        opt.method = "POST"; opt.headers["Content-Type"] = "application/json"; opt.body = JSON.stringify(body);
      }
      return fetch("api.php?aksi=" + aksi, opt).then(function (r) {
        return r.json().catch(function () { return { error: "Server memberi respons yang tidak terduga." }; });
      });
    }
    function setProgress(p) {
      mem = { done: {}, best: null };
      if (p) {
        (p.done || []).forEach(function (id) { mem.done[id] = true; });
        mem.best = (typeof p.best === "number") ? p.best : null;
      }
    }
    function save() { if (!currentUser) return; api("simpan_progres", { done: Object.keys(mem.done) }).catch(function () {}); }
    function catatKuis(skor) { if (!currentUser) return; api("kuis", { skor: skor }).catch(function () {}); }
  
    function $(id) { return document.getElementById(id); }
  
    /* ---------- progress ---------- */
    function doneCount() { var n = 0; MODULES.forEach(function (m) { if (mem.done[m.id]) n++; }); return n; }
    function renderHome() {
      var n = doneCount(), pct = Math.round(n / MODULES.length * 100);
      $("home-bar").style.width = pct + "%";
      $("home-meter").setAttribute("aria-valuenow", pct);
      $("home-meter").setAttribute("aria-label", "Progres materi " + pct + " persen");
      $("home-mod").textContent = n + " / " + MODULES.length;
      $("home-quiz").textContent = mem.best === null ? "belum ada" : mem.best + " / " + QUIZ.length;
    }
  
    /* ---------- materi ---------- */
    var cur = 0;
    function renderMateri() {
      var list = $("modlist"); list.innerHTML = "";
      MODULES.forEach(function (m, i) {
        var b = document.createElement("button");
        b.className = "modbtn"; b.type = "button"; b.setAttribute("role", "tab");
        b.setAttribute("aria-selected", i === cur ? "true" : "false");
        b.innerHTML = "<span class='code'>" + m.code + "</span><span class='name'>" + m.name + "</span>" + (mem.done[m.id] ? "<span class='done' aria-label='selesai'>✓</span>" : "");
        b.addEventListener("click", function () { cur = i; renderMateri(); $("article").focus({ preventScroll: true }); });
        list.appendChild(b);
      });
      var m = MODULES[cur], a = $("article");
      var isDone = !!mem.done[m.id];
      a.innerHTML =
        "<div class='eyebrow'>Modul " + (cur + 1) + " dari " + MODULES.length + "</div>" +
        "<h2 style='margin-top:6px'>" + m.name + "</h2><p class='goal'>" + m.goal + "</p>" + m.html +
        "<div class='article-foot'>" +
        "<button class='btn' type='button' id='prev'" + (cur === 0 ? " disabled" : "") + ">Sebelumnya</button>" +
        "<button class='btn " + (isDone ? "" : "primary") + "' type='button' id='mark'>" + (isDone ? "Selesai ✓ (klik untuk batalkan)" : "Tandai selesai") + "</button>" +
        "<button class='btn' type='button' id='next'" + (cur === MODULES.length - 1 ? " disabled" : "") + ">Berikutnya</button></div>";
      $("prev").addEventListener("click", function () { cur--; renderMateri(); window.scrollTo(0, 0); });
      $("next").addEventListener("click", function () { cur++; renderMateri(); window.scrollTo(0, 0); });
      $("mark").addEventListener("click", function () { if (mem.done[m.id]) { delete mem.done[m.id]; } else { mem.done[m.id] = true; } save(); renderMateri(); renderHome(); });
      if (m.id === "m4") initBits();
    }
  
    function initBits() {
      var box = $("bits"), val = 0, W = [128, 64, 32, 16, 8, 4, 2, 1];
      function paint() {
        var bin = ("00000000" + val.toString(2)).slice(-8);
        for (var i = 0; i < 8; i++) { var on = ((val >> (7 - i)) & 1) === 1; var el = box.children[i]; el.setAttribute("aria-pressed", on ? "true" : "false"); el.children[1].textContent = on ? "1" : "0"; }
        $("out-bin").textContent = bin; $("out-dec").textContent = val;
        $("out-hex").textContent = "0x" + ("0" + val.toString(16).toUpperCase()).slice(-2);
        $("dec-in").value = val;
      }
      W.forEach(function (w, i) {
        var b = document.createElement("button"); b.type = "button"; b.className = "bit"; b.setAttribute("aria-label", "Bit bobot " + w);
        b.innerHTML = "<small>" + w + "</small><span>0</span>";
        b.addEventListener("click", function () { val ^= w; paint(); });
        box.appendChild(b);
      });
      $("dec-in").addEventListener("input", function (e) {
        var n = parseInt(e.target.value, 10); if (isNaN(n)) return;
        val = Math.max(0, Math.min(255, n)); paint();
      });
      val = 13; paint();
    }
  
    /* ---------- kuis ---------- */
    var qi = 0, score = 0, answered = false;
    function renderQuiz() {
      var box = $("quiz");
      if (qi >= QUIZ.length) {
        catatKuis(score);
        if (mem.best === null || score > mem.best) { mem.best = score; renderHome(); }
        var msg = score >= 8 ? "Pemahamanmu sudah baik. Lanjutkan ke latihan literasi digital." : score >= 5 ? "Cukup baik. Baca ulang modul yang masih terasa sulit lalu coba lagi." : "Jangan khawatir. Pelajari kembali modulnya dengan tenang, lalu ulangi kuis ini.";
        box.innerHTML = "<div class='qhead'><span>HASIL</span></div><div class='score'>" + score + " / " + QUIZ.length + "</div><p style='margin:8px 0 20px;color:var(--muted)'>" + msg + "</p>" +
          "<div class='btnrow' style='margin-top:0'><button class='btn primary' type='button' id='again'>Ulangi kuis</button><a class='btn' href='#materi'>Buka materi</a></div>";
        $("again").addEventListener("click", function () { qi = 0; score = 0; answered = false; renderQuiz(); });
        return;
      }
      var q = QUIZ[qi]; answered = false;
      var h = "<div class='qhead'><span>SOAL " + (qi + 1) + " / " + QUIZ.length + "</span><span>BENAR: " + score + "</span></div>" +
        "<div class='meter' style='margin-bottom:18px'><i style='width:" + (qi / QUIZ.length * 100) + "%'></i></div>" +
        "<div class='qtext'>" + q.q + "</div><div class='opts' id='opts'>";
      q.o.forEach(function (t, i) { h += "<button type='button' class='opt' data-i='" + i + "'><span class='k'>" + "ABCD".charAt(i) + "</span><span>" + t + "</span></button>"; });
      h += "</div><div id='fb' aria-live='polite'></div>";
      box.innerHTML = h;
      Array.prototype.forEach.call(box.querySelectorAll(".opt"), function (b) {
        b.addEventListener("click", function () {
          if (answered) return; answered = true;
          var pick = +b.getAttribute("data-i"), ok = pick === q.a; if (ok) score++;
          Array.prototype.forEach.call(box.querySelectorAll(".opt"), function (x, i) {
            x.disabled = true; if (i === q.a) x.classList.add("right"); else if (i === pick) x.classList.add("wrong");
          });
          $("fb").innerHTML = "<div class='explain'><b>" + (ok ? "Benar." : "Belum tepat.") + "</b> " + q.e + "</div>" +
            "<button class='btn primary' type='button' id='nq'>" + (qi === QUIZ.length - 1 ? "Lihat hasil" : "Soal berikutnya") + "</button>";
          $("nq").addEventListener("click", function () { qi++; renderQuiz(); });
          $("nq").focus();
        });
      });
    }
  
    /* ---------- literasi ---------- */
    function initLiterasi() {
      var pw = $("pw");
      var colors = ["var(--bad)", "var(--warn)", "var(--warn)", "var(--good)"];
      var labels = ["Sangat lemah", "Lemah", "Cukup", "Kuat"];
      function checkPw() {
        var v = pw.value, t = {
          len: v.length >= 12, up: /[A-Z]/.test(v), low: /[a-z]/.test(v), num: /[0-9]/.test(v), sym: /[^A-Za-z0-9]/.test(v)
        }, n = 0;
        Array.prototype.forEach.call($("pw-checks").children, function (li) { var ok = t[li.getAttribute("data-k")]; li.className = ok ? "ok" : ""; if (ok) n++; });
        var bars = $("pw-bars").children, level = v.length === 0 ? 0 : (n <= 2 ? 1 : n === 3 ? 2 : n === 4 ? 3 : 4);
        if (level === 4 && !t.len) level = 3;
        for (var i = 0; i < 4; i++) bars[i].style.background = i < level ? colors[level - 1] : "var(--surface-2)";
        $("pw-label").textContent = v.length === 0 ? "Belum diisi" : labels[level - 1] + " (" + v.length + " karakter)";
      }
      pw.addEventListener("input", checkPw); checkPw();
  
      var hx = $("hoax"), html = "";
      HOAX.forEach(function (h, i) { html += "<label class='cb' for='hx" + i + "'><input type='checkbox' id='hx" + i + "' data-w='" + h.w + "'><span>" + h.t + "</span></label>"; });
      hx.innerHTML = html;
      function checkHoax() {
        var s = 0, c = 0; Array.prototype.forEach.call(hx.querySelectorAll("input"), function (i) { if (i.checked) { s += +i.getAttribute("data-w"); c++; } });
        var v = $("hoax-verdict");
        if (c === 0) { v.className = "verdict warn"; v.textContent = "Centang pernyataan di atas untuk melihat penilaian."; }
        else if (s <= 2) { v.className = "verdict good"; v.textContent = "Risiko rendah, tetapi tetap cek sumber aslinya sebelum membagikan."; }
        else if (s <= 5) { v.className = "verdict warn"; v.textContent = "Waspada. Cari kabar yang sama di media tepercaya sebelum percaya atau menyebarkan."; }
        else { v.className = "verdict bad"; v.textContent = "Kemungkinan besar menyesatkan. Sebaiknya jangan dibagikan dan laporkan jika perlu."; }
      }
      hx.addEventListener("change", checkHoax);
    }
  
    /* ---------- routing ---------- */
    var VIEWS = ["beranda", "materi", "kuis", "literasi", "tentang", "rekap"];
    function route() {
      var h = (location.hash || "").replace("#", ""); if (VIEWS.indexOf(h) < 0) h = "beranda";
      if (!currentUser) h = "masuk";
      else if (h === "rekap" && currentUser.role !== "guru") h = "beranda";
      ["masuk"].concat(VIEWS).forEach(function (v) { $("v-" + v).hidden = v !== h; });
      $("topnav").hidden = !currentUser; $("userbox").hidden = !currentUser;
      Array.prototype.forEach.call(document.querySelectorAll("nav a"), function (a) {
        if (a.getAttribute("data-nav") === h) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
      });
      if (h === "materi") renderMateri();
      if (h === "beranda") renderHome();
      if (h === "rekap") renderRekap();
      window.scrollTo(0, 0);
    }
    window.addEventListener("hashchange", route);
  
    /* ---------- masuk / daftar ---------- */
    var authMode = "masuk";
    var busy = false;
    var NO_SERVER = "Tidak dapat terhubung ke server. Pastikan Apache dan MySQL berjalan.";
    function msg(t, kind) {
      var m = $("auth-msg");
      if (!t) { m.hidden = true; m.textContent = ""; return; }
      m.className = "verdict " + (kind || "bad"); m.textContent = t; m.hidden = false;
    }
    function setMode(m) {
      authMode = m; var reg = m === "daftar";
      $("tab-masuk").setAttribute("aria-selected", reg ? "false" : "true");
      $("tab-daftar").setAttribute("aria-selected", reg ? "true" : "false");
      $("reg-fields").hidden = !reg; $("reg-confirm").hidden = !reg;
      $("auth-submit").textContent = reg ? "Buat akun" : "Masuk";
      $("f-pass").setAttribute("autocomplete", reg ? "new-password" : "current-password");
      msg("");
    }
    function applyUser() {
      $("who-name").textContent = currentUser.nama;
      $("who-class").textContent = currentUser.role === "guru" ? "Guru" : (currentUser.kelas || "Siswa");
      $("nav-rekap").hidden = currentUser.role !== "guru";
    }
    function startSession(data) {
      currentUser = data.user; setProgress(data.progress); applyUser();
      qi = 0; score = 0; answered = false; cur = 0;
      $("f-pass").value = ""; $("f-pass2").value = "";
      renderHome(); renderQuiz();
      location.hash = "#beranda"; route();
    }
    function logout() {
      api("keluar", {}).catch(function () {}).then(function () {
        currentUser = null; setProgress(null); $("auth-form").reset(); setMode("masuk");
        location.hash = ""; route();
      });
    }
  
    function renderRekap() {
      var box = $("rekap-body"); box.textContent = "Memuat data...";
      api("rekap").then(function (d) {
        if (d.error) { box.textContent = d.error; return; }
        var rows = d.siswa || [];
        if (!rows.length) { box.textContent = "Belum ada siswa yang mendaftar."; return; }
        var wrap = document.createElement("div"); wrap.className = "tablewrap";
        var t = document.createElement("table");
        t.innerHTML = "<thead><tr><th>Nama</th><th>Kelas</th><th>NIS</th><th>Materi selesai</th><th>Nilai terbaik</th><th>Percobaan kuis</th></tr></thead>";
        var tb = document.createElement("tbody");
        rows.forEach(function (r) {
          var tr = document.createElement("tr");
          [r.nama, r.kelas || "-", r.username, r.modul + " / " + MODULES.length,
           r.nilai === null ? "-" : r.nilai + " / " + QUIZ.length, String(r.percobaan)].forEach(function (v) {
            var td = document.createElement("td"); td.textContent = v; tr.appendChild(td);
          });
          tb.appendChild(tr);
        });
        t.appendChild(tb); wrap.appendChild(t); box.textContent = ""; box.appendChild(wrap);
      }).catch(function () { box.textContent = NO_SERVER; });
    }
  
    $("tab-masuk").addEventListener("click", function () { setMode("masuk"); });
    $("tab-daftar").addEventListener("click", function () { setMode("daftar"); });
    $("logout").addEventListener("click", logout);
    $("f-show").addEventListener("change", function (e) {
      var t = e.target.checked ? "text" : "password"; $("f-pass").type = t; $("f-pass2").type = t;
    });
    $("auth-form").addEventListener("submit", function (e) {
      e.preventDefault(); if (busy) return;
      var id = $("f-id").value.trim().toLowerCase(), pass = $("f-pass").value;
      if (!id || !pass) { msg("Isi NIS atau nama pengguna dan kata sandi."); return; }
      var body = { username: id, password: pass }, aksi = "masuk";
      if (authMode === "daftar") {
        var name = $("f-name").value.trim();
        if (!name) { msg("Isi nama lengkap."); return; }
        if (!/^[a-z0-9][a-z0-9._-]{2,29}$/.test(id)) { msg("NIS atau nama pengguna harus 3 sampai 30 karakter berupa huruf, angka, titik, garis bawah, atau strip."); return; }
        if (pass.length < 8 || pass.length > 72) { msg("Kata sandi harus 8 sampai 72 karakter."); return; }
        if (pass !== $("f-pass2").value) { msg("Kata sandi dan pengulangannya belum sama."); return; }
        body.nama = name; body.kelas = $("f-class").value.trim(); aksi = "daftar";
      }
      busy = true; $("auth-submit").disabled = true;
      api(aksi, body).then(function (d) {
        if (d.error) { msg(d.error); return; }
        startSession(d);
      }).catch(function () { msg(NO_SERVER); })
        .then(function () { busy = false; $("auth-submit").disabled = false; });
    });
  
    renderQuiz(); initLiterasi();
    api("saya").then(function (d) {
      if (d.user) { currentUser = d.user; setProgress(d.progress); applyUser(); }
    }).catch(function () { msg(NO_SERVER); })
      .then(function () { renderHome(); route(); });
  })();