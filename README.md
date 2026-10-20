# 🚀 MikroTik Hotspot Studio

> Generator Template Login Page MikroTik Hotspot RouterOS (No-Code & 100% Client-Side).

Aplikasi web modern berbasis **Vue 3 + Tailwind CSS + JSZip** untuk mendesain halaman login captive portal WiFi (Warkop, Kafe, Kos-kosan, RT/RW Net) tanpa perlu coding HTML.

---

## ✨ Fitur Unggulan

- **Live Preview HP Real-time:** Pratinjau responsif langsung di layar smartphone.
- **Pilihan Tipe Login:** Mendukung mode *Kode Voucher* (1 kolom) dan *Member / Username & Password* (2 kolom).
- **Kustomisasi Lengkap:**
  - Ubah Nama WiFi, Subtitle, Pengumuman promo running text, teks footer.
  - Upload logo kustom dari galeri.
  - Opsi tombol *Coba Gratis (Trial)*.
- **Tema & Background:**
  - Pilihan preset palet warna modern (*Cyber Blue, Emerald Green, Warm Amber, Purple Neon, Clean Light*).
  - Pilihan gambar latar belakang (*Upload foto galeri*, *Preset wallpaper HD*, atau *URL Google / Web*).
  - **Efek Glassmorphism:** Slider pengatur transparansi (Opacity) kartu login dan efek blur kaca (*backdrop-filter*).
- **Katalog Paket Voucher & WhatsApp Order:**
  - Tambah / hapus / edit daftar paket internet.
  - Tombol beli voucher otomatis membuka chat WhatsApp admin/kasir.
- **1-Click Export ZIP Standar MikroTik RouterOS:**
  - Menghasilkan file siap pakai: `login.html`, `status.html`, `alogin.html`, `logout.html`, dan skrip hashing enkripsi `md5.js`.
  - Ukuran aset sangat ringan (< 300KB), ramah storage internal routerboard MikroTik (hEX / RB750Gr3).

---

## 🛠️ Tech Stack

- **Framework:** Vue 3 (Composition API)
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide Icons (`lucide-vue-next`)
- **Archiving:** JSZip
- **Build Tool:** Vite

---

## 🚀 Menjalankan Secara Lokal

```bash
# Clone repository
git clone https://github.com/<username>/mikrotik-hotspot-studio.git
cd mikrotik-hotspot-studio

# Install dependensi
npm install

# Jalankan development server
npm run dev

# Build untuk produksi
npm run build
```

---

## 🌐 Deploy Gratis (100% Client-Side)

Karena aplikasi ini murni client-side tanpa backend database, Anda dapat men-deploy-nya secara gratis tanpa batas di:
- **Cloudflare Pages** (Sangat direkomendasikan)
- **Vercel**
- **Netlify**
- **GitHub Pages**

---

## 📄 Lisensi
MIT License. Bebas digunakan dan dikembangkan untuk komunitas jaringan Indonesia.
