<template>
  <div class="page-shell">
    <div class="page-header">
      <h1>{{ t.title }}</h1>
      <p>{{ t.sub }}</p>
    </div>

    <div class="gallery-grid">
      <div v-for="src in images" :key="src" class="gallery-item" @click="open(src)">
        <img :src="src" loading="lazy" />
      </div>
    </div>

    <!-- Lightbox -->
    <div v-if="lightbox" class="lightbox" @click.self="lightbox = null">
      <button class="lightbox-close" @click="lightbox = null">✕</button>
      <img :src="lightbox" class="lightbox-img" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useLang } from '../composables/useLang.js'

const { lang } = useLang()

const STRINGS = {
  en: { title: 'Gallery', sub: 'Photos from Wood Wood — the restaurant, hostel, rooms, and everyday moments.' },
  zh: { title: '图库', sub: 'Wood Wood 的照片——餐厅、青旅、客房和日常时光。' },
  lo: { title: 'ຮູບພາບ', sub: 'ຮູບຈາກ Wood Wood — ຮ້ານອາຫານ, ໂຮສເທວ, ຫ້ອງພັກ ແລະ ຊີວິດປະຈຳວັນ.' },
}
const t = computed(() => STRINGS[lang.value] ?? STRINGS.en)

const allImages = [
  '/gmaps-photos/front1.jpg',
  '/gmaps-photos/front2.jpg',
  '/gmaps-photos/hero3.jpg',
  '/gmaps-photos/hall1.jpg',
  '/gmaps-photos/hall2.jpg',
  '/gmaps-photos/hall3.jpg',
  '/gmaps-photos/inside1.jpg',
  '/gmaps-photos/bed1.jpg',
  '/gmaps-photos/breakfast.jpg',
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
  '/menu/menu_cover.jpg',
  '/menu/coffee.jpg',
  '/menu/drinks.jpg',
  '/menu/drinks_recommandation.jpg',
  '/menu/light_meal.jpg',
  '/menu/noodles.jpg',
  '/menu/pho_soup.jpg',
  '/menu/rice_plates.jpg',
  '/menu/sea_specialities.jpg',
  '/menu/food/food1.jpg',
  '/menu/food/food2.jpg',
]

const images = ref([])
const lightbox = ref(null)

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function open(src) {
  lightbox.value = src
}

onMounted(() => {
  images.value = shuffle(allImages)
})
</script>

<style scoped>
.page-shell {
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 24px 60px;
  color: #2c1810;
}
.page-header {
  margin-bottom: 36px;
}
.page-header h1 {
  margin: 0 0 10px;
  font-size: clamp(32px, 4vw, 48px);
}
.page-header p {
  margin: 0;
  color: #5a4a3a;
  font-size: 16px;
}

.gallery-grid {
  columns: 3;
  column-gap: 14px;
}
.gallery-item {
  break-inside: avoid;
  margin-bottom: 14px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  background: #e8ddd0;
}
.gallery-item img {
  width: 100%;
  display: block;
  transition: transform 0.3s ease;
}
.gallery-item:hover img {
  transform: scale(1.03);
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.88);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
.lightbox-img {
  max-width: 100%;
  max-height: 90vh;
  border-radius: 10px;
  object-fit: contain;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5);
}
.lightbox-close {
  position: absolute;
  top: 20px;
  right: 24px;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: #fff;
  font-size: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .gallery-grid { columns: 2; }
}
@media (max-width: 480px) {
  .gallery-grid { columns: 1; }
}
</style>
