<script setup>
import { ref, reactive } from 'vue'
import JSZip from 'jszip'
import { generateMikrotikFiles } from './generator'
import LandingPage from './LandingPage.vue'
import { 
  Wifi, 
  Download, 
  Smartphone, 
  Palette, 
  DollarSign, 
  MessageCircle, 
  Sparkles, 
  Plus, 
  Trash2,
  Moon,
  Sun,
  ShieldCheck,
  Sliders,
  Eye,
  Image as ImageIcon,
  Search,
  Check,
  ArrowLeft
} from 'lucide-vue-next'

const currentPage = ref('landing') // 'landing' or 'studio'
const mobileView = ref('editor') // 'editor' or 'preview'
const activeTab = ref('branding')
const previewMode = ref('voucher') // 'voucher' or 'member'
const isGenerating = ref(false)
const showSuccessModal = ref(false)

const config = reactive({
  brandName: 'WARKOP BERKAH NET',
  subtitle: 'Internet Super Cepat & Stabil',
  announcement: 'Voucher 24 Jam promo cuma Rp 5.000!',
  logoUrl: '',
  primaryColor: '#2563eb',
  secondaryColor: '#1d4ed8',
  bgType: 'color', // 'color' or 'image'
  bgColor: '#0f172a',
  bgImageUrl: '',
  bgOverlay: 0.45,
  cardOpacity: 0.9,
  cardBlur: 16,
  darkMode: true,
  allowTrial: true,
  waNumber: '6281234567890',
  waMessage: 'Halo admin, saya mau beli voucher WiFi',
  footerText: 'Powered by Warkop Berkah • RouterOS MikroTik',
  packages: [
    { name: '1 Jam Hemat', desc: 'Cocok buat browsing cepat', price: 'Rp 2.000' },
    { name: '3 Jam Puas', desc: 'Streaming & Gaming lancar', price: 'Rp 5.000' },
    { name: '24 Jam Seharian', desc: 'Bebas kuota 24 jam', price: 'Rp 10.000' }
  ]
})

// Galeri Gambar Kategori Populer (Unsplash / Google Web CDN)
const curatedWallpapers = [
  { name: 'Modern Cafe / Warkop', url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80' },
  { name: 'Coffee Shop Vintage', url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80' },
  { name: 'Cyberpunk Neon Gaming', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80' },
  { name: 'Technology & Server', url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80' },
  { name: 'Hotel & Resort Lobby', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80' },
  { name: 'Minimal Dark Abstract', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80' }
]

const customGoogleUrl = ref('')

function applyCuratedBg(url) {
  config.bgType = 'image'
  config.bgImageUrl = url
}

function applyCustomGoogleUrl() {
  if (!customGoogleUrl.value.trim()) return
  config.bgType = 'image'
  config.bgImageUrl = customGoogleUrl.value.trim()
}

function handleBgUpload(event) {
  const file = event.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (e) => {
    config.bgType = 'image'
    config.bgImageUrl = e.target.result
  }
  reader.readAsDataURL(file)
}

const colorPresets = [
  { name: 'Cyber Blue', primary: '#2563eb', secondary: '#1d4ed8', bg: '#0f172a', dark: true },
  { name: 'Emerald Green', primary: '#10b981', secondary: '#047857', bg: '#064e3b', dark: true },
  { name: 'Warm Amber', primary: '#f59e0b', secondary: '#b45309', bg: '#18181b', dark: true },
  { name: 'Purple Neon', primary: '#8b5cf6', secondary: '#6d28d2', bg: '#0f172a', dark: true },
  { name: 'Clean Light', primary: '#0284c7', secondary: '#0369a1', bg: '#f8fafc', dark: false },
]

function applyPreset(preset) {
  config.primaryColor = preset.primary
  config.secondaryColor = preset.secondary
  config.bgColor = preset.bg
  config.bgType = 'color'
  config.darkMode = preset.dark
}

function addPackage() {
  config.packages.push({
    name: 'Paket Baru',
    desc: 'Deskripsi paket',
    price: 'Rp 3.000'
  })
}

function removePackage(index) {
  config.packages.splice(index, 1)
}

function handleLogoUpload(event) {
  const file = event.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (e) => {
    config.logoUrl = e.target.result
  }
  reader.readAsDataURL(file)
}

async function downloadZip() {
  try {
    isGenerating.value = true
    const zip = new JSZip()
    const folder = zip.folder('hotspot')

    const files = generateMikrotikFiles(config)
    for (const [filename, content] of Object.entries(files)) {
      folder.file(filename, content)
    }

    const blob = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `hotspot-${config.brandName.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'template'}.zip`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    showSuccessModal.value = true
  } catch (err) {
    alert('Gagal membuat file ZIP: ' + err.message)
  } finally {
    isGenerating.value = false
  }
}
</script>

<template>
  <!-- Landing Page Mode -->
  <LandingPage v-if="currentPage === 'landing'" @start-editor="currentPage = 'studio'" />

  <!-- Studio / Generator Mode -->
  <div v-else class="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans pb-20 lg:pb-0">
    <!-- Top Navbar -->
    <header class="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-30 px-4 md:px-6 py-3.5 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <button 
          @click="currentPage = 'landing'" 
          class="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
          title="Kembali ke Beranda"
        >
          <ArrowLeft class="w-4 h-4" />
          <span class="hidden sm:inline">Beranda</span>
        </button>

        <div class="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
          <Wifi class="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 class="font-bold text-base md:text-lg leading-tight flex items-center gap-1.5 md:gap-2">
            <span>Hotspot Studio</span>
            <span class="text-[9px] md:text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 md:px-2 py-0.5 rounded-full uppercase">Free</span>
          </h1>
          <p class="text-[11px] md:text-xs text-slate-400 line-clamp-1">Generator Template MikroTik 100% Client-Side</p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <button 
          @click="downloadZip" 
          :disabled="isGenerating"
          class="flex items-center gap-1.5 md:gap-2 px-3.5 md:px-5 py-2 md:py-2.5 rounded-xl font-semibold text-xs md:text-sm bg-gradient-to-r from-blue-600 hover:from-blue-500 to-indigo-600 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/30 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          <Download class="w-4 h-4" />
          <span class="hidden sm:inline">{{ isGenerating ? 'Mengemas ZIP...' : 'Download Template (.zip)' }}</span>
          <span class="sm:hidden">{{ isGenerating ? 'ZIP...' : 'ZIP' }}</span>
        </button>
      </div>
    </header>

    <!-- Mobile Switcher (Hanya tampil di HP) -->
    <div class="lg:hidden bg-slate-900/80 border-b border-slate-800 p-2 sticky top-[57px] z-20 backdrop-blur">
      <div class="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
        <button 
          @click="mobileView = 'editor'"
          :class="['flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer', mobileView === 'editor' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200']"
        >
          <Sliders class="w-3.5 h-3.5" /> Atur Form
        </button>
        <button 
          @click="mobileView = 'preview'"
          :class="['flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer', mobileView === 'preview' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200']"
        >
          <Eye class="w-3.5 h-3.5" /> Pratinjau HP
        </button>
      </div>
    </div>

    <!-- Main Workspace -->
    <main class="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
      
      <!-- Left: Editor Controls (7 Cols) -->
      <div 
        :class="[
          'lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl backdrop-blur transition-all',
          mobileView === 'editor' ? 'block' : 'hidden lg:block'
        ]"
      >
        <!-- Navigation Tabs -->
        <div class="flex overflow-x-auto border-b border-slate-800 gap-1 sm:gap-2 mb-6 pb-0.5">
          <button 
            @click="activeTab = 'branding'"
            :class="['flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 font-medium text-xs sm:text-sm border-b-2 transition-all whitespace-nowrap cursor-pointer', activeTab === 'branding' ? 'border-blue-500 text-blue-400 bg-blue-500/5' : 'border-transparent text-slate-400 hover:text-slate-200']"
          >
            <Sparkles class="w-4 h-4 shrink-0" />
            Identitas
          </button>
          <button 
            @click="activeTab = 'design'"
            :class="['flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 font-medium text-xs sm:text-sm border-b-2 transition-all whitespace-nowrap cursor-pointer', activeTab === 'design' ? 'border-blue-500 text-blue-400 bg-blue-500/5' : 'border-transparent text-slate-400 hover:text-slate-200']"
          >
            <Palette class="w-4 h-4 shrink-0" />
            Tema & Warna
          </button>
          <button 
            @click="activeTab = 'packages'"
            :class="['flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 font-medium text-xs sm:text-sm border-b-2 transition-all whitespace-nowrap cursor-pointer', activeTab === 'packages' ? 'border-blue-500 text-blue-400 bg-blue-500/5' : 'border-transparent text-slate-400 hover:text-slate-200']"
          >
            <DollarSign class="w-4 h-4 shrink-0" />
            Paket Voucher
          </button>
          <button 
            @click="activeTab = 'whatsapp'"
            :class="['flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 font-medium text-xs sm:text-sm border-b-2 transition-all whitespace-nowrap cursor-pointer', activeTab === 'whatsapp' ? 'border-blue-500 text-blue-400 bg-blue-500/5' : 'border-transparent text-slate-400 hover:text-slate-200']"
          >
            <MessageCircle class="w-4 h-4 shrink-0" />
            WhatsApp
          </button>
        </div>

        <!-- Tab 1: Branding -->
        <div v-if="activeTab === 'branding'" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">Nama Hotspot / WiFi</label>
            <input 
              v-model="config.brandName" 
              type="text" 
              class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Contoh: Warkop Berkah Net"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">Slogan / Subtitle</label>
            <input 
              v-model="config.subtitle" 
              type="text" 
              class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Contoh: Internet Cepat Tanpa Batas"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">Running Banner / Pengumuman (Opsional)</label>
            <input 
              v-model="config.announcement" 
              type="text" 
              class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Contoh: Promo akhir pekan kuota dobel!"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">Upload Logo Custom</label>
            <div class="flex items-center gap-4">
              <input 
                type="file" 
                accept="image/*" 
                @change="handleLogoUpload"
                class="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-600/20 file:text-blue-400 hover:file:bg-blue-600/30 file:cursor-pointer"
              />
              <button 
                v-if="config.logoUrl" 
                @click="config.logoUrl = ''" 
                class="text-xs text-rose-400 hover:underline cursor-pointer"
              >
                Hapus Logo
              </button>
            </div>
          </div>

          <div class="pt-4 border-t border-slate-800">
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="config.allowTrial" class="rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-0 w-4 h-4 cursor-pointer" />
              <span class="text-sm font-medium text-slate-300">Tampilkan Tombol Coba Gratis (Trial) jika router mendukung</span>
            </label>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">Teks Footer Hak Cipta</label>
            <input 
              v-model="config.footerText" 
              type="text" 
              class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <!-- Tab 2: Design & Presets -->
        <div v-if="activeTab === 'design'" class="space-y-5">
          <!-- Background Type Selector -->
          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-2">Tipe Latar Belakang (Background)</label>
            <div class="grid grid-cols-2 gap-2">
              <button 
                @click="config.bgType = 'color'"
                :class="['p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer', config.bgType === 'color' ? 'border-blue-500 bg-blue-500/10 text-blue-400' : 'border-slate-800 bg-slate-950 text-slate-400']"
              >
                <Palette class="w-4 h-4" /> Warna Solid / Gradient
              </button>
              <button 
                @click="config.bgType = 'image'"
                :class="['p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer', config.bgType === 'image' ? 'border-blue-500 bg-blue-500/10 text-blue-400' : 'border-slate-800 bg-slate-950 text-slate-400']"
              >
                <ImageIcon class="w-4 h-4" /> Gambar / Foto
              </button>
            </div>
          </div>

          <!-- Section If Image BG -->
          <div v-if="config.bgType === 'image'" class="space-y-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1.5">Pilihan Wallpaper Siap Pakai (Warkop, Kafe, Gaming)</label>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <div 
                  v-for="(wp, i) in curatedWallpapers" 
                  :key="i"
                  @click="applyCuratedBg(wp.url)"
                  :class="['relative rounded-lg overflow-hidden border cursor-pointer group h-16 transition', config.bgImageUrl === wp.url ? 'border-blue-500 ring-2 ring-blue-500' : 'border-slate-800 hover:border-slate-600']"
                >
                  <img :src="wp.url" class="w-full h-full object-cover group-hover:scale-105 transition" />
                  <div class="absolute inset-0 bg-black/50 flex items-end p-1.5">
                    <span class="text-[9px] font-semibold text-white truncate">{{ wp.name }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Upload Custom File -->
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Upload Gambar dari Galeri HP / Komputer</label>
              <input 
                type="file" 
                accept="image/*" 
                @change="handleBgUpload"
                class="text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-600/20 file:text-blue-400 hover:file:bg-blue-600/30 file:cursor-pointer"
              />
            </div>

            <!-- Google / Web Direct URL -->
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Atau Tempel URL Gambar dari Google / Web</label>
              <div class="flex gap-2">
                <input 
                  v-model="customGoogleUrl" 
                  type="url" 
                  placeholder="https://contoh.com/gambar-warkop.jpg" 
                  class="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                />
                <button 
                  @click="applyCustomGoogleUrl"
                  class="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Check class="w-3.5 h-3.5" /> Pasang
                </button>
              </div>
            </div>

            <!-- Dark Overlay Slider -->
            <div>
              <div class="flex items-center justify-between text-xs text-slate-300 mb-1">
                <span>Kegelapan Lapisan Background (Overlay): {{ Math.round(config.bgOverlay * 100) }}%</span>
              </div>
              <input 
                type="range" 
                min="0.1" 
                max="0.85" 
                step="0.05" 
                v-model.number="config.bgOverlay" 
                class="w-full accent-blue-500 cursor-pointer"
              />
              <span class="text-[10px] text-slate-500">Makin gelap, teks dan form login makin mudah terbaca oleh pelanggan.</span>
            </div>
          </div>

          <!-- Section If Color BG -->
          <div v-else>
            <label class="block text-xs font-semibold text-slate-400 mb-2">Preset Warna Siap Pakai</label>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-4">
              <button 
                v-for="preset in colorPresets" 
                :key="preset.name"
                @click="applyPreset(preset)"
                class="p-2.5 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-slate-700 text-left flex flex-col gap-1.5 transition cursor-pointer"
              >
                <div class="flex items-center gap-1.5">
                  <span class="w-3.5 h-3.5 rounded-full border border-white/20" :style="{ backgroundColor: preset.primary }"></span>
                  <span class="w-3.5 h-3.5 rounded-full border border-white/20" :style="{ backgroundColor: preset.bg }"></span>
                  <span class="text-[10px] font-medium text-slate-200 ml-auto">{{ preset.dark ? '🌙' : '☀️' }}</span>
                </div>
                <span class="text-xs font-semibold text-slate-300">{{ preset.name }}</span>
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-400 mb-1">Warna Utama Tombol & Aksen</label>
              <div class="flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-xl p-2">
                <input type="color" v-model="config.primaryColor" class="w-8 h-8 rounded border-none cursor-pointer bg-transparent" />
                <span class="text-xs font-mono text-slate-300 uppercase">{{ config.primaryColor }}</span>
              </div>
            </div>

            <div v-if="config.bgType === 'color'">
              <label class="block text-xs font-semibold text-slate-400 mb-1">Warna Background Layar</label>
              <div class="flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-xl p-2">
                <input type="color" v-model="config.bgColor" class="w-8 h-8 rounded border-none cursor-pointer bg-transparent" />
                <span class="text-xs font-mono text-slate-300 uppercase">{{ config.bgColor }}</span>
              </div>
            </div>
          </div>

          <!-- Card Transparency & Blur Controls -->
          <div class="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
            <div>
              <div class="flex items-center justify-between text-xs text-slate-300 mb-1">
                <span class="font-semibold">Opacity / Transparansi Kartu Login:</span>
                <span class="font-mono text-blue-400 font-bold">{{ Math.round(config.cardOpacity * 100) }}%</span>
              </div>
              <input 
                type="range" 
                min="0.2" 
                max="1.0" 
                step="0.05" 
                v-model.number="config.cardOpacity" 
                class="w-full accent-blue-500 cursor-pointer"
              />
              <span class="text-[10px] text-slate-500">Makin kecil nilainya, kartu semakin tembus pandang (efek Glassmorphism transparan).</span>
            </div>

            <div>
              <div class="flex items-center justify-between text-xs text-slate-300 mb-1">
                <span class="font-semibold">Efek Blur Kaca Belakang:</span>
                <span class="font-mono text-blue-400 font-bold">{{ config.cardBlur }}px</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="30" 
                step="2" 
                v-model.number="config.cardBlur" 
                class="w-full accent-blue-500 cursor-pointer"
              />
            </div>
          </div>

          <div class="flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded-xl">
            <div>
              <div class="text-sm font-semibold text-slate-200">Mode Tampilan Kartu</div>
              <div class="text-xs text-slate-400">Pilih mode gelap (Dark Card) atau terang (Light Card)</div>
            </div>
            <button 
              @click="config.darkMode = !config.darkMode"
              class="px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
            >
              <component :is="config.darkMode ? Moon : Sun" class="w-4 h-4" />
              {{ config.darkMode ? 'Dark Theme' : 'Light Theme' }}
            </button>
          </div>
        </div>

        <!-- Tab 3: Packages -->
        <div v-if="activeTab === 'packages'" class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-slate-400">Daftar Paket yang Ditampilkan ke Pelanggan</span>
            <button 
              @click="addPackage"
              class="flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 cursor-pointer"
            >
              <Plus class="w-3.5 h-3.5" /> Tambah Paket
            </button>
          </div>

          <div v-for="(pkg, idx) in config.packages" :key="idx" class="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-3">
            <div class="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input 
                v-model="pkg.name" 
                type="text" 
                placeholder="Nama Paket" 
                class="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100" 
              />
              <input 
                v-model="pkg.desc" 
                type="text" 
                placeholder="Keterangan singkat" 
                class="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100" 
              />
              <input 
                v-model="pkg.price" 
                type="text" 
                placeholder="Harga (Rp)" 
                class="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 font-semibold" 
              />
            </div>
            <button 
              @click="removePackage(idx)" 
              class="p-2 text-slate-500 hover:text-rose-400 transition cursor-pointer"
            >
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Tab 4: WhatsApp Ordering -->
        <div v-if="activeTab === 'whatsapp'" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">Nomor WhatsApp Admin / Kasir (Gunakan kode negara 62)</label>
            <input 
              v-model="config.waNumber" 
              type="text" 
              class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
              placeholder="Contoh: 628123456789"
            />
            <p class="text-[11px] text-slate-500 mt-1">Kosongkan jika tidak ingin tombol beli via WA muncul.</p>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">Pesan Otomatis WhatsApp</label>
            <textarea 
              v-model="config.waMessage" 
              rows="3"
              class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
              placeholder="Pesan pembuka ketika pembeli menekan tombol beli voucher..."
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Right: Mobile Device Live Preview (5 Cols) -->
      <div 
        :class="[
          'lg:col-span-5 flex flex-col items-center w-full transition-all',
          mobileView === 'preview' ? 'block' : 'hidden lg:flex'
        ]"
      >
        <div class="flex items-center justify-between w-full max-w-[340px] mb-3">
          <span class="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
            <Smartphone class="w-4 h-4 text-blue-400" /> Live Preview HP
          </span>
          <div class="flex bg-slate-900 border border-slate-800 p-0.5 rounded-lg text-xs">
            <button 
              @click="previewMode = 'voucher'"
              :class="['px-2.5 py-1 rounded-md transition cursor-pointer', previewMode === 'voucher' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400']"
            >
              Voucher
            </button>
            <button 
              @click="previewMode = 'member'"
              :class="['px-2.5 py-1 rounded-md transition cursor-pointer', previewMode === 'member' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400']"
            >
              Member
            </button>
          </div>
        </div>

        <!-- Phone Shell Mockup -->
        <div 
          class="w-full max-w-[340px] mx-auto rounded-[36px] p-3 shadow-2xl border-4 border-slate-800 transition-all duration-300 relative overflow-hidden"
          :style="config.bgType === 'image' && config.bgImageUrl ? {
            backgroundImage: `linear-gradient(rgba(0,0,0,${config.bgOverlay}), rgba(0,0,0,${config.bgOverlay})), url('${config.bgImageUrl}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          } : { backgroundColor: config.bgColor }"
        >
          <!-- Phone Notch / Island -->
          <div class="w-24 h-4 bg-slate-900/90 rounded-full mx-auto mb-3 relative z-10"></div>

          <!-- Screen Content Box -->
          <div 
            class="rounded-[24px] p-4 sm:p-5 shadow-2xl border transition-all duration-300 flex flex-col text-center"
            :style="{ 
              backgroundColor: config.darkMode ? `rgba(30, 41, 59, ${config.cardOpacity})` : `rgba(255, 255, 255, ${config.cardOpacity})`,
              backdropFilter: `blur(${config.cardBlur}px)`,
              WebkitBackdropFilter: `blur(${config.cardBlur}px)`,
              borderColor: config.darkMode ? 'rgba(51, 65, 85, 0.6)' : 'rgba(226, 232, 240, 0.8)',
              color: config.darkMode ? '#f8fafc' : '#0f172a'
            }"
          >
            <!-- Logo & Title -->
            <div class="mb-4">
              <img v-if="config.logoUrl" :src="config.logoUrl" alt="Logo" class="max-h-12 max-w-[120px] mx-auto mb-2 object-contain" />
              <div class="font-extrabold text-base tracking-tight leading-snug">{{ config.brandName || 'NAMA WIFI' }}</div>
              <div class="text-[11px] mt-0.5 opacity-70">{{ config.subtitle || 'Internet Hotspot' }}</div>
            </div>

            <!-- Announcement -->
            <div v-if="config.announcement" class="mb-3 px-2 py-1.5 rounded-lg text-[10px] font-medium leading-tight" :style="{ backgroundColor: config.darkMode ? '#0f172a' : '#f1f5f9' }">
              📢 {{ config.announcement }}
            </div>

            <!-- Tab Toggle Preview -->
            <div class="flex p-1 rounded-xl mb-3 text-[11px] font-semibold" :style="{ backgroundColor: config.darkMode ? '#0f172a' : '#f1f5f9' }">
              <div 
                :class="['flex-1 py-1 rounded-lg transition-all', previewMode === 'voucher' ? 'shadow text-white' : 'opacity-60']"
                :style="previewMode === 'voucher' ? { backgroundColor: config.primaryColor } : {}"
              >
                Kode Voucher
              </div>
              <div 
                :class="['flex-1 py-1 rounded-lg transition-all', previewMode === 'member' ? 'shadow text-white' : 'opacity-60']"
                :style="previewMode === 'member' ? { backgroundColor: config.primaryColor } : {}"
              >
                Member
              </div>
            </div>

            <!-- Form Mockup -->
            <div class="space-y-2 text-left mb-3">
              <div>
                <label class="block text-[10px] font-semibold opacity-70 mb-1">
                  {{ previewMode === 'voucher' ? 'Kode Voucher' : 'Username' }}
                </label>
                <div class="w-full px-3 py-2 text-xs rounded-lg border opacity-90" :style="{ borderColor: config.darkMode ? '#334155' : '#cbd5e1', backgroundColor: config.darkMode ? '#0f172a' : '#ffffff' }">
                  {{ previewMode === 'voucher' ? 'Masukkan kode...' : 'Masukkan username...' }}
                </div>
              </div>

              <div v-if="previewMode === 'member'">
                <label class="block text-[10px] font-semibold opacity-70 mb-1">Password</label>
                <div class="w-full px-3 py-2 text-xs rounded-lg border opacity-90" :style="{ borderColor: config.darkMode ? '#334155' : '#cbd5e1', backgroundColor: config.darkMode ? '#0f172a' : '#ffffff' }">
                  ••••••••
                </div>
              </div>

              <button 
                class="w-full py-2.5 rounded-xl font-bold text-xs text-white shadow-md transition-all active:scale-95"
                :style="{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor})` }"
              >
                LOGIN SEKARANG
              </button>
            </div>

            <!-- Trial Button Mockup -->
            <div v-if="config.allowTrial" class="text-[11px] font-semibold mb-3" :style="{ color: config.primaryColor }">
              ✨ Coba Gratis (Trial)
            </div>

            <!-- Package List Mockup -->
            <div v-if="config.packages.length > 0" class="text-left space-y-1.5 mb-3 border-t pt-2" :style="{ borderColor: config.darkMode ? '#334155' : '#e2e8f0' }">
              <div class="text-[10px] font-bold uppercase tracking-wider opacity-60">Daftar Paket</div>
              <div 
                v-for="(pkg, idx) in config.packages" 
                :key="idx"
                class="flex items-center justify-between p-2 rounded-lg border text-xs"
                :style="{ borderColor: config.darkMode ? '#334155' : '#e2e8f0', backgroundColor: config.darkMode ? '#0f172a' : '#f8fafc' }"
              >
                <div>
                  <div class="font-bold text-[11px]">{{ pkg.name }}</div>
                  <div class="text-[9px] opacity-70">{{ pkg.desc }}</div>
                </div>
                <div class="font-extrabold text-[11px]" :style="{ color: config.primaryColor }">{{ pkg.price }}</div>
              </div>
            </div>

            <!-- WhatsApp Button Mockup -->
            <div v-if="config.waNumber" class="py-2 px-3 rounded-xl bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm">
              <MessageCircle class="w-3.5 h-3.5" /> Beli Voucher via WhatsApp
            </div>

            <!-- Footer Text -->
            <div class="text-[9px] opacity-50 mt-4">
              {{ config.footerText }}
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Mobile Floating Action Bar (Hanya di layar HP) -->
    <div class="lg:hidden fixed bottom-0 left-0 right-0 p-3 bg-slate-900/95 border-t border-slate-800 backdrop-blur z-30 flex items-center gap-3">
      <button 
        @click="downloadZip" 
        :disabled="isGenerating"
        class="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95 disabled:opacity-50 cursor-pointer"
      >
        <Download class="w-4 h-4" />
        {{ isGenerating ? 'Mengemas ZIP...' : 'Download Template (.zip)' }}
      </button>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 text-center shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div class="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
          <ShieldCheck class="w-8 h-8" />
        </div>
        <h3 class="text-xl font-bold text-slate-100 mb-1">File ZIP Berhasil Diunduh!</h3>
        <p class="text-xs text-slate-400 mb-6">
          Template hotspot Anda sudah siap dipasang ke MikroTik RouterOS.
        </p>

        <div class="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-left text-xs space-y-2 mb-6">
          <div class="font-semibold text-slate-200 mb-1">Langkah Memasang di Winbox:</div>
          <div class="flex gap-2 text-slate-300">
            <span class="font-bold text-blue-400">1.</span>
            <span>Ekstrak file ZIP hasil unduhan di komputer Anda.</span>
          </div>
          <div class="flex gap-2 text-slate-300">
            <span class="font-bold text-blue-400">2.</span>
            <span>Buka <b>Winbox</b> &rarr; Masuk ke menu <b>Files</b>.</span>
          </div>
          <div class="flex gap-2 text-slate-300">
            <span class="font-bold text-blue-400">3.</span>
            <span>Drag-and-drop folder <b>hotspot</b> ke dalam menu Files MikroTik.</span>
          </div>
          <div class="flex gap-2 text-slate-300">
            <span class="font-bold text-blue-400">4.</span>
            <span>Di <b>IP &rarr; Hotspot &rarr; Server Profiles</b>, arahkan HTML Directory ke folder tersebut. Selesai! 🎉</span>
          </div>
        </div>

        <button 
          @click="showSuccessModal = false"
          class="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm transition cursor-pointer"
        >
          Selesai & Tutup
        </button>
      </div>
    </div>
  </div>
</template>
