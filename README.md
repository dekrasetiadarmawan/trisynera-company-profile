# Trisynera company profile

Website perusahaan statis dalam bahasa Indonesia, menggunakan HTML5, CSS3, dan JavaScript tanpa framework, dependensi, atau proses build.

## Struktur

```text
/
├── 404.html                # Respons untuk URL yang tidak ditemukan
├── index.html              # Beranda: pengenalan, ringkasan layanan dan prinsip
├── about/index.html        # Tentang perusahaan dan pendekatan engineering
├── services/index.html     # Rincian lima layanan
├── contact/index.html      # Email dan UI formulir kontak
├── assets/
│   ├── css/style.css       # Seluruh gaya dan aturan responsif
│   ├── js/main.js          # Navigasi, animasi, dan pencegahan submit
│   └── images/             # Disiapkan untuk aset gambar berikutnya
└── README.md
```

## Pratinjau lokal

Jalankan dari root repositori:

```sh
python3 -m http.server 8080
```

Buka `http://localhost:8080/`, `/about/`, `/services/`, dan `/contact/`. Gunakan server HTTP; membuka berkas melalui `file://` tidak mendukung tautan absolut terhadap root seperti `/assets/css/style.css`.

## Cloudflare Pages

Publikasikan root repositori sebagai situs statis:

- Framework preset: None.
- Build command: kosong (tidak memerlukan build).
- Build output directory: `.`.
- Hubungkan domain `trisynera.com` saat siap diluncurkan.

Setiap direktori halaman memiliki `index.html`, sehingga URL `/about/`, `/services/`, dan `/contact/` dapat diakses langsung tanpa router JavaScript. Berkas `404.html` di root mencegah fallback SPA bawaan Cloudflare Pages untuk URL yang tidak ditemukan. CSS dan JavaScript menggunakan URL dari root. Canonical dan metadata Open Graph menggunakan domain produksi `https://trisynera.com`.

## Konten dan komponen bersama

Edit konten pada HTML masing-masing halaman. Semua halaman memakai CSS dan JavaScript yang sama; header dan footer ditulis sebagai markup statis agar tetap bekerja tanpa JavaScript. Jika navigasi atau footer diperbarui, terapkan perubahan pada keempat HTML. `aria-current="page"` menandai halaman aktif.

Tema gelap, aksen hijau, tipografi, grid, serta ilustrasi infrastruktur SVG tetap menggunakan identitas visual sebelumnya. Animasi menghormati preferensi reduced motion. Tidak ada font, UI library, atau aset yang dimuat dari layanan eksternal.

## Kontak dan informasi yang perlu dikonfirmasi

- `hello@trisynera.com` masih merupakan alamat placeholder; konfirmasikan bahwa kotak masuk tersedia sebelum peluncuran.
- Logo masih berupa teks Trisynera. Aset merek resmi dapat ditambahkan setelah tersedia.
- Ruang lingkup layanan dan profil perlu ditinjau perusahaan sebelum publikasi. Tidak ada klaim pelanggan, sertifikasi, pencapaian, atau riwayat perusahaan yang ditambahkan.
- Formulir hanya UI: seluruh fieldset dan tombol pengiriman dinonaktifkan, disertai pemberitahuan yang terlihat. JavaScript juga mencegah event submit. Tidak ada data formulir yang dikirim atau disimpan dan tidak ada backend palsu.

Untuk mengaktifkan formulir, integrasikan endpoint Cloudflare Worker, layanan formulir yang kompatibel dengan Cloudflare, atau backend lain. Petunjuk tersedia pada komentar di `contact/index.html` dan `assets/js/main.js`. Tetapkan `action` yang nyata serta `method="post"`, implementasikan validasi server, penanganan spam, dan pesan sukses/gagal yang aksesibel sebelum menghapus atribut `disabled` dan guard submit. Jangan menaruh kredensial atau kunci rahasia di HTML maupun JavaScript publik.

## Audit produksi

Pemeriksaan lokal mencakup struktur HTML, tautan dan referensi ARIA, label formulir, konsistensi navigasi/footer, heading, serta keunikan judul dan meta description. Pengujian Chrome headless pada lebar 320, 375, 760, 768, 1024, dan 1440 px tidak menemukan overflow horizontal atau exception JavaScript. Menu seluler, Escape, perpindahan fokus saat breakpoint berubah, reveal saat fokus keyboard, reduced motion, dan navigasi tanpa JavaScript telah diperiksa.

Tidak ditemukan selector CSS statis yang tidak terpakai di seluruh halaman; aturan state, media query, dan formulir tetap diperlukan. Ukuran HTML + CSS + JavaScript per halaman utama sekitar 21–27 KB sebelum kompresi, tanpa dependensi eksternal. Ini bukan pengukuran Core Web Vitals di produksi atau sertifikasi aksesibilitas lengkap; Safari, Firefox, dan pembaca layar belum diuji.

Perilaku routing dan kebutuhan `404.html` mengacu pada [dokumentasi serving Pages Cloudflare](https://developers.cloudflare.com/pages/configuration/serving-pages/). Deployment produksi dan pengiriman email belum diuji; formulir tetap nonaktif sampai backend tersedia.
