<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { useLang } from '../composables/useLang.js'

const LANG = {
  en: { home: 'Home', about: 'About', restaurant: 'Restaurant', rooms: 'Rooms', gallery: 'Gallery', contact: 'Contact', book: 'Book Now' },
  zh: { home: '首页', about: '关于我们', restaurant: '餐厅', rooms: '客房', gallery: '图库', contact: '联系我们', book: '立即预订' },
  lo: { home: 'ໜ້າຫຼັກ', about: 'ກ່ຽວກັບ', restaurant: 'ຮ້ານອາຫານ', rooms: 'ຫ້ອງພັກ', gallery: 'ຮູບພາບ', contact: 'ຕິດຕໍ່', book: 'ຈອງດຽວນີ້' },
}
const LANG_LABELS = { en: 'English', zh: '中文', lo: 'ລາວ' }

const { lang } = useLang()
const menuOpen = ref(false)
const langOpen = ref(false)
const scrolled = ref(false)

const route = useRoute()
const router = useRouter()

const t = computed(() => LANG[lang.value])

const fontFamily = computed(() => {
  if (lang.value === 'lo') return "'Noto Sans Lao', 'Inter', sans-serif"
  if (lang.value === 'zh') return "'Noto Sans SC', 'Inter', sans-serif"
  return "'Inter', sans-serif"
})

const displayFont = computed(() => {
  if (lang.value === 'zh') return "'Noto Sans SC', serif"
  if (lang.value === 'lo') return "'Noto Sans Lao', serif"
  return "'DM Serif Display', serif"
})

const isHome = computed(() => route.path === '/')

const navItems = computed(() => [
  { id: 'hero',       label: t.value.home,       to: { path: '/', hash: '#hero' } },
  { id: 'about',      label: t.value.about,      to: { path: '/', hash: '#about' } },
  { id: 'restaurant', label: t.value.restaurant, to: '/menu' },
  { id: 'rooms',      label: t.value.rooms,      to: '/hostel' },
  { id: 'gallery',    label: t.value.gallery,    to: '/gallery' },
  { id: 'contact',    label: t.value.contact,    to: '/contact' },
])

const navStyle = computed(() => {
  const transparent = isHome.value && !scrolled.value
  return {
    position: 'fixed',
    top: 0, left: 0, right: 0,
    zIndex: 100,
    background: transparent ? 'transparent' : 'rgba(250,246,240,0.95)',
    backdropFilter: transparent ? 'none' : 'blur(12px)',
    borderBottom: transparent ? 'none' : '1px solid rgba(180,150,110,0.2)',
    transition: 'all 0.3s ease',
    padding: '0 24px',
  }
})

function closeMenu() { menuOpen.value = false }

function setLang(code) {
  lang.value = code
  langOpen.value = false
  menuOpen.value = false
}

function onScroll() { scrolled.value = window.scrollY > 40 }

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <nav :style="navStyle">
    <div style="max-width: 1100px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; height: 64px">

      <div class="logo" :style="{ fontFamily: displayFont }" @click="router.push('/')">
        <span style="color: #8B6914">W</span>ood <span style="color: #8B6914">W</span>ood
      </div>

      <!-- Desktop nav -->
      <div class="desktop-nav" :style="{ fontFamily }">
        <RouterLink
          v-for="item in navItems"
          :key="item.id"
          class="nav-link"
          :to="item.to"
          @click="closeMenu"
        >{{ item.label }}</RouterLink>

        <div style="position: relative">
          <button class="lang-btn" @click="langOpen = !langOpen">
            {{ LANG_LABELS[lang] }} ▾
          </button>
          <div v-if="langOpen" class="lang-dropdown">
            <div
              v-for="[code, label] in Object.entries(LANG_LABELS)"
              :key="code"
              class="lang-option"
              :class="{ active: lang === code }"
              @click="setLang(code)"
            >{{ label }}</div>
          </div>
        </div>

        <button class="book-btn" @click="router.push('/hostel')">
          {{ t.book }}
        </button>
      </div>

      <!-- Mobile hamburger -->
      <button class="mobile-menu-btn" @click="menuOpen = !menuOpen">
        {{ menuOpen ? '✕' : '☰' }}
      </button>
    </div>

    <!-- Mobile drawer -->
    <div v-if="menuOpen" class="mobile-menu">
      <RouterLink
        v-for="item in navItems"
        :key="item.id"
        class="mobile-menu-item"
        :to="item.to"
        @click="closeMenu"
      >{{ item.label }}</RouterLink>
      <div class="mobile-lang-row">
        <button
          v-for="[code, label] in Object.entries(LANG_LABELS)"
          :key="code"
          class="mobile-lang-btn"
          :class="{ active: lang === code }"
          @click="setLang(code)"
        >{{ label }}</button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.logo {
  font-size: 22px;
  font-weight: 700;
  color: #3D2B1F;
  letter-spacing: -0.02em;
  cursor: pointer;
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 28px;
}
.nav-link {
  font-size: 13px;
  font-weight: 500;
  color: #5A4A3A;
  text-decoration: none;
  letter-spacing: 0.02em;
  transition: color 0.2s;
}
.nav-link:hover,
.nav-link.router-link-active { color: #8B6914; }

.lang-btn {
  background: none;
  border: 1px solid rgba(139,105,20,0.3);
  border-radius: 6px;
  padding: 5px 12px;
  font-size: 12px;
  font-weight: 500;
  color: #5A4A3A;
  cursor: pointer;
}
.lang-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  overflow: hidden;
  min-width: 100px;
  z-index: 10;
}
.lang-option {
  padding: 10px 16px;
  font-size: 13px;
  cursor: pointer;
  background: #fff;
  font-weight: 400;
}
.lang-option:hover,
.lang-option.active { background: #F5E6C8; }
.lang-option.active { font-weight: 600; }

.book-btn {
  background: #3D2B1F;
  color: #F5E6C8;
  border: none;
  border-radius: 6px;
  padding: 8px 18px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  letter-spacing: 0.02em;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #3D2B1F;
}
.mobile-menu {
  background: rgba(250,246,240,0.98);
  padding: 16px 24px 24px;
  border-top: 1px solid rgba(180,150,110,0.2);
}
.mobile-menu-item {
  display: block;
  padding: 12px 0;
  font-size: 15px;
  font-weight: 500;
  color: #3D2B1F;
  text-decoration: none;
  border-bottom: 1px solid rgba(180,150,110,0.15);
}
.mobile-lang-row {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}
.mobile-lang-btn {
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #fff;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
}
.mobile-lang-btn.active {
  border: 2px solid #8B6914;
  background: #F5E6C8;
}

@media (max-width: 768px) {
  .desktop-nav { display: none; }
  .mobile-menu-btn { display: block; }
}
</style>
