import { useEffect, useRef, useState } from "react";
import { IconCheck, IconBook, Bracket } from "./icons.jsx";
import SectionRouteLines from "./SectionRouteLines.jsx";
import sunGif from "/src/assets/theme-sun.gif";
import moonGif from "/src/assets/theme-moon.gif";
import burgerGif from "/src/assets/icons8-menu.svg";
import { Helmet } from "react-helmet-async";

/* ================= I18N (RU / UZ) ================= */
const i18n = {
  ru: {
    nav: { hero: "Главная", about: "О школе", courses: "Курсы", benefits: "Почему мы", teachers: "Преподаватели", testimonials: "Отзывы", faq: "FAQ", contact: "Контакты" },
    hero: {
      titleLines: ["Стань профессионалом", "в логистике за 1 месяц", "с UTL School"],
      sub: "Онлайн и офлайн обучение. Реальные заказы, практика, сертификат и помощь в трудоустройстве.",
      cta: "Записаться на бесплатный урок",
      spots: "Места ограничены — набор на текущий поток открыт."
    },
    section: { about: "О школе", courses: "Тарифы", benefits: "Почему выбирают нас", testimonials: "Отзывы студентов", how: "Как проходит обучение", faq: "FAQ", contact: "Оставить заявку" },
    cta: { nav: "Записаться", contact_call: "Позвонить", premium: "Хочу Премиум", take_seat: "Взять место на потоке", enroll: "Записаться" },
    proof: { rating: "4.9/5 по отзывам студентов", alumni: "Выпускники уже в логистических компаниях", guarantee: "7 дней гарантия возврата · Безопасная оплата" },
    form: { name: "Имя", phone: "Телефон", tg: "Telegram (опционально)", consent: "Согласен на обработку персональных данных", submit: "Получить консультацию", sending: "Отправляем…", ok: "Спасибо! Мы свяжемся с вами." },
    faq: [
      ["Сколько длится обучение?", "Обычно 4 недели, 3 занятия в неделю."],
      ["Можно ли учиться онлайн?", "Да, полная онлайн-поддержка, записи занятий."],
      ["Вы помогаете с трудоустройством?", "Да, помогаем с резюме, готовим к интервью."],
      ["Сколько стоит обучение?", "«Быстрый старт» — 2 000 000 сум, «Погружение» — 3 000 000 сум, «Премиум» — 4 000 000 сум."]
    ],
    footer: { contact_us: "Свяжитесь с нами", call: "Позвонить", address_city: "г. Ташкент, ул. Саида Барака, 18", address_hint: "ориентир: РУВД, метро Ташкент", phone: "+998 (90) 123-45-67" },
    benefits: [
      { t: "Сертификат", d: "Сертификат государственного образца после обучения", icon: "award" },
      { t: "Поддержка", d: "Поддержка педагога-логиста с многолетним стажем", icon: "support" },
      { t: "Стажировка", d: "Гарантированная стажировка в логистической компании UTL High Logistics", icon: "briefcase" },
      { t: "Практика и заработок", d: "Учебная практика на реальных заказах + первые выплаты во время обучения", icon: "money" }
    ]
  },
  uz: {
    nav: { hero: "Bosh sahifa", about: "Maktab haqida", courses: "Kurslar", benefits: "Nega biz", teachers: "O‘qituvchilar", testimonials: "Sharhlar", faq: "FAQ", contact: "Kontaktlar" },
    hero: {
      titleLines: ["1 oyda logistika bo‘yicha", "mutaxassis bo‘ling", "UTL School bilan"],
      sub: "Onlayn va oflayn ta’lim. Real buyurtmalar, amaliyot, sertifikat va ishga joylashishda ko‘mak.",
      cta: "Bepul darsga yozilish",
      spots: "Joylar cheklangan — joriy oqimga qabul ochiq."
    },
    section: { about: "Maktab haqida", courses: "Tariflar", benefits: "Nega bizni tanlashadi", testimonials: "Talabalar fikrlari", how: "O‘qish qanday o‘tadi", faq: "FAQ", contact: "Ariza qoldirish" },
    cta: { nav: "Yozilish", contact_call: "Qo‘ng‘iroq qilish", premium: "Premium istayman", take_seat: "Oqimdan joy olish", enroll: "Yozilish" },
    proof: { rating: "Talabalar bahosi: 4.9/5", alumni: "Bitiruvchilar logistika kompaniyalarida ishlamoqda", guarantee: "7 kun qaytarish kafolati · Xavfsiz to‘lov" },
    form: { name: "Ism", phone: "Telefon", tg: "Telegram (ixtiyoriy)", consent: "Shaxsiy ma’lumotlarni qayta ishlashga roziman", submit: "Konsultatsiya olish", sending: "Yuborilmoqda…", ok: "Rahmat! Siz bilan bog‘lanamiz." },
    faq: [
      ["Ta’lim qancha davom etadi?", "Odatda 4 hafta, haftasiga 3 ta dars."],
      ["Onlayn o‘qish mumkinmi?", "Ha, to‘liq onlayn qo‘llab-quvvatlash, dars yozuvlari bor."],
      ["Ishga joylashishda yordam berasizmi?", "Ha, rezume tayyorlash va suhbatlarga tayyorlaymiz."],
      ["O‘qish narxi qancha?", "“Tez start” — 2 000 000 so‘m, “Chuqur o‘rganish” — 3 000 000 so‘m, “Premium” — 4 000 000 so‘m."]
    ],
    footer: { contact_us: "Biz bilan bog‘laning", call: "Qo‘ng‘iroq qilish", address_city: "Toshkent sh., Said Baraka ko‘ch., 18", address_hint: "mo‘ljal: RUVB, Toshkent metro", phone: "+998 (90) 123-45-67" },
    benefits: [
      { t: "Sertifikat", d: "Ta’lim yakunida davlat namunasi sertifikati", icon: "award" },
      { t: "Qo‘llab-quvvatlash", d: "Ko‘p yillik tajribaga ega logist-pedagog yordami", icon: "support" },
      { t: "Amaliyot", d: "UTL High Logistics kompaniyasida kafolatlangan amaliyot", icon: "briefcase" },
      { t: "Amaliyot va daromad", d: "Real buyurtmalarda o‘quv amaliyoti + o‘qish vaqtida ilk to‘lovlar", icon: "money" }
    ]
  }
};

/* ================= THEME & LANG ================= */
const getInitialTheme = () => {
  try { const saved = localStorage.getItem("utl-theme"); if (saved === "dark" || saved === "light") return saved; } catch {}
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ? "dark" : "light";
};
const getInitialLang = () => { try { const saved = localStorage.getItem("utl-lang"); if (saved === "ru" || saved === "uz") return saved; } catch {} return "ru"; };
const getPath = (obj, path) => path.split(".").reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : undefined), obj);

// рядом в App.jsx (выше return)
function SeoLink({ href, children }) {
  return (
    <a className="seoLink" href={href}>
      <span className="seoLink__text">{children}</span>
      <span className="seoLink__arrow" aria-hidden>→</span>
    </a>
  );
}

function SeoInlineLinks({ lang }) {
  return lang === "uz" ? (
    <p className="p seoInline">
      Tafsilotlar uchun {" "}
      <SeoLink href="#courses">tariflar va o‘qish narxlari</SeoLink>, {" "}
      <SeoLink href="#how">onlayn format qanday o‘tadi</SeoLink>, {" "}
      <SeoLink href="#contact">kontaktlar</SeoLink>.
    </p>
  ) : (
    <p className="p seoInline">
      Подробнее: {" "}
      <SeoLink href="#courses">тарифы и стоимость обучения</SeoLink>, {" "}
      <SeoLink href="#how">как устроен онлайн-формат</SeoLink>, {" "}
      <SeoLink href="#contact">контакты</SeoLink>.
    </p>
  );
}

export default function App() {
  /* Theme */
  const [theme, setTheme] = useState(getInitialTheme);
  useEffect(() => {
    document.documentElement.classList.toggle("theme-dark", theme === "dark");
    try { localStorage.setItem("utl-theme", theme); } catch {}
  }, [theme]);
  const toggleTheme = () => setTheme(t => (t === "dark" ? "light" : "dark"));

  /* Lang */
  const [lang, setLang] = useState(getInitialLang);
  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    try { localStorage.setItem("utl-lang", lang); } catch {}
  }, [lang]);
  const t = (path, fallback) => (getPath(i18n[lang], path) ?? fallback ?? path);
  const getArr = (path, fallback = []) => { const v = getPath(i18n[lang], path); return Array.isArray(v) ? v : fallback; };
  const toggleLang = () => setLang(l => (l === "ru" ? "uz" : "ru"));

  /* ===== URL sync RU↔UZ (без роутера) ===== */
  useEffect(() => {
    const desired = lang === "uz" ? "/uz" : "/";
    if (window.location.pathname !== desired) window.history.pushState({}, "", desired);
  }, [lang]);

  /* ===== SEO constants (динамические на dev) ===== */
  const ORIGIN = (typeof window !== "undefined" && window.location?.origin) || "https://example.com";
  const URL_RU  = `${ORIGIN}/`;
  const URL_UZ  = `${ORIGIN}/uz`;
  const OG_IMG  = `${ORIGIN}/og-banner.png`;
  const IS_DEV  = typeof window !== "undefined" && /^(localhost|127\.0\.0\.1)/.test(window.location.hostname);

  const title = lang === "uz" ? "Logistika kurslari — UTL School" : "Курсы логистики — UTL School";
  const desc  = lang === "uz"
    ? "Onlayn va oflayn logistika kurslari: real buyurtmalar, amaliyot, sertifikat."
    : "Онлайн и офлайн курсы логистики: реальные заказы, практика, сертификат.";

  /* Nav */
  const nav = [
    { href: "#hero", key: "hero" },
    { href: "#about", key: "about" },
    { href: "#courses", key: "courses" },
    { href: "#benefits", key: "benefits" },
    { href: "#teachers", key: "teachers" },
    { href: "#testimonials", key: "testimonials" },
    { href: "#faq", key: "faq" },
    { href: "#contact", key: "contact" }
  ];

  /* Testimonials data */
  const testimonials = [
    { name: "Видео-отзыв", tag: "YouTube", videoId: "XnwtA92OUwc" },
    { name: "Шухрат А.", tag: "Выпускник", text: "Нашёл работу через 3 недели после курса. Очень зашли практические задания!" },
    { name: "Мунира Ж.", tag: "Выпускница", text: "Структурировано, понятно и много практики. Наставник помог с резюме." },
    { name: "Дильшод К.", tag: "Выпускник", text: "Разобрался с ВЭД и инкотермс. На собеседовании было легко отвечать." },
    { name: "Севара Н.", tag: "Выпускница", text: "Кейсы на реальных заказах — огонь. Сейчас стажируюсь в логистической компании." }
  ];

  /* Benefits icons */
  function BgIcon({ type }) {
    const c = { fill: "none", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2 };
    return (
      <svg className="benefitBgIcon" viewBox="0 0 100 100" aria-hidden>
        {type === "money" && (<><circle cx="60" cy="40" r="18" {...c} /><path d="M52 40h16M60 32v16" {...c} /><rect x="22" y="58" width="50" height="24" rx="6" {...c} /><path d="M28 70h12m14 0h12" {...c} /></>)}
        {type === "briefcase" && (<><rect x="20" y="36" width="60" height="40" rx="8" {...c} /><path d="M20 54h60" {...c} /><rect x="38" y="26" width="24" height="10" rx="3" {...c} /><path d="M50 36v18" {...c} /></>)}
        {type === "clipboard" && (<><rect x="26" y="22" width="48" height="56" rx="8" {...c} /><rect x="40" y="16" width="20" height="12" rx="4" {...c} /><path d="M34 40h32M34 50h28M34 60h20" {...c} /></>)}
        {type === "award" && (<><circle cx="50" cy="38" r="16" {...c} /><path d="M42 32l8 8 12-12" {...c} /><path d="M42 56l-10 18 18-10 18 10-10-18" {...c} /></>)}
        {type === "support" && (<><path d="M28 56v-6a22 22 0 0 1 44 0v6" {...c} /><rect x="20" y="56" width="16" height="18" rx="4" {...c} /><rect x="64" y="56" width="16" height="18" rx="4" {...c} /><path d="M42 80h16" {...c} /></>)}
      </svg>
    );
  }
  const benefitsData = i18n[lang].benefits;

  /* State */
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", consent: false });
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("#hero");
  const [benefitsCta, setBenefitsCta] = useState(false);

  /* Refs */
  const scrollRef = useRef(null);
  const howRef = useRef(null);
  const stepsRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  /* Auto carousel */
  useEffect(() => {
    const el = scrollRef.current; if (!el) return;
    let paused = false; const GAP = 14; const STEP = () => (el.querySelector(".tcard")?.offsetWidth || 300) + GAP;
    const tick = () => { if (paused) return; const nearEnd = Math.ceil(el.scrollLeft + el.clientWidth + 2) >= el.scrollWidth; if (nearEnd) el.scrollTo({ left: 0, behavior: "auto" }); else el.scrollBy({ left: STEP(), behavior: "smooth" }); };
    const id = setInterval(tick, 3500);
    const onEnter = () => (paused = true); const onLeave = () => (paused = false);
    el.addEventListener("mouseenter", onEnter); el.addEventListener("mouseleave", onLeave);
    el.addEventListener("touchstart", onEnter, { passive: true }); el.addEventListener("touchend", onLeave);
    return () => { clearInterval(id); el.removeEventListener("mouseenter", onEnter); el.removeEventListener("mouseleave", onLeave); el.removeEventListener("touchstart", onEnter); el.removeEventListener("touchend", onLeave); };
  }, []);

  /* Scroll spy */
  useEffect(() => {
    const sections = nav.map(i => document.querySelector(i.href));
    const obs = new IntersectionObserver((entries) => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if (visible?.target?.id) setActive("#" + visible.target.id);
    }, { rootMargin: "-40% 0px -50% 0px", threshold: [0, .25, .5, .75, 1] });
    sections.forEach(s => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);

  /* Benefits explode + CTA swap */
  useEffect(() => {
    const scene = document.querySelector(".benefitsCircleScene"); if (!scene) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { scene.classList.add("explode"); setTimeout(() => setBenefitsCta(true), 1800); obs.unobserve(scene); } }, { threshold: .35 });
    obs.observe(scene); return () => obs.disconnect();
  }, []);

  /* HOW equal heights (8) */
  useEffect(() => {
    const apply = () => { const h = stepsRef.current?.offsetHeight; if (h && howRef.current) howRef.current.style.setProperty("--how-left-h", `${h}px`); };
    apply(); window.addEventListener("resize", apply); return () => window.removeEventListener("resize", apply);
  }, []);

  /* Drawer */
  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen(v => !v);

  /* Lead form */
  const submitLead = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.consent) return alert(lang === "uz" ? "Ism, telefon va rozilikni to‘ldiring" : "Заполните имя, телефон и дайте согласие");
    try {
      setSending(true); setOk(false);
      const r = await fetch("http://127.0.0.1:8000/api/leads/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, phone: form.phone, telegram: form.telegram || "", consent_personal_data: form.consent, utm_source: "", utm_medium: "", utm_campaign: "", utm_term: "", utm_content: "", referer: document.referrer || "" })
      });
      if (!r.ok) throw new Error("fail");
      setOk(true); setForm({ name: "", phone: "", consent: false });
    } catch { alert(lang === "uz" ? "Yuborishda xatolik. Keyinroq urinib ko‘ring." : "Ошибка отправки. Попробуйте позже."); }
    finally { setSending(false); }
  };

  /* HOW steps */
  const howSteps = [
    { title: lang === "uz" ? "Ro‘yxatdan o‘tish va kirish darsi" : "Регистрация и вводный урок", key: "signup" },
    { title: lang === "uz" ? "Ta’lim: onlayn/oflayn + yozuvlar" : "Обучение: онлайн/офлайн + записи", key: "learn" },
    { title: lang === "uz" ? "UTL bilan real buyurtmalar" : "Реальные заказы с UTL", key: "orders" },
    { title: lang === "uz" ? "Sertifikat va karyera yordami" : "Сертификат и карьерная поддержка", key: "cert" }
  ];
  const [howIdx, setHowIdx] = useState(0);
  const [howPaused, setHowPaused] = useState(false);

  useEffect(() => {
    const el = howRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => setHowPaused(!e.isIntersecting), { threshold: .25 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (howPaused) return;
    const delay = howIdx === 0 ? 5000 : 2600;
    const tmr = setTimeout(() => setHowIdx(i => (i + 1) % howSteps.length), delay);
    return () => clearTimeout(tmr);
  }, [howIdx, howPaused, howSteps.length]);

  const heroLines = getArr("hero.titleLines", []);
  const inputStyle = { width: "100%", marginTop: 8, padding: "12px 14px", border: "1px solid #e6ebed", borderRadius: 12, fontSize: 16, outline: "none" };

  /* ===== Derived URLs for hreflang/canonical ===== */
  const CUR_URL = lang === "uz" ? URL_UZ : URL_RU;
  const ALT_URL = lang === "uz" ? URL_RU : URL_UZ; // зеркальная версия

  /* ===== JSON-LD helpers ===== */
  const ldOrganization = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: "UTL School",
    url: CUR_URL,
    image: OG_IMG,
    telephone: "+998901234567",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tashkent",
      streetAddress: "Said Baraka, 18",
      addressCountry: "UZ"
    },
    geo: { "@type": "GeoCoordinates", latitude: 41.3111, longitude: 69.2797 },
    sameAs: [
      "https://t.me/UTLschool_bot",
      "https://www.instagram.com/utlschool",
      "https://yandex.ru/maps/org/utl_school/84454493019/",
      "https://www.google.com/maps/place/Саида+Барака+18,+Ташкент"
    ],
    contactPoint: [{ "@type": "ContactPoint", telephone: "+998773604004", contactType: "customer support", availableLanguage: ["ru","uz"] }]
  };

  const ldFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: i18n[lang].faq.map(([q,a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } }))
  };

  const ldCourses = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        name: lang === "uz" ? "Tez start" : "Быстрый старт",
        description: lang === "uz" ? "1 oy, 11 jonli dars, onlayn/oflayn" : "1 мес, 11 живых занятий, онлайн/офлайн",
        provider: { "@type": "Organization", name: "UTL School", url: CUR_URL },
        hasCourseInstance: [{ "@type": "CourseInstance", courseMode: "online, offline", inLanguage: lang, location: { "@type": "Place", name: "Tashkent" }, offers: { "@type": "Offer", priceCurrency: "UZS", availability: "https://schema.org/InStock" } }]
      },
      { "@type": "Course", name: lang === "uz" ? "Chuqur o‘rganish" : "Погружение", description: lang === "uz" ? "5 hafta, 11 dars + yordam" : "5 нед, 11 занятий + поддержка", provider: { "@type": "Organization", name: "UTL School", url: CUR_URL } },
      { "@type": "Course", name: "Премиум", description: lang === "uz" ? "12 dars + karyera" : "12 занятий + карьера", provider: { "@type": "Organization", name: "UTL School", url: CUR_URL } }
    ]
  };

  const ldWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "UTL School",
    url: CUR_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${CUR_URL}?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  // Breadcrumbs по секциям (якоря) — помогает поисковикам понять структуру длинного лендинга
  const ldBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: lang === "uz" ? "Bosh sahifa" : "Главная", item: CUR_URL },
      { "@type": "ListItem", position: 2, name: lang === "uz" ? "Maktab haqida" : "О школе", item: `${CUR_URL}#about` },
      { "@type": "ListItem", position: 3, name: lang === "uz" ? "Kurslar" : "Курсы", item: `${CUR_URL}#courses` },
      { "@type": "ListItem", position: 4, name: lang === "uz" ? "Nega biz" : "Почему мы", item: `${CUR_URL}#benefits` },
      { "@type": "ListItem", position: 5, name: lang === "uz" ? "FAQ" : "FAQ", item: `${CUR_URL}#faq` },
      { "@type": "ListItem", position: 6, name: lang === "uz" ? "Kontaktlar" : "Контакты", item: `${CUR_URL}#contact` }
    ]
  };

  return (
    <>
      {/* ============= HEAD (Helmet) ============= */}
      <Helmet>
        {/* dev: не индексируем локалхост */}
        {IS_DEV && <meta name="robots" content="noindex,nofollow" />}

        {/* lang */}
        <html lang={lang} />

        {/* Title / Description */}
        <title>{title}</title>
        <meta name="description" content={desc} />

        {/* Canonical — языкоспецифичный */}
        <link rel="canonical" href={CUR_URL} />

        {/* hreflang пары + x-default */}
        <link rel="alternate" href={URL_RU} hrefLang="ru" />
        <link rel="alternate" href={URL_UZ} hrefLang="uz" />
        <link rel="alternate" href={URL_RU} hrefLang="x-default" />

        {/* Open Graph / Twitter */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={CUR_URL} />
        <meta property="og:image" content={OG_IMG} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={OG_IMG} />

        {/* Preconnect для возможных внешних доменов медиа (аккуратно, без лишнего) */}
        <link rel="preload" as="image" href={OG_IMG} />

        {/* JSON-LD blocks */}
        <script type="application/ld+json">{JSON.stringify(ldOrganization)}</script>
        <script type="application/ld+json">{JSON.stringify(ldFAQ)}</script>
        <script type="application/ld+json">{JSON.stringify(ldCourses)}</script>
        <script type="application/ld+json">{JSON.stringify(ldWebSite)}</script>
        <script type="application/ld+json">{JSON.stringify(ldBreadcrumbs)}</script>
      </Helmet>

      {/* NAV */}
      <nav className="nav">
        <div className="container nav__inner">
          <a href="#hero" className="brand"><span className="brand__logo" aria-hidden /></a>

          <div className="nav__links">
            {nav.map(i => (
              <a key={i.href} className={`nav__link ${active === i.href ? "nav__link--active" : ""}`} href={i.href} style={{ textDecoration: "none" }}>
                {t(`nav.${i.key}`, i.key)}
              </a>
            ))}
          </div>

          <button className="langSwitch" onClick={toggleLang} aria-label={lang === "ru" ? "Switch to Uzbek" : "Переключить на русский"} title={lang === "ru" ? "UZ" : "RU"}>
            {lang === "ru" ? "UZ" : "RU"}
          </button>

          <button
            className="themeSwitch"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? (lang === "uz" ? "Yorug‘ mavzuni yoqish" : "Включить светлую тему") : (lang === "uz" ? "Qorong‘i mavzuni yoqish" : "Включить тёмную тему")}
            title={theme === "dark" ? (lang === "uz" ? "Yorug‘ mavzu" : "Светлая тема") : (lang === "uz" ? "Qorong‘i mavzu" : "Тёмная тема")}
          >
            <img src={theme === "dark" ? moonGif : sunGif} alt="" width={20} height={20} loading="eager" draggable={false} />
          </button>

          <a className="cta cta--nav" href="#contact" style={{ textDecoration: "none" }}>{t("cta.nav")}</a>

          <button
            className="burger"
            onClick={toggleMenu}
            aria-label={menuOpen ? (lang === "uz" ? "Menyuni yopish" : "Закрыть меню") : (lang === "uz" ? "Menyuni ochish" : "Открыть меню")}
            title={menuOpen ? "Close" : "Menu"}
          >
            {!menuOpen ? (
              <img className="burger__gif" src={burgerGif} alt="" width={24} height={24} />
            ) : (
              <span className="burger__close" aria-hidden>✕</span>
            )}
          </button>
        </div>
      </nav>

      {/* Drawer */}
      <div className={`drawer ${menuOpen ? "drawer--open" : ""}`}>
        <div className="drawer__links">
          {nav.map(i => (
            <a key={i.href} className="drawer__link" href={i.href} onClick={closeMenu} style={{ textDecoration: "none" }}>
              {t(`nav.${i.key}`, i.key)}
            </a>
          ))}
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="hero">
        <video className="hero__bgVideo" autoPlay muted loop playsInline preload="auto" aria-hidden="true">
          <source src="/diagonal_v2.mp4" type="video/mp4" />
        </video>

        <div className="container hero__inner">
          <div className="hero__content">
            <h1 className="h1">
              {heroLines.map((line, idx) => (<span key={idx}>{line}{idx < heroLines.length - 1 && <><br/></>}</span>))}
            </h1>
            <p className="p" style={{ maxWidth: 680 }}>
              {t("hero.sub")}
            </p>
            <div className="hero__cta" style={{ marginTop: 28 }}>
              <a className="cta cta--mega" href="#contact">{t("hero.cta")}</a>
            </div>
            <p className="p" style={{ marginTop: 6, fontSize: 14, opacity: 0.8 }}>{t("hero.spots")}</p>
          </div>
        </div>
      </header>

      {/* ABOUT */}
      <section id="about" className="section withRouteBG route--about">
        <SectionRouteLines variant="about" />
        <div className="container routeContent">
          <h2 className="h2">{t("section.about")}</h2>
          <div style={{ color: "var(--mint)", marginTop: 6 }}><Bracket /></div>

          <div className="aboutGrid" style={{ marginTop: 14 }}>
            <div className="about__gallery" aria-label="UTL School — фото">
              <div className="about__img about__img--a" role="img" aria-label="Класс UTL School в Ташкенте"></div>
              <div className="about__img about__img--b" role="img" aria-label="Практика по логистике"></div>
              <div className="about__img about__img--c" role="img" aria-label="Команда и наставники"></div>
            </div>

            <div>
              <p className="p" style={{ maxWidth: 560 }}>
                <b>UTL School</b> — практическая <b>школа логистики в Ташкенте</b>. Проводим офлайн и онлайн
                <b> курсы по логистике</b>: международные перевозки, экспедирование, <b>ВЭД</b>, Incoterms,
                складская и транспортная логистика, работа с документами и сервисами.
                Учебный план построен на реальных кейсах UTL High Logistics, поэтому вы получаете
                не только теорию, но и навыки, которые применяются на работе уже завтра.
              </p>
              <p className="p" style={{ maxWidth: 560, marginTop: 8 }}>
                Что даём: записи занятий, проверки домашних заданий, карьерную поддержку и стажировку.
                После финального проекта — <b>сертификат</b> и помощь в трудоустройстве. Если вы ищете
                “<i>курсы логистики Ташкент</i>” или “<i>школа логистика Ташкент</i>” — вы по адресу.
              </p>
              <SeoInlineLinks lang={lang} />
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="courses" className="section section--soft">
        <div className="container">
          <h2 className="h2">{t("section.courses")}</h2>
          <div style={{ color: "var(--mint)", marginTop: 6 }}><Bracket /></div>

          <div className="pricing">
            {/* Быстрый старт */}
            <article className="plan">
              <div className="plan__head">
                <span className="kicker">{lang === "uz" ? "Tarif" : "Тариф"}</span>
                <h3 className="plan__title">{lang === "uz" ? "Tez start" : "Быстрый старт"}</h3>
                <div className="price">
                  <span className="price__now">{lang === "uz" ? "1 oy" : "1 мес"}</span>
                  <span className="price__label">{lang === "uz" ? "11 ta jonli dars" : "11 живых занятий"}</span>
                </div>
                <div className="plan__badges">
                  <span className="badge">{lang === "uz" ? "Dars yozuvlari" : "Записи занятий"}</span>
                  <span className="badge">{lang === "uz" ? "4 hafta qo‘llab-quvvatlash" : "Поддержка 4 нед"}</span>
                </div>
              </div>

              <ul className="features">
                <li>{lang === "uz" ? "Real mini-keýslar bo‘yicha amaliyot" : "Практика на реальных mini-кейcах"}</li>
                <li>{lang === "uz" ? "Kuratordan oqim chati" : "Общий чат потока с наставником"}</li>
                <li>{lang === "uz" ? "Yakuniy sertifikat" : "Сертификат по итогам"}</li>
              </ul>

              <div className="plan__foot">
                <a className="cta plan__cta" href="#contact" style={{ textDecoration: "none" }}>
                  {t("cta.enroll")}
                </a>
                <div className="note">
                  {lang === "uz" ? "Bo‘lib-bo‘lib to‘lash mumkin" : "Рассрочка доступна"}
                </div>
              </div>
            </article>

            {/* Погружение */}
            <article className="plan">
              <div className="plan__head">
                <span className="kicker">{lang === "uz" ? "Tarif" : "Тариф"}</span>
                <h3 className="plan__title">{lang === "uz" ? "Chuqur o‘rganish" : "Погружение"}</h3>
                <div className="price">
                  <span className="price__now">{lang === "uz" ? "5 hafta" : "5 нед"}</span>
                  <span className="price__label">
                    {lang === "uz" ? "11 jonli dars + yordam" : "11 живых занятий + поддержка"}
                  </span>
                </div>
                <div className="plan__badges">
                  <span className="badge">{lang === "uz" ? "3 ta bonus-dars" : "3 бонус-урока"}</span>
                  <span className="badge">{lang === "uz" ? "Guruh bo‘yicha tahlil" : "Групповой разбор"}</span>
                </div>
              </div>

              <ul className="features">
                <li>{lang === "uz" ? "Rollar bo‘yicha real vaziyatlar tahlili" : "Разбор реальных ситуаций по ролям"}</li>
                <li>{lang === "uz" ? "Yuk/transport qidirish bazalariga kirish" : "Доступ к базам для поиска грузов/транспорта"}</li>
                <li>{lang === "uz" ? "Uy vazifalari tekshiruvi + fikr-mulohaza" : "Домашки с проверкой + обратная связь"}</li>
              </ul>

              <div className="plan__foot">
                <a className="cta plan__cta" href="#contact" style={{ textDecoration: "none" }}>
                  {t("cta.take_seat")}
                </a>
                <div className="note">
                  {lang === "uz" ? "Bo‘lib-bo‘lib to‘lash mumkin" : "Рассрочка доступна"}
                </div>
              </div>
            </article>

            {/* Премиум */}
            <article className="plan plan--featured">
              <span className="plan__ribbon">{lang === "uz" ? "Ommabop" : "Популярный"}</span>
              <div className="plan__head">
                <span className="kicker">{lang === "uz" ? "Tarif" : "Тариф"}</span>
                <h3 className="plan__title">Премиум</h3>
                <div className="price">
                  <span className="price__now">{lang === "uz" ? "5 hafta" : "5 нед"}</span>
                  <span className="price__label">{lang === "uz" ? "12 ta dars + karyera" : "12 занятий + карьера"}</span>
                </div>
                <div className="plan__badges">
                  <span className="badge">{lang === "uz" ? "Amaliyot" : "Стажировка"}</span>
                  <span className="badge">{lang === "uz" ? "Karyera yo‘li" : "Карьерный трек"}</span>
                </div>
              </div>

              <ul className="features">
                <li>{lang === "uz" ? "UTL real yuklari bilan ishlash" : "Работа с реальными грузами UTL"}</li>
                <li>{lang === "uz" ? "Kuchli rezume tayyorlash" : "Создание сильного резюме"}</li>
                <li>{lang === "uz" ? "Suhbatlarga tayyorlash" : "Подготовка к собеседованиям"}</li>
              </ul>

              <div className="plan__foot plan__foot--split">
                <a className="cta plan__cta" href="#contact" style={{ textDecoration: "none" }}>
                  {t("cta.premium")}
                </a>
                <div className="note note--right">
                  {lang === "uz"
                    ? "Bo‘lib-bo‘lib to‘lash mumkin va shaxsiy yordamchi 24/7"
                    : "Рассрочка доступна и личный помощник 24/7"}
                </div>
              </div>
            </article>
          </div>

          {/* Social proof */}
          <div className="proof">
            <div className="proof__row">
              <div className="proof__card">
                <div className="stars" aria-label="Рейтинг 4.9 из 5">
                  <svg viewBox="0 0 24 24" className="star-svg star--full"><path d="M12 2l2.9 6.7 7.1.6-5.3 4.6 1.7 6.9L12 17.7 5.6 20.8l1.7-6.9L2 9.3l7.1-.6L12 2z"/></svg>
                  <svg viewBox="0 0 24 24" className="star-svg star--full"><path d="M12 2l2.9 6.7 7.1.6-5.3 4.6 1.7 6.9L12 17.7 5.6 20.8l1.7-6.9L2 9.3l7.1-.6L12 2z"/></svg>
                  <svg viewBox="0 0 24 24" className="star-svg star--full"><path d="M12 2l2.9 6.7 7.1.6-5.3 4.6 1.7 6.9L12 17.7 5.6 20.8l1.7-6.9L2 9.3l7.1-.6L12 2z"/></svg>
                  <svg viewBox="0 0 24 24" className="star-svg star--full"><path d="M12 2l2.9 6.7 7.1.6-5.3 4.6 1.7 6.9L12 17.7 5.6 20.8l1.7-6.9L2 9.3l7.1-.6L12 2z"/></svg>
                  <span className="star-masked" style={{ '--fill': '96%' }} aria-hidden="true"></span>
                </div>
                <div className="proof__label">{t("proof.rating")}</div>
              </div>

              <div className="proof__card">
                <div className="avatars">
                  <img src="/src/assets/ava1.webp" alt="" />
                  <img src="/src/assets/ava2.jpg" alt="" />
                  <img src="/src/assets/ava3.jpg" alt="" />
                  <img src="/src/assets/ava4.jpg" alt="" />
                  <span className="avatars__more">+150</span>
                </div>
                <div className="proof__label">{t("proof.alumni")}</div>
              </div>

              <div className="proof__card proof__card--guard">
                <div className="guardRow">
                  <div className="payIcons">
                    <img className="payIcon" src="/src/assets/uzcard.jpg" alt="Uzcard" />
                    <img className="payIcon" src="/src/assets/humo.png" alt="Humo" />
                    <img className="payIcon" src="/src/assets/Visa.png" alt="Visa" />
                    <img className="payIcon" src="/src/assets/mastercard.png" alt="Mastercard" />
                  </div>
                  <div className="proof__label guardText">{t("proof.guarantee")}</div>
                </div>
                <div className="pay"><span className="pay__tag">Uzcard</span><span className="pay__tag">Humo</span><span className="pay__tag">Visa</span><span className="pay__tag">Mastercard</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW */}
      <section id="how" ref={howRef} className="section section--soft how">
        <div className="container">
          <h2 className="h2">{t("section.how")}</h2>
          <div style={{ color: "var(--mint)", marginTop: 6 }}><Bracket /></div>
        </div>

        <div className="container howGrid" style={{ marginTop: 14 }}>
          <div className="stepList" ref={stepsRef}>
            {howSteps.map((s, i) => (
              <button key={s.key} type="button" className={`stepBtn ${howIdx === i ? "active" : ""}`} onClick={() => setHowIdx(i)}>
                <div className="stepIndex">{i + 1}</div>
                <div className="stepTitle">{s.title}</div>
              </button>
            ))}
          </div>

          <div className={`sceneWrap ${howIdx === 0 ? "sceneWrap--plain" : ""} ${howIdx === 1 ? "sceneWrap--tight" : ""}`}>
            <div className="fadeWrap">
              {/* step 1 */}
              <div className={`fadeScene ${howIdx === 0 ? "active" : ""}`}>
                <div className="scene">
                  <div className="signupVideo">
                    <video key={howIdx === 0} src="/registration_v8.mp4" autoPlay loop muted playsInline preload="auto" />
                  </div>
                </div>
              </div>

              {/* step 2 */}
              <div className={`fadeScene ${howIdx === 1 ? "active" : ""}`}>
                <div className="scene">
                  <div className="dual dual--compact">
                    <div className="format">
                      <div className="format__frame">
                        <svg viewBox="0 0 360 260" className="format__svg format__svg--offline" preserveAspectRatio="xMidYMid meet">
                          <defs><linearGradient id="mintSoft" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="var(--mint)" stopOpacity="0.35" /><stop offset="1" stopColor="var(--mint)" stopOpacity="0.15" /></linearGradient></defs>
                          <rect x="70" y="36" width="260" height="200" rx="14" fill="url(#mintSoft)" stroke="var(--mint)" strokeOpacity="0.6" />
                          <g fill="none" stroke="var(--mint)" strokeWidth="4" strokeLinecap="round">
                            <path d="M100 70 H300" opacity="0.85"><animate attributeName="stroke-dasharray" from="0,240" to="240,0" dur="0.9s" fill="freeze" /></path>
                            <path d="M100 96 H260" opacity="0.65"><animate attributeName="stroke-dasharray" begin="0.2s" from="0,200" to="200,0" dur="0.9s" fill="freeze" /></path>
                            <path d="M100 122 H240" opacity="0.55"><animate attributeName="stroke-dasharray" begin="0.35s" from="0,180" to="180,0" dur="0.9s" fill="freeze" /></path>
                            <path d="M120 150 L160 130 L200 142 L240 118" opacity="0.85"><animate attributeName="stroke-dasharray" begin="0.6s" from="0,160" to="160,0" dur="0.9s" fill="freeze" /></path>
                          </g>
                          <g transform="translate(30,80)">
                            <circle cx="36" cy="16" r="12" fill="#0f1e1d" />
                            <rect x="20" y="30" width="32" height="54" rx="10" fill="#111317" />
                            <g transform="translate(36,44)">
                              <line x1="0" y1="0" x2="64" y2="-26" stroke="var(--mint)" strokeWidth="6" strokeLinecap="round">
                                <animate attributeName="x2" values="64; 110; 90; 130; 64" keyTimes="0; .25; .45; .7; 1" dur="2.2s" repeatCount="indefinite" />
                                <animate attributeName="y2" values="-26; -10; -30; -40; -26" keyTimes="0; .25; .45; .7; 1" dur="2.2s" repeatCount="indefinite" />
                              </line>
                              <circle r="5" fill="var(--mint)">
                                <animate attributeName="cx" values="64; 110; 90; 130; 64" keyTimes="0; .25; .45; .7; 1" dur="2.2s" repeatCount="indefinite" />
                                <animate attributeName="cy" values="-26; -10; -30; -40; -26" keyTimes="0; .25; .45; .7; 1" dur="2.2s" repeatCount="indefinite" />
                              </circle>
                            </g>
                          </g>
                        </svg>
                      </div>
                      <div className="format__label">{lang === "uz" ? "Oflayn" : "Оффлайн"}</div>
                    </div>

                    <div className="format">
                      <div className="format__frame format__card" style={{ transform: "scale(.86)" }}>
                        <div className="format__badge">ZOOM</div>
                        <div className="format__dots"><span/><span/><span/></div>
                      </div>
                      <div className="format__label">{lang === "uz" ? "Onlayn" : "Онлайн"}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* step 3 */}
              <div className={`fadeScene ${howIdx === 2 ? "active" : ""}`}>
                <div className="scene scene--split">
                  <div className="logiAura" aria-hidden />
                  <div className="logiSplit">
                    <div className="logiPhoto" style={{ backgroundImage: "url('/src/assets/lighttg.jpg')" }} aria-label="Фото рейса">
                      <div className="photoBadge">UTL</div>
                    </div>
                    <ul className="logiChat" aria-live="polite">
                      <li className="bubble in"  style={{ "--d": "0s" }}>{lang === "uz" ? "Moskva — Toshkent · " : "Москва — Ташкент · "}<b>$4 200</b> · 22 т</li>
                      <li className="bubble out" style={{ "--d": ".35s" }}>{lang === "uz" ? "Olmaota — Samarqand · " : "Алматы — Самарканд · "}<b>$2 800</b> · 18 т</li>
                      <li className="bubble in"  style={{ "--d": ".7s" }}>{lang === "uz" ? "Istanbul — Toshkent · " : "Стамбул — Ташкент · "}<b>$5 100</b> · 20 т</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* step 4 */}
              <div className={`fadeScene ${howIdx === 3 ? "active" : ""}`}>
                <div className="scene">
                  <div className="certificateCard">
                    <img src="/src/assets/certificate2.png" alt={lang === "uz" ? "Davlat namunasi sertifikati" : "Сертификат государственного образца"} />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="benefits" className="benefits-bleed-full">
        <h2 className="h2 benefits__mobileTitle">{t("section.benefits")}</h2>
        <div className="benefitsCircleScene">
          <div className={`benefitsCore ${benefitsCta ? "show-cta" : ""}`}>
            <div className="benefitsCore__ring" />
            <div className="benefitsCore__text">{t("section.benefits")}</div>
            <a href="#contact" className="cta benefitsCore__button">{t("cta.enroll")}</a>
          </div>

          {benefitsData.map((b, i) => (
            <div key={i} className={`benefitCard radial n${i + 1}`}>
              <video className="tileFx" src="/src/assets/vector.mp4" muted loop autoPlay playsInline preload="auto" />
              <BgIcon type={b.icon} />
              <div className="benefitCard__content">
                <div className="benefitCard__head">
                  <span className="benefitCard__icon"><IconCheck /></span>
                  <div className="benefitCard__title">{b.t}</div>
                </div>
                <div className="benefitCard__text">{b.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="section">
        <div className="container">
          <h2 className="h2">{t("section.testimonials")}</h2>
          <div ref={scrollRef} className="scroll-x carousel" style={{ marginTop: 6 }}>
            {testimonials.map((tst, i) => (
              <div key={i} className={`card tcard ${tst.videoId ? "tcard--video" : ""}`}>
                <div className="card__tag">{tst.tag}</div>

                {tst.videoId ? (
                  <a
                    href={`https://youtu.be/${tst.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "block", borderRadius: 12, overflow: "hidden", marginTop: 8 }}
                    aria-label="Открыть видео-отзыв на YouTube"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${tst.videoId}/hqdefault.jpg`}
                      alt="Видео-отзыв"
                      style={{ width: "100%", height: "auto", display: "block" }}
                      loading="lazy"
                    />
                  </a>
                ) : (
                  <>
                    <p className="p" style={{ marginTop: 6, minHeight: 72 }}>«{tst.text}»</p>
                    <div className="testimonial__name">{tst.name}</div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section faqWrap withRouteBG">
        <SectionRouteLines variant="faq" />
        <div className="container routeContent">
          <h2 className="h2">{t("section.faq")}</h2>

          <div className="faqGrid" style={{ marginTop: 12 }}>
            {/* LEFT */}
            <div>
              {i18n[lang].faq.map(([q, a], i) => (
                <details key={i} className="faqItem">
                  <summary>
                    <span className="faqIcon">
                      <img src="/src/assets/icons8-faq.gif" alt="" className="ico ico--faq" loading="lazy" />
                      <img src="/src/assets/icons8-info.gif" alt="" className="ico ico--info" loading="lazy" />
                    </span>
                    {q}
                  </summary>
                  <p className="p" style={{ marginTop: 6, color: "#111" }}>{a}</p>
                </details>
              ))}
            </div>

            {/* RIGHT: aside */}
            <aside className="faqAside faqAside--alt faqAside--slim">
              <h3 className="faqAside__title">
                {lang === "uz" ? "Logistikadan daromad — 4–8 haftada" : "Доход в логистике — за 4–8 недель"}
              </h3>

              <div className="promoStat promoStat--compact">
                <div className="promoStat__num">98%</div>
                <div className="promoStat__text">
                  {lang === "uz"
                    ? "muntazam amaliyot qilganlar 1–3 oyda o‘qish xarajatini qoplaydi"
                    : "кто регулярно практикуется — окупают обучение за 1–3 месяца"}
                </div>
              </div>

              <p className="p promoLead promoLead--small">
                {lang === "uz" ? (
                  <>Noldan birinchi buyurtmalargacha — real keýslar, mentor va aniq yo‘l xaritasi.
                    Mehnat qilganlar daromadga <span className="gold">8–15 mln so‘m/oy</span> va undan yuqori darajada chiqishmoqda.</>
                ) : (
                  <>От нуля до первых заказов — реальные кейсы, наставник и пошаговый план.
                    Те, кто делают практику, выходят на доход <span className="gold">8–15 млн сум/мес</span> и выше.</>
                )}
              </p>

              <ul className="seoList seoList--compact">
                {lang === "uz" ? (
                  <>
                    <li>Quruq nazariyasiz — ishda to‘g‘ridan-to‘g‘ri kerak bo‘ladigan ko‘nikmalar.</li>
                    <li>VЭD, Incoterms, ombor va transport logistikasi — modul bo‘lib.</li>
                    <li>Portfel, rezyume, intervyuga tayyorgarlik va stajirovka.</li>
                  </>
                ) : (
                  <>
                    <li>Никакой воды — только навыки, за которые платят.</li>
                    <li>ВЭД, Incoterms, складская и транспортная логистика — по модулям.</li>
                    <li>Портфолио, резюме, подготовка к собеседованиям и стажировка.</li>
                  </>
                )}
              </ul>

              <div className="promoUrgency">
                <div className="moneyBadge">{lang === "uz" ? "Chegirma" : "Выгода"}</div>
                <div className="promoUrgency__text">
                  {lang === "uz"
                    ? "Ushbu haftada ro‘yxat yopiladi. O‘rinlar cheklangan."
                    : "Набор этой недели закрываем по заполнении — мест немного."}
                </div>
              </div>

              <div className="promoCTA">
                <a href="#contact" className="cta cta--mega cta--compact">
                  {lang === "uz" ? "Hoziroq ro‘yxatdan o‘ting" : "Записаться сейчас"}
                </a>
                <div className="note">
                  {lang === "uz"
                    ? "*Natijalar amaliyot hajmiga bog‘liq."
                    : "*Результаты зависят от объёма практики."}
                </div>
              </div>

              <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #d9ece9", marginTop: 14 }}>
                <img src="/src/assets/route-card.png" alt="" style={{ width: "100%", display: "block" }} loading="lazy" />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section section--soft">
        <div className="container">
          <h2 className="h2">{t("section.contact")}</h2>
          <div style={{ color: "var(--mint)", marginTop: 6 }}><Bracket /></div>

          <form onSubmit={submitLead} className="grid grid--2" style={{ marginTop: 12 }}>
            <div className="card">
              <label className="p">{t("form.name")}</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={lang === "uz" ? "Ismingiz" : "Ваше имя"} style={inputStyle} />
            </div>

            <div className="card">
              <label className="p">{t("form.phone")}</label>
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+998 xx xxx xx xx" style={inputStyle} />
            </div>

            <div className="card" style={{ gridColumn: "1 / -1" }}>
              <label className="p">{t("form.tg")}</label>
              <input value={form.telegram || ""} onChange={(e) => setForm({ ...form, telegram: e.target.value })} placeholder="@username" style={inputStyle} />
            </div>

            <div className="card" style={{ gridColumn: "1 / -1" }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} />
                <span className="p">{t("form.consent")}</span>
              </label>
            </div>

            <div className="formActions formActions--right" style={{ gridColumn: "1 / -1" }}>
              <button className="cta" disabled={sending}>{sending ? t("form.sending") : t("form.submit")}</button>
              {ok && <span className="p hintOk">{t("form.ok")}</span>}
            </div>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer__inner">
          <div className="footer__left">
            <div className="footer__map">
              <a className="mapBadge" href="https://yandex.ru/maps/org/utl_school/84454493019/" target="_blank" rel="noopener noreferrer">
                {t("footer.address_city")}
              </a>
              <iframe src="https://yandex.uz/map-widget/v1/?um=constructor%3A2a74d4e88a98fa6eaa3fa3a2f33cfa49e33b3bfb05f3db59f351c7b0197c3a45&source=constructor" width="100%" height="100%" frameBorder="0" title="UTL School Location"></iframe>
            </div>
            <p className="footer__address">{t("footer.address_city")}<br/>{t("footer.address_hint")}</p>
          </div>

          <div className="footer__right">
            <div className="footer__contacts">
              <h3 className="footer__title">{t("footer.contact_us")}</h3>
              <div className="footer__links">
                <a href="https://t.me/UTLschool_bot" target="_blank" rel="noopener noreferrer" className="footer__icon tg" aria-label="Telegram">
                  <svg viewBox="0 0 24 24"><path d="M9.9 17.2l-.4 5.6c.6 0 .9-.3 1.3-.6l3-2.8 6.2 4.5c1.1.6 1.8.3 2.1-1l3.8-17.8c.4-1.5-.6-2.2-1.7-1.8L1.7 10.2c-1.6.6-1.6 1.5-.3 2l6.1 1.9L19.7 6c.6-.4 1.2-.2.7.2"></path></svg>
                </a>
                <a href="https://www.instagram.com/utlschool?igsh=MTVwNGlrb3d2NTR6Ng==" target="_blank" rel="noopener noreferrer" className="footer__icon ig" aria-label="Instagram">
                  <svg viewBox="0 0 24 24"><path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-3.9-3.1-7-7-7H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3.5A5.5 5.5 0 0012 16a5.5 5.5 0 000-11zm0 2a3.5 3.5 0 110 7 3.5 3.5 0 010-7zm4.8-.9a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0z"></path></svg>
                </a>
                <a href="https://www.google.com/maps/place/Саида+Барака+18,+Ташкент" target="_blank" rel="noopener noreferrer" className="footer__icon gm" aria-label="Google Maps">
                  <svg viewBox="0 0 24 24"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z"></path></svg>
                </a>
              </div>
              <div className="footer__phone"><a href="tel:+998901234567">{t("footer.phone")}</a></div>
              <div className="footer__legal">© 2024-{new Date().getFullYear()} UTL School</div>
            </div>
          </div>
        </div>
      </footer>

      {/* FAB */}
      <div className="fab">
        <a className="cta" href="#contact" style={{ textDecoration: "none" }}>{t("cta.nav")}</a>
        <div style={{ height: 8 }} />
        <a className="cta cta--ghost" href="tel:+998901234567" style={{ textDecoration: "none" }}>{t("cta.contact_call")}</a>
      </div>
    </>
  );
}
