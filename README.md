# Konek Aja — Premium Digital Subscription Store

Situs statis (HTML + CSS + JS murni, tanpa build step) — rebuild dari konekaja.lovable.app agar bisa di-host di shared hosting mana pun.

## Struktur

```
index.html      → halaman utama (semua section)
css/style.css   → seluruh styling (dark theme, responsive)
js/main.js      → countdown, count-up stats, FAQ accordion, mobile nav
```

## Preview lokal

Buka `index.html` langsung di browser, atau jalankan server lokal:

```
npx serve .
```

## Deploy ke Namecheap Shared Hosting (cPanel)

1. Login ke cPanel Namecheap.
2. Buka **File Manager** → masuk ke folder `public_html`.
3. Upload `index.html`, folder `css/`, dan folder `js/` (bisa zip dulu lalu Extract di File Manager).
4. Selesai — situs langsung live di domainmu. Tidak perlu Node.js/build apa pun.

Alternatif: upload via FTP (FileZilla) ke `public_html` dengan kredensial FTP dari cPanel.

## Edit konten

- **Produk & harga**: edit langsung di `index.html` bagian `<!-- PRODUCTS -->`.
- **Nomor WhatsApp**: cari-ganti `https://wa.me/message/34YP6HB5IOJEK1`.
- **Jawaban FAQ**: bagian `<!-- FAQ -->` — jawaban selain pertanyaan pertama ditulis ulang secara wajar, sesuaikan bila perlu.
- **Angka statistik**: atribut `data-target` di bagian `<!-- STATS -->`.
