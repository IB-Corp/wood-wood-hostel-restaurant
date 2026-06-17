<template>
  <div class="page-shell">

    <div class="page-header">
      <h1>{{ t.title }}</h1>
      <p>{{ t.sub }}</p>
    </div>

    <div class="contact-layout">

      <!-- Map -->
      <div class="map-card">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1900!2d102.6094691!3d17.9664672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3124696c8868bb3d%3A0xa016f8643f069c07!2sWood%20Wood%20Restaurant%20and%20Hostel!5e0!3m2!1sen!2s!4v1700000000000"
          width="100%" height="100%" style="border:0" loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          :title="t.mapTitle"
        />
      </div>

      <!-- Contact cards -->
      <div class="cards-col">

        <!-- Address -->
        <div class="contact-card">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <div class="card-body">
            <div class="card-label">{{ t.address }}</div>
            <div class="card-value">199 Rue Pangkham<br>Vientiane, Laos</div>
            <a
              href="https://maps.app.goo.gl/woodwood"
              target="_blank" rel="noopener"
              class="card-link"
            >{{ t.openMaps }}</a>
          </div>
        </div>

        <!-- WhatsApp -->
        <a
          href="https://wa.me/8562091186731"
          target="_blank" rel="noopener"
          class="contact-card contact-card--action wa"
        >
          <div class="card-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <div class="card-body">
            <div class="card-label">WhatsApp</div>
            <div class="card-value">+856 20 9118 6731</div>
            <div class="card-cta">{{ t.chatNow }}</div>
          </div>
        </a>

        <a
          href="https://wa.me/8562097722708"
          target="_blank" rel="noopener"
          class="contact-card contact-card--action wa"
        >
          <div class="card-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <div class="card-body">
            <div class="card-label">WhatsApp</div>
            <div class="card-value">+856 20 9772 2708</div>
            <div class="card-cta">{{ t.chatNow }}</div>
          </div>
        </a>

        

        <!-- Facebook -->
        <a
          href="https://www.facebook.com/share/18sm8rJ61t/"
          target="_blank" rel="noopener"
          class="contact-card contact-card--action fb"
        >
          <div class="card-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </div>
          <div class="card-body">
            <div class="card-label">Facebook</div>
            <div class="card-value">Wood Wood Vientiane</div>
            <div class="card-cta">{{ t.visitPage }}</div>
          </div>
        </a>

        <!-- WeChat -->
        <div class="contact-card wc" @click="copyWeChat">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 01-.023-.156.49.49 0 01.201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-7.063-6.122zm-3.494 3.38c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.969-.982zm4.856 0c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.969-.982z"/>
            </svg>
          </div>
          <div class="card-body">
            <div class="card-label">WeChat</div>
            <div class="card-value">woodwoodhostel</div>
            <div class="card-cta">{{ copied ? t.copied : t.addWeChat }}</div>
          </div>
        </div>

      </div>
    </div>

    <!-- Hours -->
    <div class="hours-band">
      <div class="hours-item">
        <span class="hours-label">{{ t.checkin }}</span>
        <span class="hours-time">14:00 – 22:00</span>
      </div>
      <div class="hours-divider" />
      <div class="hours-item">
        <span class="hours-label">{{ t.checkout }}</span>
        <span class="hours-time">08:00 – 12:00</span>
      </div>
      <div class="hours-divider" />
      <div class="hours-item">
        <span class="hours-label">{{ t.restaurant }}</span>
        <span class="hours-time">07:00 – 22:00</span>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useLang } from '../composables/useLang.js'

const { lang } = useLang()

const STRINGS = {
  en: {
    title: 'Find Us',
    sub: 'We are in the heart of Vientiane — come say hello.',
    mapTitle: 'Wood Wood location on Google Maps',
    address: 'Our Address',
    openMaps: 'Open in Google Maps →',
    chatNow: 'Chat with us →',
    visitPage: 'Visit our page →',
    addWeChat: 'Tap to copy ID',
    copied: 'Copied!',
    checkin: 'Check-in',
    checkout: 'Check-out',
    restaurant: 'Restaurant',
  },
  zh: {
    title: '找到我们',
    sub: '我们位于万象市中心——欢迎来打招呼。',
    mapTitle: '谷歌地图上的Wood Wood位置',
    address: '我们的地址',
    openMaps: '在谷歌地图中打开 →',
    chatNow: '与我们聊天 →',
    visitPage: '访问我们的主页 →',
    addWeChat: '点击复制ID',
    copied: '已复制！',
    checkin: '入住时间',
    checkout: '退房时间',
    restaurant: '餐厅',
  },
  lo: {
    title: 'ຊອກຫາພວກເຮົາ',
    sub: 'ພວກເຮົາຢູ່ໃຈກາງວຽງຈັນ — ມາທັກທາຍພວກເຮົາ.',
    mapTitle: 'ສະຖານທີ່ Wood Wood ໃນ Google Maps',
    address: 'ທີ່ຢູ່ຂອງພວກເຮົາ',
    openMaps: 'ເປີດໃນ Google Maps →',
    chatNow: 'ສົນທະນາກັບພວກເຮົາ →',
    visitPage: 'ເຂົ້າຊົມໜ້າຂອງພວກເຮົາ →',
    addWeChat: 'ກົດເພື່ອຄັດລອກ ID',
    copied: 'ຄັດລອກແລ້ວ!',
    checkin: 'ເຊັກອິນ',
    checkout: 'ເຊັກເອົາ',
    restaurant: 'ຮ້ານອາຫານ',
  },
}

const t = computed(() => STRINGS[lang.value] ?? STRINGS.en)

const copied = ref(false)
function copyWeChat() {
  navigator.clipboard.writeText('woodwoodhostel').then(() => {
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  })
}
</script>

<style scoped>
.page-shell {
  max-width: 1100px;
  margin: 0 auto;
  padding: 110px 24px 60px;
  color: #2c1810;
}

.page-header {
  margin-bottom: 40px;
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

/* Layout */
.contact-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 28px;
  margin-bottom: 40px;
}

.map-card {
  border-radius: 18px;
  overflow: hidden;
  min-height: 420px;
  border: 1px solid rgba(180,150,110,0.2);
  box-shadow: 0 12px 36px rgba(0,0,0,0.1);
}

.cards-col {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

/* Cards */
.contact-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.07);
  border-radius: 14px;
  padding: 18px 20px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  text-decoration: none;
  color: inherit;
  transition: transform 0.18s, box-shadow 0.18s;
}
.contact-card--action:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

.card-icon {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5e6c8;
  color: #8b6914;
}
.card-icon svg { width: 22px; height: 22px; }

.wa .card-icon { background: #e8f8ee; color: #25D366; }
.fb .card-icon { background: #e8f0fb; color: #1877F2; }
.wc .card-icon { background: #e8f8ee; color: #07C160; }
.wc { cursor: pointer; transition: transform 0.18s, box-shadow 0.18s; }
.wc:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }

.card-body { flex: 1; min-width: 0; }
.card-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #a09080;
  margin-bottom: 4px;
}
.card-value {
  font-size: 15px;
  font-weight: 600;
  color: #2c1810;
  line-height: 1.4;
  margin-bottom: 6px;
}
.card-link {
  font-size: 13px;
  color: #8b6914;
  text-decoration: none;
  font-weight: 500;
}
.card-link:hover { text-decoration: underline; }
.card-cta {
  font-size: 13px;
  color: #8b6914;
  font-weight: 500;
}

/* Hours band */
.hours-band {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0;
  background: #2c1810;
  border-radius: 14px;
  padding: 24px 32px;
  color: #f5e6c8;
}
.hours-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 0 32px;
}
.hours-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #a08060;
}
.hours-time {
  font-size: 17px;
  font-weight: 600;
  color: #f5e6c8;
}
.hours-divider {
  width: 1px;
  height: 40px;
  background: rgba(255,255,255,0.15);
}

@media (max-width: 820px) {
  .contact-layout {
    grid-template-columns: 1fr;
  }
  .map-card { min-height: 280px; }
}
@media (max-width: 540px) {
  .hours-band { flex-direction: column; gap: 20px; padding: 24px 20px; }
  .hours-divider { width: 60px; height: 1px; }
}
</style>
