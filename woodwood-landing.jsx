import { useState, useEffect, useRef } from "react";

const LANG = {
  en: {
    nav: { home: "Home", about: "About", restaurant: "Restaurant", rooms: "Rooms", location: "Location", book: "Book Now" },
    hero: {
      tagline: "Rest. Eat. Feel at home.",
      sub: "A cozy wooden retreat in the heart of Vientiane",
      cta: "Explore rooms",
    },
    about: {
      eyebrow: "Our Story",
      title: "Built with wood. Run with heart.",
      p1: "Wood Wood is more than a hostel — it's a feeling. From the moment you step through the door, the warmth of natural wood surrounds you. Every beam, every floor, every corner was designed to make you slow down, breathe, and feel at home.",
      p2: "Located on Rue Pangkham in central Vientiane, just steps from the Mekong night market, temples, and cafés. Whether you're a solo backpacker, a couple exploring Laos, or a digital nomad looking for a quiet corner — this is your place.",
      stat1: "104+", stat1Label: "Guest reviews",
      stat2: "9.8", stat2Label: "Trip.com rating",
      stat3: "3 min", stat3Label: "To National Museum",
    },
    restaurant: {
      eyebrow: "The Kitchen",
      title: "Good food, good coffee, good company.",
      p: "Our ground-floor restaurant serves Asian and Western breakfast, hearty lunch plates, specialty coffee, and cold drinks. Hostel guests enjoy 10% off every meal. Come for the food, stay for the vibe.",
      item1: "Asian & American Breakfast",
      item2: "Fresh Coffee & Smoothies",
      item3: "Lao & International Dishes",
      item4: "10% off for guests",
    },
    rooms: {
      eyebrow: "Stay With Us",
      title: "Simple. Clean. Comfortable.",
      p: "All-wood interiors, air conditioning, garden-view patios, free Wi-Fi, and shared lounges designed for meeting fellow travelers.",
      room1: "Mixed Dormitory",
      room1desc: "10-bed room · 29m² · A/C · Shared bath",
      room2: "Female Dormitory",
      room2desc: "10-bed room · 38m² · A/C · Women only",
      room3: "Private Room",
      room3desc: "Double bed · Garden view · Patio",
      from: "from",
      perNight: "/night",
      bookOn: "Book on",
    },
    location: {
      eyebrow: "Find Us",
      title: "199 Rue Pangkham, Vientiane",
      p: "In the old quarter, walking distance to everything. 5 km from Wattay International Airport.",
      checkin: "Check-in: 14:00 – 22:00",
      checkout: "Check-out: 08:00 – 12:00",
    },
    footer: {
      tagline: "Wood Wood Restaurant & Hostel",
      address: "199 Rue Pangkham, Vientiane, Laos",
      rights: "© 2026 Wood Wood. All rights reserved.",
    },
  },
  zh: {
    nav: { home: "首页", about: "关于我们", restaurant: "餐厅", rooms: "客房", location: "位置", book: "立即预订" },
    hero: {
      tagline: "休息。用餐。宾至如归。",
      sub: "万象市中心温馨的木屋小憩",
      cta: "探索客房",
    },
    about: {
      eyebrow: "我们的故事",
      title: "以木建造，用心经营。",
      p1: "Wood Wood 不仅仅是一家青旅——它是一种感觉。踏入门的那一刻，天然木材的温暖便围绕着你。每一根横梁、每一块地板、每一个角落，都旨在让你放慢脚步、深呼吸、感受家的温暖。",
      p2: "位于万象市中心的 Rue Pangkham，步行即可到达湄公河夜市、寺庙和咖啡馆。无论你是独行背包客、探索老挝的情侣，还是寻找安静角落的数字游民——这里就是你的地方。",
      stat1: "104+", stat1Label: "客人评价",
      stat2: "9.8", stat2Label: "Trip.com 评分",
      stat3: "3 分钟", stat3Label: "到国家博物馆",
    },
    restaurant: {
      eyebrow: "厨房",
      title: "好食物，好咖啡，好伙伴。",
      p: "一楼餐厅供应亚洲和西式早餐、丰盛的午餐、特色咖啡和冷饮。住客用餐享九折优惠。为美食而来，因氛围而留。",
      item1: "亚洲和美式早餐",
      item2: "鲜制咖啡和果昔",
      item3: "老挝及国际菜肴",
      item4: "住客九折优惠",
    },
    rooms: {
      eyebrow: "入住体验",
      title: "简约。整洁。舒适。",
      p: "全木内饰、空调、花园景观露台、免费WiFi，以及专为旅行者交流而设计的共享休息室。",
      room1: "混合宿舍",
      room1desc: "10人间 · 29m² · 空调 · 共用浴室",
      room2: "女生宿舍",
      room2desc: "10人间 · 38m² · 空调 · 仅限女性",
      room3: "私人房间",
      room3desc: "双人床 · 花园景观 · 露台",
      from: "起价",
      perNight: "/晚",
      bookOn: "预订于",
    },
    location: {
      eyebrow: "找到我们",
      title: "万象市 Rue Pangkham 199号",
      p: "位于老城区，步行可达各处。距瓦岱国际机场5公里。",
      checkin: "入住时间：14:00 – 22:00",
      checkout: "退房时间：08:00 – 12:00",
    },
    footer: {
      tagline: "Wood Wood 餐厅与青旅",
      address: "老挝万象市 Rue Pangkham 199号",
      rights: "© 2026 Wood Wood. 保留所有权利。",
    },
  },
  lo: {
    nav: { home: "ໜ້າຫຼັກ", about: "ກ່ຽວກັບ", restaurant: "ຮ້ານອາຫານ", rooms: "ຫ້ອງພັກ", location: "ສະຖານທີ່", book: "ຈອງດຽວນີ້" },
    hero: {
      tagline: "ພັກຜ່ອນ. ກິນ. ຮູ້ສຶກຄືຢູ່ເຮືອນ.",
      sub: "ບ່ອນພັກໄມ້ອົບອຸ່ນໃຈກາງນະຄອນຫຼວງວຽງຈັນ",
      cta: "ເບິ່ງຫ້ອງພັກ",
    },
    about: {
      eyebrow: "ເລື່ອງຂອງພວກເຮົາ",
      title: "ສ້າງດ້ວຍໄມ້. ດຳເນີນດ້ວຍໃຈ.",
      p1: "Wood Wood ບໍ່ແມ່ນພຽງແຕ່ໂຮສເທວ — ມັນແມ່ນຄວາມຮູ້ສຶກ. ຕັ້ງແຕ່ກ້າວເຂົ້າປະຕູ, ຄວາມອົບອຸ່ນຂອງໄມ້ທຳມະຊາດຈະຫໍ້ອ້ອಮຮອບທ່ານ.",
      p2: "ຕັ້ງຢູ່ຖະໜົນປາງຄຳ ໃຈກາງວຽງຈັນ, ຍ່າງໄປຕະຫຼາດກາງຄືນແຄມຂອງ, ວັດ ແລະ ຮ້ານກາເຟໄດ້.",
      stat1: "104+", stat1Label: "ການລີວິວ",
      stat2: "9.8", stat2Label: "ຄະແນນ Trip.com",
      stat3: "3 ນາທີ", stat3Label: "ຫາພິພິທະພັນ",
    },
    restaurant: {
      eyebrow: "ເຮືອນຄົວ",
      title: "ອາຫານແຊບ, ກາເຟແຊບ, ເພື່ອນດີ.",
      p: "ຮ້ານອາຫານຊັ້ນລຸ່ມບໍລິການອາຫານເຊົ້າແບບອາຊີ ແລະ ຕາເວັນຕົກ. ແຂກທີ່ພັກໄດ້ສ່ວນຫຼຸດ 10%.",
      item1: "ອາຫານເຊົ້າແບບອາຊີ & ອາເມລິກາ",
      item2: "ກາເຟສົດ & ສະມູດທີ",
      item3: "ອາຫານລາວ & ສາກົນ",
      item4: "ສ່ວນຫຼຸດ 10% ສຳລັບແຂກ",
    },
    rooms: {
      eyebrow: "ພັກກັບພວກເຮົາ",
      title: "ງ່າຍດາຍ. ສະອາດ. ສະດວກສະບາຍ.",
      p: "ພາຍໃນທັງໝົດເປັນໄມ້, ແອ, ລະບຽງສວນ, WiFi ຟຣີ, ແລະ ຫ້ອງພັກຜ່ອນຮ່ວມ.",
      room1: "ຫ້ອງນອນລວມ",
      room1desc: "10 ຕຽງ · 29m² · ແອ · ຫ້ອງນ້ຳຮ່ວມ",
      room2: "ຫ້ອງນອນຍິງ",
      room2desc: "10 ຕຽງ · 38m² · ແອ · ສະເພາະແມ່ຍິງ",
      room3: "ຫ້ອງສ່ວນຕົວ",
      room3desc: "ຕຽງຄູ່ · ວິວສວນ · ລະບຽງ",
      from: "ເລີ່ມຕົ້ນ",
      perNight: "/ຄືນ",
      bookOn: "ຈອງຜ່ານ",
    },
    location: {
      eyebrow: "ຊອກຫາພວກເຮົາ",
      title: "199 ຖະໜົນປາງຄຳ, ວຽງຈັນ",
      p: "ຢູ່ໃນເຂດເມືອງເກົ່າ, ຍ່າງໄປໄດ້ທຸກບ່ອນ. ຫ່າງຈາກສະໜາມບິນ 5 ກມ.",
      checkin: "ເຊັກອິນ: 14:00 – 22:00",
      checkout: "ເຊັກເອົາ: 08:00 – 12:00",
    },
    footer: {
      tagline: "Wood Wood ຮ້ານອາຫານ & ໂຮສເທວ",
      address: "199 ຖະໜົນປາງຄຳ, ວຽງຈັນ, ລາວ",
      rights: "© 2026 Wood Wood. ສະຫງວນລິຂະສິດ.",
    },
  },
};

const LANG_LABELS = { en: "English", zh: "中文", lo: "ລາວ" };

// Wood grain SVG pattern
const WoodGrain = () => (
  <svg width="0" height="0" style={{ position: "absolute" }}>
    <defs>
      <pattern id="woodgrain" patternUnits="userSpaceOnUse" width="200" height="200">
        <rect width="200" height="200" fill="#D4A574" />
        <path d="M0 20 Q50 15 100 22 T200 18" stroke="#C4935A" strokeWidth="0.8" fill="none" opacity="0.5" />
        <path d="M0 45 Q60 40 120 48 T200 43" stroke="#C4935A" strokeWidth="0.6" fill="none" opacity="0.4" />
        <path d="M0 70 Q40 66 90 73 T200 68" stroke="#C4935A" strokeWidth="0.7" fill="none" opacity="0.45" />
        <path d="M0 95 Q55 90 110 97 T200 93" stroke="#C4935A" strokeWidth="0.5" fill="none" opacity="0.35" />
        <path d="M0 120 Q45 116 95 123 T200 118" stroke="#C4935A" strokeWidth="0.8" fill="none" opacity="0.4" />
        <path d="M0 148 Q60 143 115 150 T200 146" stroke="#C4935A" strokeWidth="0.6" fill="none" opacity="0.45" />
        <path d="M0 175 Q50 170 100 177 T200 173" stroke="#C4935A" strokeWidth="0.7" fill="none" opacity="0.38" />
      </pattern>
    </defs>
  </svg>
);

// Leaf icon for restaurant items
const Leaf = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B7C4F" strokeWidth="2" strokeLinecap="round">
    <path d="M12 22c-4-4-8-7.5-8-12C4 5 8 2 12 2s8 3 8 8c0 4.5-4 8-8 12z" />
    <path d="M12 22V8" />
    <path d="M8 12c2-1 4-1 4 0" />
  </svg>
);

// Bed icon
const Bed = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M2 12h20v5H2z" />
    <path d="M2 17v3M22 17v3" />
    <path d="M2 12V7a2 2 0 012-2h16a2 2 0 012 2v5" />
    <circle cx="7" cy="9" r="2" />
  </svg>
);

// Map pin icon
const MapPin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default function WoodWoodLanding() {
  const [lang, setLang] = useState("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = LANG[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const fonts = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Lao:wght@300;400;500;600&family=Noto+Sans+SC:wght@300;400;500;600&display=swap');
  `;

  const fontFamily = lang === "lo"
    ? "'Noto Sans Lao', 'Inter', sans-serif"
    : lang === "zh"
    ? "'Noto Sans SC', 'Inter', sans-serif"
    : "'Inter', sans-serif";

  const displayFont = lang === "zh"
    ? "'Noto Sans SC', serif"
    : lang === "lo"
    ? "'Noto Sans Lao', serif"
    : "'DM Serif Display', serif";

  return (
    <div style={{ fontFamily, color: "#2C1810", background: "#FAF6F0", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{fonts}</style>
      <WoodGrain />

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(250,246,240,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(180,150,110,0.2)" : "none",
        transition: "all 0.3s ease",
        padding: "0 24px",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ fontFamily: displayFont, fontSize: 22, fontWeight: 700, color: "#3D2B1F", letterSpacing: "-0.02em", cursor: "pointer" }} onClick={() => scrollTo("hero")}>
            <span style={{ color: "#8B6914" }}>W</span>ood <span style={{ color: "#8B6914" }}>W</span>ood
          </div>

          {/* Desktop nav */}
          <div style={{ display: "flex", alignItems: "center", gap: 28 }} className="desktop-nav">
            {[["hero", t.nav.home], ["about", t.nav.about], ["restaurant", t.nav.restaurant], ["rooms", t.nav.rooms], ["location", t.nav.location]].map(([id, label]) => (
              <span key={id} onClick={() => scrollTo(id)} style={{ fontSize: 13, fontWeight: 500, cursor: "pointer", color: "#5A4A3A", letterSpacing: "0.02em", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#8B6914"} onMouseLeave={e => e.target.style.color = "#5A4A3A"}>
                {label}
              </span>
            ))}

            {/* Language switcher */}
            <div style={{ position: "relative" }}>
              <button onClick={() => setLangOpen(!langOpen)} style={{
                background: "none", border: "1px solid rgba(139,105,20,0.3)", borderRadius: 6, padding: "5px 12px",
                fontSize: 12, fontWeight: 500, color: "#5A4A3A", cursor: "pointer", fontFamily,
              }}>
                {LANG_LABELS[lang]} ▾
              </button>
              {langOpen && (
                <div style={{ position: "absolute", top: "100%", right: 0, marginTop: 4, background: "#fff", borderRadius: 8, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", overflow: "hidden", minWidth: 100 }}>
                  {Object.entries(LANG_LABELS).map(([code, label]) => (
                    <div key={code} onClick={() => { setLang(code); setLangOpen(false); }}
                      style={{ padding: "10px 16px", fontSize: 13, cursor: "pointer", background: lang === code ? "#F5E6C8" : "#fff", fontWeight: lang === code ? 600 : 400, fontFamily }}
                      onMouseEnter={e => e.target.style.background = "#F5E6C8"} onMouseLeave={e => { if (lang !== code) e.target.style.background = "#fff"; }}>
                      {label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => scrollTo("rooms")} style={{
              background: "#3D2B1F", color: "#F5E6C8", border: "none", borderRadius: 6, padding: "8px 18px",
              fontSize: 13, fontWeight: 600, cursor: "pointer", letterSpacing: "0.02em", fontFamily,
            }}>
              {t.nav.book}
            </button>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: "none", background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "#3D2B1F" }}
            className="mobile-menu-btn">
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: "rgba(250,246,240,0.98)", padding: "16px 24px 24px", borderTop: "1px solid rgba(180,150,110,0.2)" }} className="mobile-menu">
            {[["hero", t.nav.home], ["about", t.nav.about], ["restaurant", t.nav.restaurant], ["rooms", t.nav.rooms], ["location", t.nav.location]].map(([id, label]) => (
              <div key={id} onClick={() => scrollTo(id)} style={{ padding: "12px 0", fontSize: 15, fontWeight: 500, cursor: "pointer", color: "#3D2B1F", borderBottom: "1px solid rgba(180,150,110,0.15)" }}>
                {label}
              </div>
            ))}
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              {Object.entries(LANG_LABELS).map(([code, label]) => (
                <button key={code} onClick={() => { setLang(code); setMenuOpen(false); }}
                  style={{ padding: "6px 14px", borderRadius: 6, border: lang === code ? "2px solid #8B6914" : "1px solid #ccc", background: lang === code ? "#F5E6C8" : "#fff", fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section id="hero" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
        textAlign: "center", padding: "100px 24px 60px", position: "relative", overflow: "hidden",
      }}>
        {/* Wood texture decorative bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 6,
          background: "linear-gradient(90deg, #8B6914, #D4A574, #8B6914, #C4935A, #8B6914)",
        }} />

        {/* Decorative wood grain circle */}
        <div style={{
          width: 140, height: 140, borderRadius: "50%", marginBottom: 32,
          background: "linear-gradient(135deg, #D4A574 0%, #A67C3D 50%, #8B6914 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 32px rgba(139,105,20,0.25), inset 0 2px 8px rgba(255,255,255,0.3)",
        }}>
          <span style={{ fontFamily: displayFont, fontSize: 42, color: "#FAF6F0", lineHeight: 1, fontWeight: 700 }}>WW</span>
        </div>

        <h1 style={{
          fontFamily: displayFont, fontSize: "clamp(36px, 7vw, 68px)", fontWeight: 400,
          color: "#2C1810", lineHeight: 1.1, margin: "0 0 16px", letterSpacing: "-0.02em",
          maxWidth: 700,
        }}>
          {t.hero.tagline}
        </h1>
        <p style={{ fontSize: "clamp(15px, 2.5vw, 18px)", color: "#7A6A5A", maxWidth: 500, lineHeight: 1.6, margin: "0 0 36px", fontWeight: 300 }}>
          {t.hero.sub}
        </p>
        <button onClick={() => scrollTo("rooms")} style={{
          background: "#3D2B1F", color: "#F5E6C8", border: "none", borderRadius: 8,
          padding: "14px 32px", fontSize: 15, fontWeight: 500, cursor: "pointer",
          display: "flex", alignItems: "center", gap: 8, fontFamily,
          transition: "transform 0.2s, box-shadow 0.2s",
          boxShadow: "0 4px 16px rgba(61,43,31,0.2)",
        }}
          onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 6px 20px rgba(61,43,31,0.3)"; }}
          onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 16px rgba(61,43,31,0.2)"; }}>
          {t.hero.cta} <ArrowRight />
        </button>

        {/* Scroll hint */}
        <div style={{ position: "absolute", bottom: 32, opacity: 0.4, fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7A6A5A" }}>
          ↓
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "80px 24px", background: "#F0E8DB" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#8B6914" }}>
            {t.about.eyebrow}
          </span>
          <h2 style={{ fontFamily: displayFont, fontSize: "clamp(28px, 5vw, 44px)", color: "#2C1810", margin: "12px 0 24px", lineHeight: 1.15 }}>
            {t.about.title}
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: "#5A4A3A", maxWidth: 650, margin: "0 0 16px", fontWeight: 300 }}>
            {t.about.p1}
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: "#5A4A3A", maxWidth: 650, margin: "0 0 40px", fontWeight: 300 }}>
            {t.about.p2}
          </p>

          {/* Stats */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 40 }}>
            {[[t.about.stat1, t.about.stat1Label], [t.about.stat2, t.about.stat2Label], [t.about.stat3, t.about.stat3Label]].map(([val, label], i) => (
              <div key={i} style={{ minWidth: 120 }}>
                <div style={{ fontFamily: displayFont, fontSize: 36, color: "#8B6914", lineHeight: 1 }}>{val}</div>
                <div style={{ fontSize: 12, color: "#7A6A5A", marginTop: 6, fontWeight: 500, letterSpacing: "0.02em" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESTAURANT ── */}
      <section id="restaurant" style={{ padding: "80px 24px", background: "#FAF6F0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#5B7C4F" }}>
            {t.restaurant.eyebrow}
          </span>
          <h2 style={{ fontFamily: displayFont, fontSize: "clamp(28px, 5vw, 44px)", color: "#2C1810", margin: "12px 0 20px", lineHeight: 1.15 }}>
            {t.restaurant.title}
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: "#5A4A3A", maxWidth: 600, margin: "0 0 36px", fontWeight: 300 }}>
            {t.restaurant.p}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {[t.restaurant.item1, t.restaurant.item2, t.restaurant.item3, t.restaurant.item4].map((item, i) => (
              <div key={i} style={{
                background: "#fff", borderRadius: 10, padding: "20px 20px",
                display: "flex", alignItems: "flex-start", gap: 12,
                border: "1px solid rgba(139,105,20,0.1)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}>
                <div style={{ marginTop: 1 }}><Leaf /></div>
                <span style={{ fontSize: 14, fontWeight: 500, color: "#3D2B1F", lineHeight: 1.4 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROOMS ── */}
      <section id="rooms" style={{ padding: "80px 24px", background: "#F0E8DB" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#8B6914" }}>
            {t.rooms.eyebrow}
          </span>
          <h2 style={{ fontFamily: displayFont, fontSize: "clamp(28px, 5vw, 44px)", color: "#2C1810", margin: "12px 0 20px", lineHeight: 1.15 }}>
            {t.rooms.title}
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: "#5A4A3A", maxWidth: 600, margin: "0 0 36px", fontWeight: 300 }}>
            {t.rooms.p}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
            {[
              [t.rooms.room1, t.rooms.room1desc, "$6"],
              [t.rooms.room2, t.rooms.room2desc, "$6"],
              [t.rooms.room3, t.rooms.room3desc, "$18"],
            ].map(([name, desc, price], i) => (
              <div key={i} style={{
                background: "#fff", borderRadius: 12, overflow: "hidden",
                border: "1px solid rgba(139,105,20,0.1)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.05)"; }}>

                {/* Wood texture header */}
                <div style={{
                  height: 100, background: `linear-gradient(135deg, ${["#D4A574", "#C4935A", "#A67C3D"][i]} 0%, ${["#B8885A", "#A67C3D", "#8B6914"][i]} 100%)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative",
                }}>
                  <div style={{ color: "#FAF6F0", opacity: 0.9 }}><Bed /></div>
                  <div style={{ position: "absolute", bottom: 10, right: 14, background: "rgba(250,246,240,0.9)", borderRadius: 6, padding: "4px 10px", fontSize: 13, fontWeight: 600, color: "#3D2B1F" }}>
                    {t.rooms.from} {price}{t.rooms.perNight}
                  </div>
                </div>

                <div style={{ padding: "20px" }}>
                  <h3 style={{ fontSize: 17, fontWeight: 600, color: "#2C1810", margin: "0 0 6px" }}>{name}</h3>
                  <p style={{ fontSize: 13, color: "#7A6A5A", margin: "0 0 16px", lineHeight: 1.5 }}>{desc}</p>

                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {["Booking.com", "Trip.com", "Agoda"].map(platform => (
                      <span key={platform} style={{
                        fontSize: 11, fontWeight: 500, color: "#8B6914", background: "#F5E6C8",
                        padding: "4px 10px", borderRadius: 4, cursor: "pointer",
                      }}>
                        {t.rooms.bookOn} {platform}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATION ── */}
      <section id="location" style={{ padding: "80px 24px", background: "#FAF6F0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#8B6914" }}>
            {t.location.eyebrow}
          </span>
          <h2 style={{ fontFamily: displayFont, fontSize: "clamp(24px, 4vw, 36px)", color: "#2C1810", margin: "12px 0 16px", lineHeight: 1.2, display: "flex", alignItems: "center", gap: 10 }}>
            <MapPin /> {t.location.title}
          </h2>
          <p style={{ fontSize: 16, color: "#5A4A3A", margin: "0 0 24px", fontWeight: 300, lineHeight: 1.6 }}>
            {t.location.p}
          </p>

          {/* Map embed placeholder */}
          <div style={{
            width: "100%", height: 280, borderRadius: 12, overflow: "hidden",
            border: "1px solid rgba(139,105,20,0.15)",
            marginBottom: 24,
          }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1900!2d102.6094691!3d17.9664672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3124696c8868bb3d%3A0xa016f8643f069c07!2sWood%20Wood%20Restaurant%20and%20Hostel!5e0!3m2!1sen!2s!4v1700000000000"
              width="100%" height="100%" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              title="Wood Wood Location"
            />
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, fontSize: 14, color: "#5A4A3A" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>🕐 {t.location.checkin}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>🕐 {t.location.checkout}</span>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        background: "#2C1810", color: "#D4A574", padding: "48px 24px 32px",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: displayFont, fontSize: 26, marginBottom: 8, color: "#F5E6C8" }}>
            <span style={{ color: "#D4A574" }}>W</span>ood <span style={{ color: "#D4A574" }}>W</span>ood
          </div>
          <p style={{ fontSize: 14, color: "#A08060", margin: "0 0 6px" }}>{t.footer.tagline}</p>
          <p style={{ fontSize: 13, color: "#7A6A5A", margin: "0 0 24px" }}>{t.footer.address}</p>

          {/* Social / OTA links */}
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
            {["Booking.com", "Trip.com", "Agoda", "Google Maps"].map(p => (
              <span key={p} style={{
                fontSize: 12, color: "#A08060", border: "1px solid rgba(160,128,96,0.3)",
                borderRadius: 6, padding: "6px 14px", cursor: "pointer",
                transition: "color 0.2s, border-color 0.2s",
              }}
                onMouseEnter={e => { e.target.style.color = "#F5E6C8"; e.target.style.borderColor = "#D4A574"; }}
                onMouseLeave={e => { e.target.style.color = "#A08060"; e.target.style.borderColor = "rgba(160,128,96,0.3)"; }}>
                {p}
              </span>
            ))}
          </div>

          <div style={{ fontSize: 11, color: "#5A4A3A" }}>{t.footer.rights}</div>
        </div>
      </footer>
    </div>
  );
}
