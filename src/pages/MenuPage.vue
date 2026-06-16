<template>
  <div class="page-shell">

    <!-- ── FLIPBOOK ─────────────────────────────── -->
    <section class="flipbook-section">
      <div class="section-head">
        <h1>{{ t.menuTitle }}</h1>
        <p>{{ t.menuSub }}</p>
      </div>

      <div class="book-stage">
        <button class="flip-btn" @click="flip(-1)" :disabled="currentPage === 0" aria-label="Previous page">‹</button>

        <div
          class="book"
          @touchstart="onTouchStart"
          @touchend="onTouchEnd"
        >
          <div class="book-spine" />
          <Transition :name="flipDir === 'fwd' ? 'flip-fwd' : 'flip-bwd'" mode="out-in">
            <img
              :key="currentPage"
              :src="menuPages[currentPage].src"
              :alt="menuPages[currentPage].label"
              class="book-page"
            />
          </Transition>
          <div class="book-page-label">{{ menuPages[currentPage].label }}</div>
          <div class="book-counter">{{ currentPage + 1 }} / {{ menuPages.length }}</div>
        </div>

        <button class="flip-btn" @click="flip(1)" :disabled="currentPage === menuPages.length - 1" aria-label="Next page">›</button>
      </div>

      <!-- Thumbnail strip -->
      <div class="thumb-strip">
        <img
          v-for="(page, i) in menuPages"
          :key="page.src"
          :src="page.src"
          :alt="page.label"
          class="thumb"
          :class="{ active: i === currentPage }"
          @click="jumpTo(i)"
        />
      </div>
    </section>

    <!-- ── FOOD ITEMS ─────────────────────────────── -->
    <section class="food-section">
      <div class="section-head">
        <h2>{{ t.foodTitle }}</h2>
        <p>{{ t.foodSub }}</p>
      </div>

      <div class="food-grid">
        <div v-for="item in foodItems" :key="item.src" class="food-card">
          <div class="food-img-wrap">
            <img :src="item.src" :alt="item.name" loading="lazy" />
          </div>
          <div class="food-body">
            <div class="food-top-row">
              <span class="food-name">{{ item.name }}</span>
              <span class="food-price">{{ item.price }}</span>
            </div>
            <p class="food-ingredients">{{ item.ingredients }}</p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useLang } from '../composables/useLang.js'

const { lang } = useLang()

const STRINGS = {
  en: { menuTitle: 'Wood Wood Menu', menuSub: 'Browse our full menu — swipe or use the arrows.', foodTitle: 'From the Kitchen', foodSub: 'Fresh ingredients, authentic Lao and Asian flavours.' },
  zh: { menuTitle: 'Wood Wood 菜单', menuSub: '浏览我们的完整菜单——滑动或使用箭头翻页。', foodTitle: '厨房出品', foodSub: '新鲜食材，正宗老挝与亚洲风味。' },
  lo: { menuTitle: 'ເມນູ Wood Wood', menuSub: 'ທ່ອງເມນູຂອງພວກເຮົາ — ເລື່ອນ ຫຼື ໃຊ້ລູກສອນ.', foodTitle: 'ຈາກເຮືອນຄົວ', foodSub: 'ສ່ວນປະກອບສົດ, ລົດຊາດລາວ ແລະ ອາຊີແທ້.' },
}
const t = computed(() => STRINGS[lang.value] ?? STRINGS.en)

// ── Menu pages (the scanned menu images) ──────────────────────
const menuPages = [
  { src: '/menu/menu_cover.jpg',            label: 'Cover' },
  { src: '/menu/coffee.jpg',                label: 'Classic Coffee' },
  { src: '/menu/drinks.jpg',                label: 'Beer & Drinks' },
  { src: '/menu/drinks_recommandation.jpg', label: 'Drink Recommendations' },
  { src: '/menu/light_meal.jpg',            label: 'Light Meals' },
  { src: '/menu/noodles.jpg',               label: 'Noodles' },
  { src: '/menu/pho_soup.jpg',              label: 'Pho Soup' },
  { src: '/menu/rice_plates.jpg',           label: 'Rice Plates' },
  { src: '/menu/sea_specialities.jpg',      label: 'Southeast Asian Specialties' },
]

const currentPage = ref(0)
const flipDir = ref('fwd')

function flip(dir) {
  const next = currentPage.value + dir
  if (next < 0 || next >= menuPages.length) return
  flipDir.value = dir > 0 ? 'fwd' : 'bwd'
  currentPage.value = next
}

function jumpTo(i) {
  flipDir.value = i > currentPage.value ? 'fwd' : 'bwd'
  currentPage.value = i
}

let touchStartX = 0
function onTouchStart(e) { touchStartX = e.touches[0].clientX }
function onTouchEnd(e) {
  const dx = e.changedTouches[0].clientX - touchStartX
  if (Math.abs(dx) > 48) flip(dx < 0 ? 1 : -1)
}

// ── Food items ────────────────────────────────────────────────
// To add a new dish: add a new object to this array.
// Drop the photo in /public/menu/food/ and point src at it.
const foodItems = [
  {
    src: '/menu/food/food1.jpg',
    name: 'Pho Bo',
    price: '35,000 ₭',
    ingredients: 'Beef broth, rice noodles, tender beef slices, spring onions, fresh herbs, lime',
  },
  {
    src: '/menu/food/food2.jpg',
    name: 'Khao Piak Sen',
    price: '30,000 ₭',
    ingredients: 'Thick rice noodles, chicken broth, poached chicken, galangal, lemongrass, coriander',
  },
]
</script>

<style scoped>
.page-shell {
  max-width: 1100px;
  margin: 0 auto;
  padding: 110px 24px 60px;
  color: #2c1810;
}
.section-head {
  text-align: center;
  margin-bottom: 36px;
}
.section-head h1,
.section-head h2 {
  margin: 0 0 10px;
  font-size: clamp(28px, 4vw, 42px);
}
.section-head p {
  margin: 0;
  color: #5a4a3a;
}

/* ── Flipbook ──────────────────────────────────── */
.flipbook-section {
  margin-bottom: 72px;
}

.book-stage {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 24px;
}

.book {
  position: relative;
  width: min(420px, 88vw);
  background: #fff;
  border-radius: 4px 16px 16px 4px;
  box-shadow:
    -6px 0 12px rgba(0,0,0,0.08),
    0 20px 60px rgba(0,0,0,0.18),
    4px 4px 0 #e8ddd0;
  overflow: hidden;
  touch-action: pan-y;
}

.book-spine {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 8px;
  background: linear-gradient(to right, #b89060, #d4a574);
  z-index: 2;
  border-radius: 4px 0 0 4px;
}

.book-page {
  display: block;
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  padding-left: 8px;
}

.book-page-label {
  padding: 10px 14px 6px 18px;
  font-size: 13px;
  font-weight: 600;
  color: #8b6914;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.book-counter {
  padding: 0 14px 12px 18px;
  font-size: 12px;
  color: #a09080;
}

/* Flip transitions — forward (left) */
.flip-fwd-leave-active { transition: all 0.2s ease; }
.flip-fwd-leave-to     { transform: translateX(-32px) scale(0.97); opacity: 0; }
.flip-fwd-enter-active { transition: all 0.22s ease; }
.flip-fwd-enter-from   { transform: translateX(32px) scale(0.97); opacity: 0; }

/* Flip transitions — backward (right) */
.flip-bwd-leave-active { transition: all 0.2s ease; }
.flip-bwd-leave-to     { transform: translateX(32px) scale(0.97); opacity: 0; }
.flip-bwd-enter-active { transition: all 0.22s ease; }
.flip-bwd-enter-from   { transform: translateX(-32px) scale(0.97); opacity: 0; }

/* Arrows */
.flip-btn {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1.5px solid rgba(0,0,0,0.12);
  background: #fff;
  color: #3d2b1f;
  font-size: 1.8rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: opacity 0.2s, transform 0.15s;
}
.flip-btn:disabled { opacity: 0.2; cursor: default; }
.flip-btn:not(:disabled):hover { transform: scale(1.08); }

/* Thumbnail strip */
.thumb-strip {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 560px;
  margin: 0 auto;
}
.thumb {
  width: 54px;
  height: 70px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0.45;
  border: 2px solid transparent;
  transition: opacity 0.2s, border-color 0.2s;
}
.thumb.active,
.thumb:hover {
  opacity: 1;
  border-color: #8b6914;
}

/* ── Food cards ──────────────────────────────────── */
.food-section {
  border-top: 1px solid rgba(180,150,110,0.25);
  padding-top: 60px;
}

.food-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.food-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(0,0,0,0.07);
  box-shadow: 0 8px 28px rgba(0,0,0,0.08);
  transition: transform 0.2s, box-shadow 0.2s;
}
.food-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 36px rgba(0,0,0,0.13);
}

.food-img-wrap {
  aspect-ratio: 4 / 3;
  overflow: hidden;
}
.food-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.35s ease;
}
.food-card:hover .food-img-wrap img {
  transform: scale(1.05);
}

.food-body {
  padding: 16px 18px 20px;
}
.food-top-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 8px;
}
.food-name {
  font-size: 17px;
  font-weight: 700;
  color: #2c1810;
}
.food-price {
  font-size: 15px;
  font-weight: 700;
  color: #8b6914;
  white-space: nowrap;
}
.food-ingredients {
  margin: 0;
  font-size: 13px;
  color: #7a6a5a;
  line-height: 1.55;
}

@media (max-width: 540px) {
  .book-stage { gap: 10px; }
  .flip-btn { width: 38px; height: 38px; font-size: 1.4rem; }
  .thumb { width: 44px; height: 58px; }
}
</style>
