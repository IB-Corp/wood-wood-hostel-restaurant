<template>
  <div class="page-shell">
    <div class="page-hero">
      <div>
        <h1>{{ t.title }}</h1>
        <p>{{ t.sub }}</p>
      </div>
      <img class="hero-image" src="/gmaps-photos/front2.jpg" alt="Wood Wood exterior at night" />
    </div>

    <div class="room-grid">
      <div v-for="room in rooms" :key="room.name" class="room-card">
        <div class="room-card-head">{{ room.name }}</div>
        <div class="room-card-copy">{{ room.desc }}</div>
        <div class="room-card-price">{{ room.price }}</div>
      </div>
    </div>

    <!-- Restaurant callout -->
    <div class="restaurant-banner">
      <div class="rb-text">
        <div class="rb-eyebrow">{{ t.rbEyebrow }}</div>
        <h2 class="rb-title">{{ t.rbTitle }}</h2>
        <p class="rb-body">{{ t.rbBody }}</p>
        <div class="rb-free-badge">🎁 {{ t.rbFree }}</div>
        <div class="rb-chips">
          <span v-for="chip in chips" :key="chip" class="rb-chip">{{ chip }}</span>
        </div>
      </div>
      <img class="rb-image" src="/gmaps-photos/breakfast.jpg" :alt="t.rbEyebrow" />
    </div>

    <div class="gallery-grid">
      <div v-for="item in galleryImages" :key="item.src" class="gallery-card">
        <img :src="item.src" :alt="item.title" />
        <div class="gallery-label">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useLang } from '../composables/useLang.js'

const { lang } = useLang()

const STRINGS = {
  en: {
    title: 'Hostel Rooms & Gallery',
    sub: 'See the guest rooms, shared lounge, and the wood-filled hostel atmosphere.',
    r1: 'Mixed Dormitory',   r1d: '10-bed room · 29m² · A/C · Shared bathroom · Cozy wood interior',   r1p: 'from $6 / night',
    r2: 'Female Dormitory',  r2d: '10-bed room · 38m² · A/C · Women only · Bright wooden décor',       r2p: 'from $6 / night',
    r3: 'Private Room',      r3d: 'Double bed · Garden view · Patio · Quiet and comfortable',           r3p: 'from $18 / night',
    g1: 'Front entrance', g2: 'Night exterior', g3: 'Lobby seating', g4: 'Upper lounge',
    g5: 'Common dining area', g6: 'Indoor dining', g7: 'Private bunk bed', g8: 'Breakfast setup',
    rbEyebrow: 'On-site Restaurant',
    rbTitle: 'Good food, right downstairs.',
    rbBody: 'Our ground-floor restaurant serves Asian and Western breakfast, hearty lunch plates, specialty coffee, and cold drinks. Hostel guests enjoy 10% off every meal. Come for the food, stay for the vibe.',
    rbFree: 'Free breakfast with coffee & tea included for all hostel guests',
    rbChip1: '🍳 Asian & Western Breakfast', rbChip2: '☕ Specialty Coffee', rbChip3: '🍜 Lunch Plates', rbChip4: '10% off for guests',
  },
  zh: {
    title: '青旅客房 & 图库',
    sub: '查看客房、公共休息区以及充满木质氛围的青旅环境。',
    r1: '混合宿舍',   r1d: '10人间 · 29m² · 空调 · 共用浴室 · 温馨木质内饰',   r1p: '起价 $6 / 晚',
    r2: '女生宿舍',   r2d: '10人间 · 38m² · 空调 · 仅限女性 · 明亮木质装饰',   r2p: '起价 $6 / 晚',
    r3: '私人房间',   r3d: '双人床 · 花园景观 · 露台 · 安静舒适',              r3p: '起价 $18 / 晚',
    g1: '正门入口', g2: '夜间外观', g3: '大厅座位', g4: '上层休息区',
    g5: '公共餐饮区', g6: '室内用餐', g7: '私人双层床', g8: '早餐布置',
    rbEyebrow: '附设餐厅',
    rbTitle: '美食，就在楼下。',
    rbBody: '一楼餐厅供应亚洲和西式早餐、丰盛的午餐、特色咖啡和冷饮。住客用餐享九折优惠。为美食而来，因氛围而留。',
    rbFree: '所有住客免费享用早餐、咖啡及茶',
    rbChip1: '🍳 亚洲及西式早餐', rbChip2: '☕ 特色咖啡', rbChip3: '🍜 午餐', rbChip4: '住客九折优惠',
  },
  lo: {
    title: 'ຫ້ອງພັກ & ຮູບພາບ',
    sub: 'ເບິ່ງຫ້ອງພັກ, ຫ້ອງນັ່ງທ່ຽວ ແລະ ບັນຍາກາດໂຮສເທວທີ່ເຕັມໄປດ້ວຍໄມ້.',
    r1: 'ຫ້ອງນອນລວມ',   r1d: '10 ຕຽງ · 29m² · ແອ · ຫ້ອງນ້ຳຮ່ວມ · ພາຍໃນໄມ້ສ້ວຍງາມ',   r1p: 'ເລີ່ມ $6 / ຄືນ',
    r2: 'ຫ້ອງນອນຍິງ',   r2d: '10 ຕຽງ · 38m² · ແອ · ສະເພາະແມ່ຍິງ · ຕົກແຕ່ງໄມ້ສະຫວ່າງ', r2p: 'ເລີ່ມ $6 / ຄືນ',
    r3: 'ຫ້ອງສ່ວນຕົວ', r3d: 'ຕຽງຄູ່ · ວິວສວນ · ລະບຽງ · ງຽບສະຫງົບ',                   r3p: 'ເລີ່ມ $18 / ຄືນ',
    g1: 'ທາງເຂົ້າຫຼັກ', g2: 'ພາຍນອກຕອນກາງຄືນ', g3: 'ທີ່ນັ່ງຫ້ອງຮັບແຂກ', g4: 'ຫ້ອງນັ່ງຊັ້ນເທິງ',
    g5: 'ເຂດກິນເຂົ້າຮ່ວມ', g6: 'ກິນເຂົ້າໃນຮ້ານ', g7: 'ຕຽງ 2 ຊັ້ນສ່ວນຕົວ', g8: 'ການຈັດວາງອາຫານເຊົ້າ',
    rbEyebrow: 'ຮ້ານອາຫານໃນສະຖານທີ່',
    rbTitle: 'ອາຫານແຊບ, ຢູ່ຊັ້ນລຸ່ມ.',
    rbBody: 'ຮ້ານອາຫານຊັ້ນລຸ່ມບໍລິການອາຫານເຊົ້າແບບອາຊີ ແລະ ຕາເວັນຕົກ, ອາຫານທ່ຽງ, ກາເຟພິເສດ ແລະ ເຄື່ອງດື່ມເຢັນ. ແຂກທີ່ພັກໄດ້ສ່ວນຫຼຸດ 10% ທຸກຄາບ. ມາກິນ, ຢູ່ຕໍ່ເພາະບັນຍາກາດ.',
    rbFree: 'ອາຫານເຊົ້າ, ກາເຟ ແລະ ຊາຟຣີ ສຳລັບແຂກທີ່ພັກທຸກທ່ານ',
    rbChip1: '🍳 ອາຫານເຊົ້າ', rbChip2: '☕ ກາເຟພິເສດ', rbChip3: '🍜 ອາຫານທ່ຽງ', rbChip4: 'ສ່ວນຫຼຸດ 10% ສຳລັບແຂກ',
  },
}

const t = computed(() => STRINGS[lang.value] ?? STRINGS.en)

const rooms = computed(() => [
  { name: t.value.r1, desc: t.value.r1d, price: t.value.r1p },
  { name: t.value.r2, desc: t.value.r2d, price: t.value.r2p },
  { name: t.value.r3, desc: t.value.r3d, price: t.value.r3p },
])

const galleryImages = computed(() => [
  { src: '/gmaps-photos/front1.jpg',   title: t.value.g1 },
  { src: '/gmaps-photos/front2.jpg',   title: t.value.g2 },
  { src: '/gmaps-photos/hall1.jpg',    title: t.value.g3 },
  { src: '/gmaps-photos/hall2.jpg',    title: t.value.g4 },
  { src: '/gmaps-photos/hall3.jpg',    title: t.value.g5 },
  { src: '/gmaps-photos/inside1.jpg',  title: t.value.g6 },
  { src: '/gmaps-photos/bed1.jpg',     title: t.value.g7 },
  { src: '/gmaps-photos/breakfast.jpg',title: t.value.g8 },
])

const chips = computed(() => [
  t.value.rbChip1, t.value.rbChip2, t.value.rbChip3, t.value.rbChip4,
])
</script>

<style scoped>
.page-shell {
  max-width: 1100px;
  margin: 0 auto;
  padding: 120px 24px 40px;
  color: #2c1810;
}
.page-hero {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;
}
.page-hero h1 {
  margin: 0 0 12px;
  font-size: clamp(32px, 4vw, 48px);
}
.page-hero p {
  margin: 0;
  max-width: 520px;
  color: #5a4a3a;
}
.hero-image {
  width: 100%;
  max-width: 420px;
  border-radius: 18px;
  object-fit: cover;
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.14);
}
/* Restaurant banner */
.restaurant-banner {
  display: flex;
  align-items: center;
  gap: 36px;
  background: #2c1810;
  border-radius: 20px;
  padding: 36px 40px;
  margin-bottom: 40px;
  overflow: hidden;
}
.rb-text { flex: 1; }
.rb-eyebrow {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #d4a574;
  margin-bottom: 10px;
}
.rb-title {
  font-size: clamp(22px, 3vw, 30px);
  font-weight: 700;
  color: #f5e6c8;
  margin: 0 0 14px;
  line-height: 1.2;
}
.rb-body {
  font-size: 15px;
  color: rgba(245, 230, 200, 0.75);
  line-height: 1.7;
  margin: 0 0 20px;
  max-width: 520px;
}
.rb-free-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #8b6914;
  color: #fff8e8;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 14px;
}
.rb-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.rb-chip {
  background: rgba(212, 165, 116, 0.15);
  border: 1px solid rgba(212, 165, 116, 0.35);
  color: #d4a574;
  border-radius: 20px;
  padding: 5px 14px;
  font-size: 13px;
  font-weight: 500;
}
.rb-image {
  flex-shrink: 0;
  width: 220px;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  opacity: 0.85;
}

@media (max-width: 700px) {
  .restaurant-banner { flex-direction: column; padding: 28px 24px; gap: 20px; }
  .rb-image { width: 100%; height: 180px; }
}

.room-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 18px;
  margin-bottom: 32px;
}
.room-card {
  border-radius: 18px;
  background: #fff;
  padding: 22px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
}
.room-card-head {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #3d2b1f;
}
.room-card-copy {
  color: #5a4a3a;
  line-height: 1.6;
  margin-bottom: 16px;
}
.room-card-price {
  font-weight: 700;
  color: #8b6914;
}
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 18px;
}
.gallery-card {
  border-radius: 18px;
  overflow: hidden;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
}
.gallery-card img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}
.gallery-label {
  padding: 12px 14px;
  font-weight: 600;
  color: #3d2b1f;
}
</style>
