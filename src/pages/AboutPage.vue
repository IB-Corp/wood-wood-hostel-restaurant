<template>
  <div class="page-shell">
    <div class="page-header">
      <h1>{{ t.title }}</h1>
      <p>{{ t.sub }}</p>
    </div>

    <div class="about-body">
      <div class="about-text">
        <span class="eyebrow">{{ t.storyEyebrow }}</span>
        <h2>{{ t.storyTitle }}</h2>
        <p>{{ t.p1 }}</p>
        <p>{{ t.p2 }}</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card" v-for="s in stats" :key="s.label">
          <div class="stat-value">{{ s.value }}</div>
          <div class="stat-label">{{ s.label }}</div>
        </div>
      </div>

      <div class="strengths">
        <span class="eyebrow">{{ t.strengthsEyebrow }}</span>
        <h2>{{ t.strengthsTitle }}</h2>
        <div class="strength-grid">
          <div class="strength-item" v-for="item in strengths" :key="item.title">
            <div class="strength-icon">{{ item.icon }}</div>
            <div class="strength-title">{{ item.title }}</div>
            <div class="strength-desc">{{ item.desc }}</div>
          </div>
        </div>
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
    title: 'About Wood Wood',
    sub: 'A place built with wood, run with heart.',
    storyEyebrow: 'Our Story',
    storyTitle: 'Built with wood. Run with heart.',
    p1: "Wood Wood is more than a hostel — it's a feeling. From the moment you step through the door, the warmth of natural wood surrounds you. Every beam, every floor, every corner was designed to make you slow down, breathe, and feel at home.",
    p2: "Located on Rue Pangkham in central Vientiane, just steps from the Mekong night market, temples, and cafés. Whether you're a solo backpacker, a couple exploring Laos, or a digital nomad looking for a quiet corner — this is your place.",
    strengthsEyebrow: 'Why Wood Wood',
    strengthsTitle: 'What makes us different.',
    stat1: '104+', stat1Label: 'Guest reviews',
    stat2: '9.8',  stat2Label: 'Trip.com rating',
    stat3: '3 min', stat3Label: 'To National Museum',
    s1title: 'Central Location', s1desc: 'Walking distance to temples, markets, and the Mekong riverside.',
    s2title: 'Wood Architecture', s2desc: 'Every room built from natural wood — warm, calm, and unique.',
    s3title: 'Restaurant on Site', s3desc: 'Full kitchen open daily. Hostel guests get 10% off every meal.',
    s4title: 'Friendly Community', s4desc: 'A space designed to meet fellow travellers and share stories.',
  },
  zh: {
    title: '关于 Wood Wood',
    sub: '用木头建造，用心经营的地方。',
    storyEyebrow: '我们的故事',
    storyTitle: '以木建造，用心经营。',
    p1: 'Wood Wood 不仅仅是一家青旅——它是一种感觉。踏入门的那一刻，天然木材的温暖便围绕着你。每一根横梁、每一块地板、每一个角落，都旨在让你放慢脚步、深呼吸、感受家的温暖。',
    p2: '位于万象市中心的 Rue Pangkham，步行即可到达湄公河夜市、寺庙和咖啡馆。无论你是独行背包客、探索老挝的情侣，还是寻找安静角落的数字游民——这里就是你的地方。',
    strengthsEyebrow: '为何选择 Wood Wood',
    strengthsTitle: '我们与众不同之处。',
    stat1: '104+', stat1Label: '客人评价',
    stat2: '9.8',  stat2Label: 'Trip.com 评分',
    stat3: '3 分钟', stat3Label: '到国家博物馆',
    s1title: '核心地段', s1desc: '步行可达寺庙、市场和湄公河河滨。',
    s2title: '木质建筑', s2desc: '每个房间均采用天然木材建造——温暖、宁静、独特。',
    s3title: '附设餐厅', s3desc: '餐厅每天开放，住客享受九折优惠。',
    s4title: '友好社群', s4desc: '专为旅行者交流而设计的空间，结交新朋友，分享故事。',
  },
  lo: {
    title: 'ກ່ຽວກັບ Wood Wood',
    sub: 'ສະຖານທີ່ທີ່ສ້າງດ້ວຍໄມ້, ດຳເນີນດ້ວຍໃຈ.',
    storyEyebrow: 'ເລື່ອງຂອງພວກເຮົາ',
    storyTitle: 'ສ້າງດ້ວຍໄມ້. ດຳເນີນດ້ວຍໃຈ.',
    p1: 'Wood Wood ບໍ່ແມ່ນພຽງແຕ່ໂຮສເທວ — ມັນແມ່ນຄວາມຮູ້ສຶກ. ຕັ້ງແຕ່ກ້າວເຂົ້າປະຕູ, ຄວາມອົບອຸ່ນຂອງໄມ້ທຳມະຊາດຈະຫໍ້ອ້ອຮອບທ່ານ.',
    p2: 'ຕັ້ງຢູ່ຖະໜົນປາງຄຳ ໃຈກາງວຽງຈັນ, ຍ່າງໄປຕະຫຼາດກາງຄືນ, ວັດ ແລະ ຮ້ານກາເຟໄດ້.',
    strengthsEyebrow: 'ເປັນຫຍັງຕ້ອງ Wood Wood',
    strengthsTitle: 'ສິ່ງທີ່ເຮັດໃຫ້ພວກເຮົາແຕກຕ່າງ.',
    stat1: '104+', stat1Label: 'ການລີວິວ',
    stat2: '9.8',  stat2Label: 'ຄະແນນ Trip.com',
    stat3: '3 ນາທີ', stat3Label: 'ຫາພິພິທະພັນ',
    s1title: 'ທຳເລດີ', s1desc: 'ຍ່າງໄປວັດ, ຕະຫຼາດ ແລະ ແຄມຂອງໄດ້.',
    s2title: 'ສະຖາປັດຕະຍະກຳໄມ້', s2desc: 'ທຸກຫ້ອງສ້າງຈາກໄມ້ທຳມະຊາດ — ອົບອຸ່ນ, ສງົບ, ເປັນເອກະລັກ.',
    s3title: 'ຮ້ານອາຫານໃນສະຖານທີ່', s3desc: 'ເຮືອນຄົວເປີດທຸກວັນ. ແຂກທີ່ພັກໄດ້ສ່ວນຫຼຸດ 10%.',
    s4title: 'ຊຸມຊົນໃຈດີ', s4desc: 'ພື້ນທີ່ສຳລັບນັກທ່ອງທ່ຽວພົບປະ ແລະ ແບ່ງປັນປະສົບການ.',
  },
}

const t = computed(() => STRINGS[lang.value] ?? STRINGS.en)

const stats = computed(() => [
  { value: t.value.stat1, label: t.value.stat1Label },
  { value: t.value.stat2, label: t.value.stat2Label },
  { value: t.value.stat3, label: t.value.stat3Label },
])

const strengths = computed(() => [
  { icon: '📍', title: t.value.s1title, desc: t.value.s1desc },
  { icon: '🪵', title: t.value.s2title, desc: t.value.s2desc },
  { icon: '🍜', title: t.value.s3title, desc: t.value.s3desc },
  { icon: '🤝', title: t.value.s4title, desc: t.value.s4desc },
])
</script>

<style scoped>
.page-shell {
  max-width: 1000px;
  margin: 0 auto;
  padding: 110px 24px 60px;
  color: #2c1810;
}
.page-header {
  margin-bottom: 48px;
}
.page-header h1 {
  margin: 0 0 10px;
  font-size: clamp(32px, 4vw, 48px);
}
.page-header p {
  margin: 0;
  color: #5a4a3a;
  font-size: 17px;
}
.eyebrow {
  display: block;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #8b6914;
  margin-bottom: 10px;
}
.about-body { display: flex; flex-direction: column; gap: 56px; }
.about-text h2 {
  margin: 0 0 20px;
  font-size: clamp(24px, 3vw, 36px);
}
.about-text p {
  margin: 0 0 16px;
  color: #5a4a3a;
  line-height: 1.75;
  font-size: 16px;
  max-width: 680px;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.stat-card {
  background: #fff;
  border-radius: 14px;
  padding: 24px 20px;
  border: 1px solid rgba(180,150,110,0.2);
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
}
.stat-value {
  font-size: 38px;
  font-weight: 700;
  color: #8b6914;
  line-height: 1;
  margin-bottom: 8px;
}
.stat-label { font-size: 13px; color: #7a6a5a; font-weight: 500; }
.strengths h2 { margin: 0 0 24px; font-size: clamp(22px, 3vw, 32px); }
.strength-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 18px;
}
.strength-item {
  background: #fff;
  border-radius: 14px;
  padding: 22px 20px;
  border: 1px solid rgba(0,0,0,0.07);
  box-shadow: 0 4px 14px rgba(0,0,0,0.06);
}
.strength-icon { font-size: 28px; margin-bottom: 12px; }
.strength-title { font-size: 15px; font-weight: 700; margin-bottom: 6px; color: #2c1810; }
.strength-desc { font-size: 13px; color: #7a6a5a; line-height: 1.55; }

@media (max-width: 600px) {
  .stats-grid { grid-template-columns: repeat(3, 1fr); gap: 10px; }
  .stat-value { font-size: 28px; }
}
</style>
