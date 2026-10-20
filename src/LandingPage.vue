<script setup>
import { 
  Wifi, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Smartphone, 
  Download, 
  CheckCircle2, 
  Layers, 
  MessageCircle,
  Palette,
  ExternalLink,
  Code2
} from 'lucide-vue-next'

const emit = defineEmits(['start-editor'])

const features = [
  {
    icon: Sparkles,
    title: 'Visual Live Preview Real-time',
    desc: 'Ubah logo, warna tema, teks promo, dan langsung lihat hasilnya di simulasi layar HP secara instan tanpa reload.'
  },
  {
    icon: Zap,
    title: '1-Click Export ZIP MikroTik',
    desc: 'Otomatis buat file login.html, status.html, alogin.html, logout.html, dan script enkripsi MD5 CHAP siap pakai di Winbox.'
  },
  {
    icon: Smartphone,
    title: 'Desain Responsif & Modern',
    desc: 'Tampilan captive portal fleksibel yang pas di layar HP pelanggan, lengkap dengan efek Glassmorphism blur dan foto background.'
  },
  {
    icon: MessageCircle,
    title: 'Beli Voucher via WhatsApp',
    desc: 'Pelanggan bisa langsung pesan voucher lewat tombol WhatsApp interaktif yang terhubung langsung ke kasir atau admin.'
  },
  {
    icon: Layers,
    title: 'Mendukung Kode Voucher & Member',
    desc: 'Bisa pilih mode 1 kolom (Voucher saja) atau 2 kolom (Username & Password) serta tombol coba gratis (Trial) 1-klik.'
  },
  {
    icon: ShieldCheck,
    title: '100% Gratis & Ringan Selamanya',
    desc: 'Dibuat khusus seringan mungkin (< 300KB) agar ramah memori routerboard MikroTik seperti seri hEX / RB750Gr3.'
  }
]

const steps = [
  {
    step: '01',
    title: 'Kustomisasi Desain',
    desc: 'Tulis nama WiFi kamu, upload logo usaha, atur paket harga voucher, dan sesuaikan palet warna atau foto background.'
  },
  {
    step: '02',
    title: 'Download File (.zip)',
    desc: 'Klik tombol Download Template. Browser kamu akan mengemas seluruh file HTML, CSS, dan skrip enkripsi RouterOS ke dalam satu file ZIP.'
  },
  {
    step: '03',
    title: 'Drag & Drop ke Winbox',
    desc: 'Ekstrak ZIP, buka Winbox menu Files, lalu drag folder hotspot tersebut ke MikroTik kamu. Hotspot modern siap dinikmati!'
  }
]
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
    <!-- Landing Navbar -->
    <header class="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40 px-4 md:px-8 py-3.5 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <img src="/logo.png" alt="Logo" class="w-10 h-10 rounded-xl object-cover shadow-lg shadow-emerald-500/20 border border-emerald-500/30" />
        <div>
          <span class="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">Hotspot Studio</span>
          <span class="ml-2 text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">v1.0 Free</span>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button 
          @click="emit('start-editor')"
          class="flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm bg-gradient-to-r from-blue-600 hover:from-blue-500 to-indigo-600 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/30 transition-all active:scale-95 cursor-pointer"
        >
          <span>Buka Studio</span>
          <ArrowRight class="w-4 h-4" />
        </button>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="relative overflow-hidden pt-12 md:pt-20 pb-16 md:pb-24 px-4 md:px-8">
      <!-- Glow ambient background -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-600/20 blur-[120px] pointer-events-none rounded-full"></div>
      <div class="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[250px] bg-indigo-600/15 blur-[100px] pointer-events-none rounded-full"></div>

      <div class="max-w-4xl mx-auto text-center relative z-10">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium mb-6 shadow-sm">
          <Sparkles class="w-3.5 h-3.5 text-blue-400" />
          <span>Generator Login Page MikroTik No-Code Tercepat</span>
        </div>

        <h1 class="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15] mb-6">
          Buat Halaman Login <br class="hidden sm:inline" />
          <span class="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
            MikroTik Hotspot Modern
          </span> <br />
          Hanya Dalam 1 Menit!
        </h1>

        <p class="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-normal">
          Ubah tampilan captive portal WiFi warkop, kafe, kos-kosan, atau RT/RW Net kamu jadi profesional tanpa perlu belajar coding HTML. 100% gratis &amp; siap pasang ke Winbox.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button 
            @click="emit('start-editor')"
            class="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
          >
            <span>Mulai Desain Sekarang</span>
            <ArrowRight class="w-4 h-4" />
          </button>
          <div class="flex items-center gap-2 text-xs text-slate-400">
            <CheckCircle2 class="w-4 h-4 text-emerald-400" />
            <span>Tanpa daftar akun • Langsung pakai</span>
          </div>
        </div>

        <!-- Highlights Badges -->
        <div class="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 border-t border-slate-900 pt-8">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-blue-500"></span>
            <span>Support RouterOS v6 &amp; v7</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Kompatibel Mikhmon &amp; Userman</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
            <span>Ukuran File Sangat Ringan (&lt;300KB)</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 px-4 md:px-8 border-t border-slate-900 bg-slate-950/50">
      <div class="max-w-6xl mx-auto">
        <div class="text-center max-w-2xl mx-auto mb-14">
          <h2 class="text-2xl sm:text-3xl font-bold tracking-tight mb-3">Semua Fitur yang Dibutuhkan Penggiat WiFi Hotspot</h2>
          <p class="text-sm text-slate-400">Dirancang khusus agar pemilik usaha jaringan bisa membuat halaman login yang memikat pelanggan tanpa pusing utak-atik skrip.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="(f, i) in features" 
            :key="i"
            class="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-all hover:-translate-y-1 group"
          >
            <div class="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <component :is="f.icon" class="w-6 h-6" />
            </div>
            <h3 class="text-base font-bold text-slate-100 mb-2">{{ f.title }}</h3>
            <p class="text-xs sm:text-sm text-slate-400 leading-relaxed">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="py-16 px-4 md:px-8 border-t border-slate-900">
      <div class="max-w-5xl mx-auto">
        <div class="text-center max-w-xl mx-auto mb-14">
          <h2 class="text-2xl sm:text-3xl font-bold tracking-tight mb-3">Cara Menggunakannya Sangat Mudah</h2>
          <p class="text-sm text-slate-400">Hanya 3 langkah sederhana dari mendesain hingga online di router MikroTik.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div 
            v-for="(s, idx) in steps" 
            :key="idx"
            class="relative p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col"
          >
            <div class="text-3xl font-black text-blue-500/30 mb-2 font-mono">{{ s.step }}</div>
            <h3 class="text-base font-bold text-slate-200 mb-2">{{ s.title }}</h3>
            <p class="text-xs sm:text-sm text-slate-400 leading-relaxed">{{ s.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Big CTA Section -->
    <section class="py-16 px-4 md:px-8 border-t border-slate-900 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950">
      <div class="max-w-4xl mx-auto text-center p-8 sm:p-12 rounded-3xl border border-blue-500/20 bg-blue-600/5 backdrop-blur-sm relative overflow-hidden shadow-2xl">
        <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
          Siap Bikin Hotspot Kamu Tampil Keren?
        </h2>
        <p class="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto mb-8">
          Tingkatkan kepuasan dan kepercayaan pelanggan WiFi warkop &amp; RT/RW Net kamu dengan tampilan login modern hari ini juga.
        </p>
        <button 
          @click="emit('start-editor')"
          class="px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/30 transition-all inline-flex items-center gap-2 active:scale-95 cursor-pointer"
        >
          <span>Mulai Buat Template Gratis</span>
          <ArrowRight class="w-4 h-4" />
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="mt-auto border-t border-slate-900 py-8 px-4 md:px-8 text-center text-xs text-slate-500">
      <div class="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          © {{ new Date().getFullYear() }} <span class="text-slate-400 font-semibold">MikroTik Hotspot Studio</span> • Dibuat untuk Komunitas Penggiat Jaringan Indonesia.
        </div>
        <div class="flex items-center gap-4">
          <button @click="emit('start-editor')" class="hover:text-slate-300 transition cursor-pointer">Buka Editor</button>
        </div>
      </div>
    </footer>
  </div>
</template>
