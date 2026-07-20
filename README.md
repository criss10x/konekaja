# Crypto Exchange Bali — cryptoexchangebali.com

Situs statis (HTML + CSS + JS murni, tanpa build step) untuk OTC crypto-to-cash di Bali.
Live di **https://cryptoexchangebali.com** — hosting LiteSpeed (hPanel).

## Struktur

```
index.html      → halaman utama (semua section)
blog/           → blog index + 3 artikel, masing-masing folder sendiri
css/style.css   → seluruh styling (dark theme, responsive)
js/main.js      → count-up stats, countdown, FAQ accordion, mobile nav, reveal on scroll
assets/         → logo, coin, foto testimoni, favicon, og-image
.htaccess       → 301 canonical host, HTTPS, cache-control
robots.txt      → allow all + pointer ke sitemap
sitemap.xml     → 5 URL
```

## Preview lokal

Buka `index.html` langsung di browser, atau:

```
npx serve .
```

## Deploy (hPanel / cPanel)

1. Login ke hPanel → **File Manager** → masuk `public_html`.
2. Upload seluruh isi repo (zip lalu Extract paling cepat).
3. **Pastikan `.htaccess` ikut ter-upload** — dotfile sering ke-skip. Aktifkan "show hidden files" di File Manager untuk memverifikasi.

Alternatif: FTP (FileZilla) ke `public_html`.

## Edit konten

- **Nomor WhatsApp**: cari-ganti `6281139918898` (dipakai di `index.html` + semua halaman blog).
- **Jawaban FAQ**: bagian `<!-- FAQ -->` di `index.html`. Ubah juga blok JSON-LD `FAQPage` di `<head>` supaya schema tetap sinkron dengan teks yang tampil — kalau beda, Google bisa menganggapnya mismatch.
- **Angka statistik**: atribut `data-target` di bagian `<!-- STATS -->`. Teks di dalam span harus diisi angka final juga (bukan `0`), supaya crawler non-JS membaca angka asli; JS tetap animasi dari 0 saat di-scroll.
- **Artikel baru**: buat `blog/<slug>/index.html`, lalu daftarkan di 3 tempat — `sitemap.xml`, kartu di `blog/index.html`, dan JSON-LD `Blog` di `blog/index.html`.

## Catatan SEO

- Canonical host: **non-www**. `.htaccess` sudah 301 dari www.
- Setiap halaman wajib punya `<link rel="canonical">` sendiri.
- `sitemap.xml` masih manual — update `lastmod` tiap kali konten berubah.
