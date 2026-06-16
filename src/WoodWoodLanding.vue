<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useLang } from './composables/useLang.js'

const LANG = {
  en: {
    nav: { home: 'Home', about: 'About', restaurant: 'Restaurant', rooms: 'Rooms', location: 'Location', book: 'Book Now' },
    hero: {
      tagline: 'Rest. Eat. Feel at home.',
      sub: 'A cozy wooden retreat in the heart of Vientiane',
      cta: 'Explore rooms',
    },
    about: {
      eyebrow: 'Our Story',
      title: 'Built with wood. Run with heart.',
      p1: "Wood Wood is more than a hostel — it's a feeling. From the moment you step through the door, the warmth of natural wood surrounds you. Every beam, every floor, every corner was designed to make you slow down, breathe, and feel at home.",
      p2: "Located on Rue Pangkham in central Vientiane, just steps from the Mekong night market, temples, and cafés. Whether you're a solo backpacker, a couple exploring Laos, or a digital nomad looking for a quiet corner — this is your place.",
      stat1: '104+', stat1Label: 'Guest reviews',
      stat2: '9.8', stat2Label: 'Trip.com rating',
      stat3: '3 min', stat3Label: 'To National Museum',
    },
    restaurant: {
      eyebrow: 'The Kitchen',
      title: 'Good food, good coffee, good company.',
      p: 'Our ground-floor restaurant serves Asian and Western breakfast, hearty lunch plates, specialty coffee, and cold drinks. Hostel guests enjoy 10% off every meal. Come for the food, stay for the vibe.',
      item1: 'Asian & American Breakfast',
      item2: 'Fresh Coffee & Smoothies',
      item3: 'Lao & International Dishes',
      item4: '10% off for guests',
    },
    rooms: {
      eyebrow: 'Stay With Us',
      title: 'Simple. Clean. Comfortable.',
      p: 'All-wood interiors, air conditioning, garden-view patios, free Wi-Fi, and shared lounges designed for meeting fellow travelers.',
      room1: 'Mixed Dormitory', room1desc: '10-bed room · 29m² · A/C · Shared bath',
      room2: 'Female Dormitory', room2desc: '10-bed room · 38m² · A/C · Women only',
      room3: 'Private Room', room3desc: 'Double bed · Garden view · Patio',
      from: 'from', perNight: '/night', bookOn: 'Book on',
    },
    location: {
      eyebrow: 'Find Us',
      title: '199 Rue Pangkham, Vientiane',
      p: 'In the old quarter, walking distance to everything. 5 km from Wattay International Airport.',
      checkin: 'Check-in: 14:00 – 22:00',
      checkout: 'Check-out: 08:00 – 12:00',
    },
    footer: {
      tagline: 'Wood Wood Restaurant & Hostel',
      address: '199 Rue Pangkham, Vientiane, Laos',
      rights: '© 2026 Wood Wood. All rights reserved.',
    },
  },
  zh: {
    nav: { home: '首页', about: '关于我们', restaurant: '餐厅', rooms: '客房', location: '位置', book: '立即预订' },
    hero: {
      tagline: '休息。用餐。宾至如归。',
      sub: '万象市中心温馨的木屋小憩',
      cta: '探索客房',
    },
    about: {
      eyebrow: '我们的故事',
      title: '以木建造，用心经营。',
      p1: 'Wood Wood 不仅仅是一家青旅——它是一种感觉。踏入门的那一刻，天然木材的温暖便围绕着你。每一根横梁、每一块地板、每一个角落，都旨在让你放慢脚步、深呼吸、感受家的温暖。',
      p2: '位于万象市中心的 Rue Pangkham，步行即可到达湄公河夜市、寺庙和咖啡馆。无论你是独行背包客、探索老挝的情侣，还是寻找安静角落的数字游民——这里就是你的地方。',
      stat1: '104+', stat1Label: '客人评价',
      stat2: '9.8', stat2Label: 'Trip.com 评分',
      stat3: '3 分钟', stat3Label: '到国家博物馆',
    },
    restaurant: {
      eyebrow: '厨房',
      title: '好食物，好咖啡，好伙伴。',
      p: '一楼餐厅供应亚洲和西式早餐、丰盛的午餐、特色咖啡和冷饮。住客用餐享九折优惠。为美食而来，因氛围而留。',
      item1: '亚洲和美式早餐', item2: '鲜制咖啡和果昔',
      item3: '老挝及国际菜肴', item4: '住客九折优惠',
    },
    rooms: {
      eyebrow: '入住体验',
      title: '简约。整洁。舒适。',
      p: '全木内饰、空调、花园景观露台、免费WiFi，以及专为旅行者交流而设计的共享休息室。',
      room1: '混合宿舍', room1desc: '10人间 · 29m² · 空调 · 共用浴室',
      room2: '女生宿舍', room2desc: '10人间 · 38m² · 空调 · 仅限女性',
      room3: '私人房间', room3desc: '双人床 · 花园景观 · 露台',
      from: '起价', perNight: '/晚', bookOn: '预订于',
    },
    location: {
      eyebrow: '找到我们',
      title: '万象市 Rue Pangkham 199号',
      p: '位于老城区，步行可达各处。距瓦岱国际机场5公里。',
      checkin: '入住时间：14:00 – 22:00',
      checkout: '退房时间：08:00 – 12:00',
    },
    footer: {
      tagline: 'Wood Wood 餐厅与青旅',
      address: '老挝万象市 Rue Pangkham 199号',
      rights: '© 2026 Wood Wood. 保留所有权利。',
    },
  },
  lo: {
    nav: { home: 'ໜ້າຫຼັກ', about: 'ກ່ຽວກັບ', restaurant: 'ຮ້ານອາຫານ', rooms: 'ຫ້ອງພັກ', location: 'ສະຖານທີ່', book: 'ຈອງດຽວນີ້' },
    hero: {
      tagline: 'ພັກຜ່ອນ. ກິນ. ຮູ້ສຶກຄືຢູ່ເຮືອນ.',
      sub: 'ບ່ອນພັກໄມ້ອົບອຸ່ນໃຈກາງນະຄອນຫຼວງວຽງຈັນ',
      cta: 'ເບິ່ງຫ້ອງພັກ',
    },
    about: {
      eyebrow: 'ເລື່ອງຂອງພວກເຮົາ',
      title: 'ສ້າງດ້ວຍໄມ້. ດຳເນີນດ້ວຍໃຈ.',
      p1: 'Wood Wood ບໍ່ແມ່ນພຽງແຕ່ໂຮສເທວ — ມັນແມ່ນຄວາມຮູ້ສຶກ. ຕັ້ງແຕ່ກ້າວເຂົ້າປະຕູ, ຄວາມອົບອຸ່ນຂອງໄມ້ທຳມະຊາດຈະຫໍ້ອ້ອಮຮອບທ່ານ.',
      p2: 'ຕັ້ງຢູ່ຖະໜົນປາງຄຳ ໃຈກາງວຽງຈັນ, ຍ່າງໄປຕະຫຼາດກາງຄືນແຄມຂອງ, ວັດ ແລະ ຮ້ານກາເຟໄດ້.',
      stat1: '104+', stat1Label: 'ການລີວິວ',
      stat2: '9.8', stat2Label: 'ຄະແນນ Trip.com',
      stat3: '3 ນາທີ', stat3Label: 'ຫາພິພິທະພັນ',
    },
    restaurant: {
      eyebrow: 'ເຮືອນຄົວ',
      title: 'ອາຫານແຊບ, ກາເຟແຊບ, ເພື່ອນດີ.',
      p: 'ຮ້ານອາຫານຊັ້ນລຸ່ມບໍລິການອາຫານເຊົ້າແບບອາຊີ ແລະ ຕາເວັນຕົກ. ແຂກທີ່ພັກໄດ້ສ່ວນຫຼຸດ 10%.',
      item1: 'ອາຫານເຊົ້າແບບອາຊີ & ອາເມລິກາ', item2: 'ກາເຟສົດ & ສະມູດທີ',
      item3: 'ອາຫານລາວ & ສາກົນ', item4: 'ສ່ວນຫຼຸດ 10% ສຳລັບແຂກ',
    },
    rooms: {
      eyebrow: 'ພັກກັບພວກເຮົາ',
      title: 'ງ່າຍດາຍ. ສະອາດ. ສະດວກສະບາຍ.',
      p: 'ພາຍໃນທັງໝົດເປັນໄມ້, ແອ, ລະບຽງສວນ, WiFi ຟຣີ, ແລະ ຫ້ອງພັກຜ່ອນຮ່ວມ.',
      room1: 'ຫ້ອງນອນລວມ', room1desc: '10 ຕຽງ · 29m² · ແອ · ຫ້ອງນ້ຳຮ່ວມ',
      room2: 'ຫ້ອງນອນຍິງ', room2desc: '10 ຕຽງ · 38m² · ແອ · ສະເພາະແມ່ຍິງ',
      room3: 'ຫ້ອງສ່ວນຕົວ', room3desc: 'ຕຽງຄູ່ · ວິວສວນ · ລະບຽງ',
      from: 'ເລີ່ມຕົ້ນ', perNight: '/ຄືນ', bookOn: 'ຈອງຜ່ານ',
    },
    location: {
      eyebrow: 'ຊອກຫາພວກເຮົາ',
      title: '199 ຖະໜົນປາງຄຳ, ວຽງຈັນ',
      p: 'ຢູ່ໃນເຂດເມືອງເກົ່າ, ຍ່າງໄປໄດ້ທຸກບ່ອນ. ຫ່າງຈາກສະໜາມບິນ 5 ກມ.',
      checkin: 'ເຊັກອິນ: 14:00 – 22:00',
      checkout: 'ເຊັກເອົາ: 08:00 – 12:00',
    },
    footer: {
      tagline: 'Wood Wood ຮ້ານອາຫານ & ໂຮສເທວ',
      address: '199 ຖະໜົນປາງຄຳ, ວຽງຈັນ, ລາວ',
      rights: '© 2026 Wood Wood. ສະຫງວນລິຂະສິດ.',
    },
  },
}

const { lang } = useLang()
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

const stats = computed(() => [
  [t.value.about.stat1, t.value.about.stat1Label],
  [t.value.about.stat2, t.value.about.stat2Label],
  [t.value.about.stat3, t.value.about.stat3Label],
])

const restaurantItems = computed(() => [
  t.value.restaurant.item1,
  t.value.restaurant.item2,
  t.value.restaurant.item3,
  t.value.restaurant.item4,
])

const rooms = computed(() => [
  { name: t.value.rooms.room1, desc: t.value.rooms.room1desc, price: '$6', colorStart: '#D4A574', colorEnd: '#B8885A' },
  { name: t.value.rooms.room2, desc: t.value.rooms.room2desc, price: '$6', colorStart: '#C4935A', colorEnd: '#A67C3D' },
  { name: t.value.rooms.room3, desc: t.value.rooms.room3desc, price: '$18', colorStart: '#A67C3D', colorEnd: '#8B6914' },
])

const router = useRouter()

const heroImages = [
  '/gmaps-photos/hero/hero1.jpg',
  '/gmaps-photos/hero/hero2.jpg',
  '/gmaps-photos/hero/hero4.jpg',
  '/gmaps-photos/hero/hero5.jpg',
  '/gmaps-photos/hero/hero6.jpg',
  '/gmaps-photos/hero/hero7.jpg',
  '/gmaps-photos/hero/hero8.jpg',
  '/gmaps-photos/hero/hero9.jpg',
  '/gmaps-photos/hero/hero10.jpg',
  '/gmaps-photos/hero/unnamed.jpg',
]

const currentHero = ref(0)
let heroTimer = null

onMounted(() => {
  heroTimer = setInterval(() => {
    currentHero.value = (currentHero.value + 1) % heroImages.length
  }, 5000)
})

onUnmounted(() => clearInterval(heroTimer))
</script>

<template>
  <div :style="{ fontFamily, color: '#2C1810', background: '#FAF6F0', minHeight: '100vh', overflowX: 'hidden' }">

    <!-- Wood grain SVG pattern -->
    <svg width="0" height="0" style="position: absolute">
      <defs>
        <pattern id="woodgrain" patternUnits="userSpaceOnUse" width="200" height="200">
          <rect width="200" height="200" fill="#D4A574" />
          <path d="M0 20 Q50 15 100 22 T200 18" stroke="#C4935A" stroke-width="0.8" fill="none" opacity="0.5" />
          <path d="M0 45 Q60 40 120 48 T200 43" stroke="#C4935A" stroke-width="0.6" fill="none" opacity="0.4" />
          <path d="M0 70 Q40 66 90 73 T200 68" stroke="#C4935A" stroke-width="0.7" fill="none" opacity="0.45" />
          <path d="M0 95 Q55 90 110 97 T200 93" stroke="#C4935A" stroke-width="0.5" fill="none" opacity="0.35" />
          <path d="M0 120 Q45 116 95 123 T200 118" stroke="#C4935A" stroke-width="0.8" fill="none" opacity="0.4" />
          <path d="M0 148 Q60 143 115 150 T200 146" stroke="#C4935A" stroke-width="0.6" fill="none" opacity="0.45" />
          <path d="M0 175 Q50 170 100 177 T200 173" stroke="#C4935A" stroke-width="0.7" fill="none" opacity="0.38" />
        </pattern>
      </defs>
    </svg>

    <!-- HERO -->
    <section id="hero" class="hero-section">
      <!-- Sliding background images -->
      <div class="hero-bg">
        <img
          v-for="(src, i) in heroImages"
          :key="src"
          :src="src"
          class="hero-bg-img"
          :class="{ active: i === currentHero }"
        />
        <div class="hero-overlay" />
      </div>

      <div class="hero-bar" />

      <div class="hero-logo-circle">
        <span :style="{ fontFamily: displayFont }" class="hero-logo-text">WW</span>
      </div>

      <h1 class="hero-title" :style="{ fontFamily: displayFont }">{{ t.hero.tagline }}</h1>
      <p class="hero-sub">{{ t.hero.sub }}</p>

      <button class="cta-btn" :style="{ fontFamily }" @click="router.push('/hostel')">
        {{ t.hero.cta }}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Dot indicators -->
      <div class="hero-dots">
        <button
          v-for="(_, i) in heroImages"
          :key="i"
          class="hero-dot"
          :class="{ active: i === currentHero }"
          @click="currentHero = i"
          :aria-label="`Slide ${i + 1}`"
        />
      </div>

      <div class="scroll-hint">↓</div>
    </section>

    <!-- ABOUT -->
    <section id="about" class="about-section">
      <div class="section-inner">
        <span class="eyebrow eyebrow--gold">{{ t.about.eyebrow }}</span>
        <h2 class="section-title" :style="{ fontFamily: displayFont }">{{ t.about.title }}</h2>
        <p class="body-text" style="margin: 0 0 16px">{{ t.about.p1 }}</p>
        <p class="body-text" style="margin: 0 0 40px">{{ t.about.p2 }}</p>
        <div class="stats-row">
          <div v-for="[val, label] in stats" :key="label" class="stat-item">
            <div class="stat-value" :style="{ fontFamily: displayFont }">{{ val }}</div>
            <div class="stat-label">{{ label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- RESTAURANT -->
    <section id="restaurant" class="restaurant-section">
      <div class="section-inner">
        <span class="eyebrow eyebrow--green">{{ t.restaurant.eyebrow }}</span>
        <h2 class="section-title" :style="{ fontFamily: displayFont }">{{ t.restaurant.title }}</h2>
        <p class="body-text" style="max-width: 600px; margin: 0 0 36px">{{ t.restaurant.p }}</p>
        <div class="menu-grid">
          <div v-for="(item, i) in restaurantItems" :key="i" class="menu-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B7C4F" stroke-width="2" stroke-linecap="round" style="flex-shrink: 0; margin-top: 1px">
              <path d="M12 22c-4-4-8-7.5-8-12C4 5 8 2 12 2s8 3 8 8c0 4.5-4 8-8 12z" />
              <path d="M12 22V8" />
              <path d="M8 12c2-1 4-1 4 0" />
            </svg>
            <span class="menu-item-label">{{ item }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ROOMS -->
    <!--
    <section id="rooms" class="rooms-section">
      <div class="section-inner">
        <span class="eyebrow eyebrow--gold">{{ t.rooms.eyebrow }}</span>
        <h2 class="section-title" :style="{ fontFamily: displayFont }">{{ t.rooms.title }}</h2>
        <p class="body-text" style="max-width: 600px; margin: 0 0 36px">{{ t.rooms.p }}</p>
        <div class="rooms-grid">
          <div v-for="(room, i) in rooms" :key="i" class="room-card">
            <div
              class="room-header"
              :style="{ background: `linear-gradient(135deg, ${room.colorStart} 0%, ${room.colorEnd} 100%)` }"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" style="opacity: 0.9">
                <path d="M2 12h20v5H2z" />
                <path d="M2 17v3M22 17v3" />
                <path d="M2 12V7a2 2 0 012-2h16a2 2 0 012 2v5" />
                <circle cx="7" cy="9" r="2" />
              </svg>
              <div class="room-price-badge">
                {{ t.rooms.from }} {{ room.price }}{{ t.rooms.perNight }}
              </div>
            </div>
            <div style="padding: 20px">
              <h3 class="room-name">{{ room.name }}</h3>
              <p class="room-desc">{{ room.desc }}</p>
              <div style="display: flex; gap: 8px; flex-wrap: wrap">
                <span
                  v-for="platform in ['Booking.com', 'Trip.com', 'Agoda']"
                  :key="platform"
                  class="platform-badge"
                >{{ t.rooms.bookOn }} {{ platform }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
-->
    <!-- LOCATION -->
    <section id="location" class="location-section">
      <div class="section-inner">
        <span class="eyebrow eyebrow--gold">{{ t.location.eyebrow }}</span>
        <h2 class="location-title" :style="{ fontFamily: displayFont }">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="flex-shrink: 0">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {{ t.location.title }}
        </h2>
        <p class="body-text" style="margin: 0 0 24px">{{ t.location.p }}</p>
        <div class="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1900!2d102.6094691!3d17.9664672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3124696c8868bb3d%3A0xa016f8643f069c07!2sWood%20Wood%20Restaurant%20and%20Hostel!5e0!3m2!1sen!2s!4v1700000000000"
            width="100%" height="100%" style="border: 0" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
            title="Wood Wood Location"
          />
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 24px; font-size: 14px; color: #5A4A3A">
          <span>🕐 {{ t.location.checkin }}</span>
          <span>🕐 {{ t.location.checkout }}</span>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-logo" :style="{ fontFamily: displayFont }">
          <span style="color: #D4A574">W</span>ood <span style="color: #D4A574">W</span>ood
        </div>
        <p class="footer-tagline">{{ t.footer.tagline }}</p>
        <p class="footer-address">{{ t.footer.address }}</p>
        <div class="footer-links">
          <span
            v-for="p in ['Booking.com', 'Trip.com', 'Agoda', 'Google Maps']"
            :key="p"
            class="footer-link"
          >{{ p }}</span>
        </div>
        <div class="footer-rights">{{ t.footer.rights }}</div>
      </div>
    </footer>

  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Lao:wght@300;400;500;600&family=Noto+Sans+SC:wght@300;400;500;600&display=swap');
</style>

<style scoped>
/* Hero */
.hero-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 100px 24px 80px;
  position: relative;
  overflow: hidden;
}
.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.hero-bg-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 1.4s ease;
}
.hero-bg-img.active {
  opacity: 1;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(15, 8, 2, 0.48);
}
.hero-bar {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: linear-gradient(90deg, #8B6914, #D4A574, #8B6914, #C4935A, #8B6914);
  z-index: 1;
}
.hero-logo-circle {
  position: relative;
  z-index: 1;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  margin-bottom: 32px;
  background: linear-gradient(135deg, #D4A574 0%, #A67C3D 50%, #8B6914 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4), inset 0 2px 8px rgba(255,255,255,0.2);
}
.hero-logo-text {
  font-size: 42px;
  color: #FAF6F0;
  line-height: 1;
  font-weight: 700;
}
.hero-title {
  position: relative;
  z-index: 1;
  font-size: clamp(36px, 7vw, 68px);
  font-weight: 400;
  color: #FAF6F0;
  line-height: 1.1;
  margin: 0 0 16px;
  letter-spacing: -0.02em;
  max-width: 700px;
  text-shadow: 0 2px 16px rgba(0,0,0,0.4);
}
.hero-sub {
  position: relative;
  z-index: 1;
  font-size: clamp(15px, 2.5vw, 18px);
  color: rgba(250, 246, 240, 0.85);
  max-width: 500px;
  line-height: 1.6;
  margin: 0 0 36px;
  font-weight: 300;
}
.cta-btn {
  position: relative;
  z-index: 1;
  background: #D4A574;
  color: #2C1810;
  border: none;
  border-radius: 8px;
  padding: 14px 32px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}
.cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(0,0,0,0.4);
}
.hero-dots {
  position: relative;
  z-index: 1;
  display: flex;
  gap: 8px;
  margin-top: 40px;
}
.hero-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.35);
  cursor: pointer;
  padding: 0;
  transition: background 0.3s, transform 0.3s;
}
.hero-dot.active {
  background: #fff;
  transform: scale(1.4);
}
.scroll-hint {
  position: absolute;
  bottom: 32px;
  z-index: 1;
  opacity: 0.5;
  font-size: 12px;
  letter-spacing: 0.15em;
  color: #FAF6F0;
}

/* Sections */
.about-section      { padding: 80px 24px; background: #F0E8DB; }
.restaurant-section { padding: 80px 24px; background: #FAF6F0; }
.rooms-section      { padding: 80px 24px; background: #F0E8DB; }
.location-section   { padding: 80px 24px; background: #FAF6F0; }
.section-inner { max-width: 900px; margin: 0 auto; }

.eyebrow {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}
.eyebrow--gold  { color: #8B6914; }
.eyebrow--green { color: #5B7C4F; }

.section-title {
  font-size: clamp(28px, 5vw, 44px);
  color: #2C1810;
  margin: 12px 0 20px;
  line-height: 1.15;
}
.body-text {
  font-size: 16px;
  line-height: 1.75;
  color: #5A4A3A;
  max-width: 650px;
  font-weight: 300;
  margin: 0;
}

/* Stats */
.stats-row { display: flex; flex-wrap: wrap; gap: 40px; }
.stat-item  { min-width: 120px; }
.stat-value { font-size: 36px; color: #8B6914; line-height: 1; }
.stat-label { font-size: 12px; color: #7A6A5A; margin-top: 6px; font-weight: 500; letter-spacing: 0.02em; }

/* Restaurant */
.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}
.menu-item {
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  border: 1px solid rgba(139,105,20,0.1);
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.menu-item-label {
  font-size: 14px;
  font-weight: 500;
  color: #3D2B1F;
  line-height: 1.4;
}

/* Rooms */
.rooms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
.room-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(139,105,20,0.1);
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);
  transition: transform 0.2s, box-shadow 0.2s;
}
.room-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}
.room-header {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.room-price-badge {
  position: absolute;
  bottom: 10px;
  right: 14px;
  background: rgba(250,246,240,0.9);
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 13px;
  font-weight: 600;
  color: #3D2B1F;
}
.room-name { font-size: 17px; font-weight: 600; color: #2C1810; margin: 0 0 6px; }
.room-desc { font-size: 13px; color: #7A6A5A; margin: 0 0 16px; line-height: 1.5; }
.platform-badge {
  font-size: 11px;
  font-weight: 500;
  color: #8B6914;
  background: #F5E6C8;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
}

/* Location */
.location-title {
  font-size: clamp(24px, 4vw, 36px);
  color: #2C1810;
  margin: 12px 0 16px;
  line-height: 1.2;
  display: flex;
  align-items: center;
  gap: 10px;
}
.map-container {
  width: 100%;
  height: 280px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(139,105,20,0.15);
  margin-bottom: 24px;
}

/* Footer */
.footer {
  background: #2C1810;
  color: #D4A574;
  padding: 48px 24px 32px;
}
.footer-inner {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}
.footer-logo    { font-size: 26px; margin-bottom: 8px; color: #F5E6C8; }
.footer-tagline { font-size: 14px; color: #A08060; margin: 0 0 6px; }
.footer-address { font-size: 13px; color: #7A6A5A; margin: 0 0 24px; }
.footer-links {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}
.footer-link {
  font-size: 12px;
  color: #A08060;
  border: 1px solid rgba(160,128,96,0.3);
  border-radius: 6px;
  padding: 6px 14px;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
}
.footer-link:hover { color: #F5E6C8; border-color: #D4A574; }
.footer-rights { font-size: 11px; color: #5A4A3A; }
</style>
