import { useEffect, useRef, useState } from "react";
import { IconCheck, IconBook, Bracket } from "./icons.jsx";
import SectionRouteLines from "./SectionRouteLines.jsx";
import sunGif from "/src/assets/theme-sun.gif";
import moonGif from "/src/assets/theme-moon.gif";

/* ================= I18N (RU / UZ) ================= */
const i18n = {
  ru: {
    nav: {
      hero: "Главная",
      about: "О школе",
      courses: "Курсы",
      benefits: "Почему мы",
      teachers: "Преподаватели",
      testimonials: "Отзывы",
      faq: "FAQ",
      contact: "Контакты",
    },
    hero: {
      titleLines: [
        "Стань профессионалом",
        "в логистике за 1 месяц",
        "с UTL School",
      ],
      sub: "Онлайн и офлайн обучение. Реальные заказы, практика, сертификат и помощь в трудоустройстве.",
      cta: "Записаться на бесплатный урок",
      spots: "Места ограничены — набор на текущий поток открыт.",
    },
    section: {
      about: "О школе",
      courses: "Тарифы",
      benefits: "Почему выбирают нас",
      testimonials: "Отзывы студентов",
      how: "Как проходит обучение",
      faq: "FAQ",
      contact: "Оставить заявку",
    },
    cta: {
      nav: "Записаться",
      contact_call: "Позвонить",
      premium: "Хочу Премиум",
      take_seat: "Взять место на потоке",
      enroll: "Записаться",
    },
    proof: {
      rating: "4.9/5 по отзывам студентов",
      alumni: "Выпускники уже в логистических компаниях",
      guarantee: "7 дней гарантия возврата · Безопасная оплата",
    },
    form: {
      name: "Имя",
      phone: "Телефон",
      tg: "Telegram (опционально)",
      consent: "Согласен на обработку персональных данных",
      submit: "Получить консультацию",
      sending: "Отправляем…",
      ok: "Спасибо! Мы свяжемся с вами.",
    },
    faq: [
      ["Сколько длится обучение?", "Обычно 4 недели, 3 занятия в неделю."],
      ["Можно ли учиться онлайн?", "Да, полная онлайн-поддержка, записи занятий."],
      ["Вы помогаете с трудоустройством?", "Да, помогаем с резюме, готовим к интервью."],
    ],
    footer: {
      contact_us: "Свяжитесь с нами",
      call: "Позвонить",
      address_city: "г. Ташкент, ул. Саида Барака, 18",
      address_hint: "ориентир: РУВД, метро Ташкент",
      phone: "+998 (90) 123-45-67",
    },
    benefits: [
      {
        t: "Сертификат",
        d: "Сертификат государственного образца после обучения",
        icon: "award",
      },
      {
        t: "Поддержка",
        d: "Поддержка педагога-логиста с многолетним стажем",
        icon: "support",
      },
      {
        t: "Стажировка",
        d: "Гарантированная стажировка в логистической компании UTL High Logistics",
        icon: "briefcase",
      },
      {
        t: "Практика и заработок",
        d: "Учебная практика на реальных заказах + первые выплаты во время обучения",
        icon: "money",
      },
    ],
  },
  uz: {
    nav: {
      hero: "Bosh sahifa",
      about: "Maktab haqida",
      courses: "Kurslar",
      benefits: "Nega biz",
      teachers: "O‘qituvchilar",
      testimonials: "Sharhlar",
      faq: "FAQ",
      contact: "Kontaktlar",
    },
    hero: {
      titleLines: [
        "1 oyda logistika bo‘yicha",
        "mutaxassis bo‘ling",
        "UTL School bilan",
      ],
      sub: "Onlayn va oflayn ta’lim. Real buyurtmalar, amaliyot, sertifikat va ishga joylashishda ko‘mak.",
      cta: "Bepul darsga yozilish",
      spots: "Joylar cheklangan — joriy oqimga qabul ochiq.",
    },
    section: {
      about: "Maktab haqida",
      courses: "Tariflar",
      benefits: "Nega bizni tanlashadi",
      testimonials: "Talabalar fikrlari",
      how: "O‘qish qanday o‘tadi",
      faq: "FAQ",
      contact: "Ariza qoldirish",
    },
    cta: {
      nav: "Yozilish",
      contact_call: "Qo‘ng‘iroq qilish",
      premium: "Premium istayman",
      take_seat: "Oqimdan joy olish",
      enroll: "Yozilish",
    },
    proof: {
      rating: "Talabalar bahosi: 4.9/5",
      alumni: "Bitiruvchilar logistika kompaniyalarida ishlamoqda",
      guarantee: "7 kun qaytarish kafolati · Xavfsiz to‘lov",
    },
    form: {
      name: "Ism",
      phone: "Telefon",
      tg: "Telegram (ixtiyoriy)",
      consent: "Shaxsiy ma’lumotlarni qayta ishlashga roziman",
      submit: "Konsultatsiya olish",
      sending: "Yuborilmoqda…",
      ok: "Rahmat! Siz bilan bog‘lanamiz.",
    },
    faq: [
      ["Ta’lim qancha davom etadi?", "Odatda 4 hafta, haftasiga 3 ta dars."],
      ["Onlayn o‘qish mumkinmi?", "Ha, to‘liq onlayn qo‘llab-quvvatlash, dars yozuvlari bor."],
      ["Ishga joylashishda yordam berasizmi?", "Ha, rezume tayyorlash va suhbatlarga tayyorlaymiz."],
    ],
    footer: {
      contact_us: "Biz bilan bog‘laning",
      call: "Qo‘ng‘iroq qilish",
      address_city: "Toshkent sh., Said Baraka ko‘ch., 18",
      address_hint: "mo‘ljal: RUVB, Toshkent metro",
      phone: "+998 (90) 123-45-67",
    },
    benefits: [
      {
        t: "Sertifikat",
        d: "Ta’lim yakunida davlat namunasi sertifikati",
        icon: "award",
      },
      {
        t: "Qo‘llab-quvvatlash",
        d: "Ko‘p yillik tajribaga ega logist-pedagog yordami",
        icon: "support",
      },
      {
        t: "Amaliyot",
        d: "UTL High Logistics kompaniyasida kafolatlangan amaliyot",
        icon: "briefcase",
      },
      {
        t: "Amaliyot va daromad",
        d: "Real buyurtmalarda o‘quv amaliyoti + o‘qish vaqtida ilk to‘lovlar",
        icon: "money",
      },
    ],
  },
  
};

/* ================= THEME ================= */
const getInitialTheme = () => {
  try {
    const saved = localStorage.getItem("utl-theme");
    if (saved === "dark" || saved === "light") return saved;
  } catch {}
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
  return prefersDark ? "dark" : "light";
};

/* ================= LANG ================= */
const getInitialLang = () => {
  try {
    const saved = localStorage.getItem("utl-lang");
    if (saved === "ru" || saved === "uz") return saved;
  } catch {}
  return "ru";
};

/* -------- helpers -------- */
const getPath = (obj, path) => path.split(".").reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : undefined), obj);

export default function App() {
  /* ===== THEME ===== */
  const [theme, setTheme] = useState(getInitialTheme);
  useEffect(() => {
    document.documentElement.classList.toggle("theme-dark", theme === "dark");
    try {
      localStorage.setItem("utl-theme", theme);
    } catch {}
  }, [theme]);
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  /* ===== LANG ===== */
  const [lang, setLang] = useState(getInitialLang);
  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    try {
      localStorage.setItem("utl-lang", lang);
    } catch {}
  }, [lang]);
  const t = (path, fallback) => {
    const val = getPath(i18n[lang], path);
    return (val ?? fallback ?? path);
  };
  const getArr = (path, fallback = []) => {
    const v = getPath(i18n[lang], path);
    return Array.isArray(v) ? v : fallback;
  };
  const toggleLang = () => setLang((l) => (l === "ru" ? "uz" : "ru"));

  // Навигация (href фиксируем, подписи берём из словаря)
  const nav = [
    { href: "#hero", key: "hero" },
    { href: "#about", key: "about" },
    { href: "#courses", key: "courses" },
    { href: "#benefits", key: "benefits" },
    { href: "#teachers", key: "teachers" },
    { href: "#testimonials", key: "testimonials" },
    // { href: "#faq", key: "faq" },
    { href: "#contact", key: "contact" },
  ];

  // Отзывы (для карусели) — тексты оставляем как в исходнике
  const testimonials = [
    { name: "Шухрат А.", tag: "Выпускник", text: "Нашёл работу через 3 недели после курса. Очень зашли практические задания!" },
    { name: "Мунира Ж.", tag: "Выпускница", text: "Структурировано, понятно и много практики. Наставник помог с резюме." },
    { name: "Дильшод К.", tag: "Выпускник", text: "Разобрался с ВЭД и инкотермс. На собеседовании было легко отвечать." },
    { name: "Севара Н.", tag: "Выпускница", text: "Кейсы на реальных заказах — огонь. Сейчас стажируюсь в логистической компании." },
    { name: "Отабек Т.", tag: "Выпускник", text: "Классная поддержка педагогов, всегда на связи и по делу." },
  ];

  // Полупрозрачные фоны-иконки одной стилистики (как было)
  function BgIcon({ type }) {
    const common = { fill: "none", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2 };
    return (
      <svg className="benefitBgIcon" viewBox="0 0 100 100" aria-hidden>
        {type === "money" && (
          <>
            <circle cx="60" cy="40" r="18" {...common} />
            <path d="M52 40h16M60 32v16" {...common} />
            <rect x="22" y="58" width="50" height="24" rx="6" {...common} />
            <path d="M28 70h12m14 0h12" {...common} />
          </>
        )}
        {type === "briefcase" && (
          <>
            <rect x="20" y="36" width="60" height="40" rx="8" {...common} />
            <path d="M20 54h60" {...common} />
            <rect x="38" y="26" width="24" height="10" rx="3" {...common} />
            <path d="M50 36v18" {...common} />
          </>
        )}
        {type === "clipboard" && (
          <>
            <rect x="26" y="22" width="48" height="56" rx="8" {...common} />
            <rect x="40" y="16" width="20" height="12" rx="4" {...common} />
            <path d="M34 40h32M34 50h28M34 60h20" {...common} />
          </>
        )}
        {type === "award" && (
          <>
            <circle cx="50" cy="38" r="16" {...common} />
            <path d="M42 32l8 8 12-12" {...common} />
            <path d="M42 56l-10 18 18-10 18 10-10-18" {...common} />
          </>
        )}
        {type === "support" && (
          <>
            <path d="M28 56v-6a22 22 0 0 1 44 0v6" {...common} />
            <rect x="20" y="56" width="16" height="18" rx="4" {...common} />
            <rect x="64" y="56" width="16" height="18" rx="4" {...common} />
            <path d="M42 80h16" {...common} />
          </>
        )}
      </svg>
    );
  }

  const benefitsData = i18n[lang].benefits;


  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", consent: false });
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("#hero");
  const [benefitsCta, setBenefitsCta] = useState(false); // для плавной смены текста на кнопку

  // refs
  const scrollRef = useRef(null);
  const scrollBy = (dx) => scrollRef.current?.scrollBy({ left: dx, behavior: "smooth" });

  // autoplay отзывов
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let paused = false;
    const GAP = 14;
    const STEP = () => (el.querySelector(".tcard")?.offsetWidth || 300) + GAP;
    const tick = () => {
      if (paused) return;
      const nearEnd = Math.ceil(el.scrollLeft + el.clientWidth + 2) >= el.scrollWidth;
      if (nearEnd) el.scrollTo({ left: 0, behavior: "auto" });
      else el.scrollBy({ left: STEP(), behavior: "smooth" });
    };
    const id = setInterval(tick, 3500);
    const onEnter = () => (paused = true);
    const onLeave = () => (paused = false);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("touchstart", onEnter, { passive: true });
    el.addEventListener("touchend", onLeave, { passive: true });
    return () => {
      clearInterval(id);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("touchstart", onEnter);
      el.removeEventListener("touchend", onLeave);
    };
  }, []);

  // scroll spy
  useEffect(() => {
    const sections = nav.map((i) => document.querySelector(i.href));
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive("#" + visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((s) => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // запуск "разлёта" круга + через ~1.8s меняем лейбл на CTA
  useEffect(() => {
    const scene = document.querySelector(".benefitsCircleScene");
    if (!scene) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          scene.classList.add("explode");
          setTimeout(() => setBenefitsCta(true), 1800);
          obs.unobserve(scene);
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(scene);
    return () => obs.disconnect();
  }, []);

  // показать .card-animate при появлении в вьюпорте
  useEffect(() => {
    const els = document.querySelectorAll(".card-animate");
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("card-visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((v) => !v);

  const submitLead = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.consent)
      return alert(lang === "uz" ? "Ism, telefon va rozilikni to‘ldiring" : "Заполните имя, телефон и дайте согласие");
    try {
      setSending(true);
      setOk(false);
      const r = await fetch("http://127.0.0.1:8000/api/leads/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          telegram: form.telegram || "",
          consent_personal_data: form.consent,
          utm_source: "",
          utm_medium: "",
          utm_campaign: "",
          utm_term: "",
          utm_content: "",
          referer: document.referrer || "",
        }),
      });
      if (!r.ok) throw new Error("fail");
      setOk(true);
      setForm({ name: "", phone: "", consent: false });
    } catch {
      alert(lang === "uz" ? "Yuborishda xatolik. Keyinroq urinib ko‘ring." : "Ошибка отправки. Попробуйте позже.");
    } finally {
      setSending(false);
    }
  };

  // HOW: state + автоциклер
  const howSteps = [
    { title: lang === "uz" ? "Ro‘yxatdan o‘tish va kirish darsi" : "Регистрация и вводный урок", key: "signup" },
    { title: lang === "uz" ? "Ta’lim: onlayn/oflayn + yozuvlar" : "Обучение: онлайн/офлайн + записи", key: "learn" },
    { title: lang === "uz" ? "UTL bilan real buyurtmalar" : "Реальные заказы с UTL", key: "orders" },
    { title: lang === "uz" ? "Sertifikat va karyera yordami" : "Сертификат и карьерная поддержка", key: "cert" },
  ];
  const [howIdx, setHowIdx] = useState(0);
  const [howPaused, setHowPaused] = useState(false);
  const howRef = useRef(null);
  const stepsRef = useRef(null);


  // Автопауза, если секция HOW вне вьюпорта
  useEffect(() => {
    const el = howRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      setHowPaused(!e.isIntersecting);
    }, { threshold: 0.25 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
  const apply = () => {
    const h = stepsRef.current?.offsetHeight;
    if (h && howRef.current) {
      howRef.current.style.setProperty("--how-left-h", `${h}px`);
    }
  };
  apply();
  window.addEventListener("resize", apply);
  return () => window.removeEventListener("resize", apply);
}, []);

  // Автопереключение шагов раз в 2.6 c (первый — 5s)
  useEffect(() => {
    if (howPaused) return;
    const delay = howIdx === 0 ? 5000 : 2600;
    const tmr = setTimeout(() => {
      setHowIdx((i) => (i + 1) % howSteps.length);
    }, delay);
    return () => clearTimeout(tmr);
  }, [howIdx, howPaused, howSteps.length]);

  const heroLines = getArr("hero.titleLines", []);

  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <div className="container nav__inner">
          <a href="#hero" className="brand"><span className="brand__logo" aria-hidden /></a>

          <div className="nav__links">
            {nav.map((i) => (
              <a
                key={i.href}
                className={`nav__link ${active === i.href ? "nav__link--active" : ""}`}
                href={i.href}
                style={{ textDecoration: "none" }}
              >
                {t(`nav.${i.key}`, i.key)}
              </a>
            ))}
          </div>

          {/* Lang switcher */}
          <button
            className="langSwitch"
            onClick={toggleLang}
            aria-label={lang === "ru" ? "Switch to Uzbek" : "Переключить на русский"}
            title={lang === "ru" ? "UZ" : "RU"}
          >
            {lang === "ru" ? "UZ" : "RU"}
          </button>

          {/* Theme switcher */}
          <button
            className="themeSwitch"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? (lang === "uz" ? "Yorug‘ mavzuni yoqish" : "Включить светлую тему") : (lang === "uz" ? "Qorong‘i mavzuni yoqish" : "Включить тёмную тему")}
            title={theme === "dark" ? (lang === "uz" ? "Yorug‘ mavzu" : "Светлая тема") : (lang === "uz" ? "Qorong‘i mavzu" : "Тёмная тема")}
          >
            <img
              src={theme === "dark" ? moonGif : sunGif}
              alt=""
              width={20}
              height={20}
              loading="eager"
              draggable={false}
            />
          </button>

          <a className="cta" href="#contact" style={{ textDecoration: "none" }}>
            {t("cta.nav")}
          </a>

          <button className="burger" onClick={toggleMenu} aria-label={lang === "uz" ? "Menyuni ochish" : "Открыть меню"}>
            <span
              className="burger__bar"
              style={{ transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none" }}
            />
            <span className="burger__bar" style={{ opacity: menuOpen ? 0 : 1 }} />
            <span
              className="burger__bar"
              style={{ transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none" }}
            />
          </button>
        </div>
      </nav>

      {/* Drawer */}
      <div className={`drawer ${menuOpen ? "drawer--open" : ""}`}>
        <div className="drawer__links">
          {nav.map((i) => (
            <a
              key={i.href}
              className="drawer__link"
              href={i.href}
              onClick={closeMenu}
              style={{ textDecoration: "none" }}
            >
              {t(`nav.${i.key}`, i.key)}
            </a>
          ))}
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="hero">
        {/* Видео на фоне секции HERO */}
        <video
          className="hero__bgVideo"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/diagonal_v2.mp4" type="video/mp4" />
        </video>

        <div className="container hero__inner">
          <div className="hero__content">
            <h1 className="h1">
              {heroLines.map((line, idx) => (
                <span key={idx}>
                  {line}
                  {idx < heroLines.length - 1 && <><br /></>}
                </span>
              ))}
            </h1>
            <p className="p" style={{ maxWidth: 680 }}>
              {t("hero.sub")}
            </p>
            <div className="hero__cta" style={{ marginTop: 28 }}>
              <a className="cta cta--mega" href="#contact">{t("hero.cta")}</a>
            </div>
            <p className="p" style={{ marginTop: 6, fontSize: 14, opacity: 0.8 }}>
              {t("hero.spots")}
            </p>
          </div>
        </div>
      </header>

      {/* ABOUT */}
      <section id="about" className="section withRouteBG">
        <SectionRouteLines variant="about" />
        <div className="container routeContent">
          <div className="container">
            <h2 className="h2">{t("section.about")}</h2>
            <div style={{ color: "var(--mint)", marginTop: 6 }}>
              <Bracket />
            </div>
            <p className="p" style={{ maxWidth: 820 }}>
              {/* исходный абзац оставляем как есть */}
              UTL School — практическая школа будущих логистов в Узбекистане. Даем системные знания,
              учим работать с цепочками поставок, инкотермс, ВЭД и документами, и помогаем устроиться
              в компанию.
            </p>

            {/* Карточки с данными */}
            <div className="grid grid--3" style={{ marginTop: 18 }}>
              {[
                { t: lang === "uz" ? "1 oy" : "1 месяц", s: lang === "uz" ? "Haftasiga 3 ta dars" : "3 занятия в неделю" },
                { t: lang === "uz" ? "Formatlar" : "Форматы", s: lang === "uz" ? "Onlayn va oflayn" : "Онлайн и офлайн" },
                { t: lang === "uz" ? "Amaliyot" : "Практика", s: lang === "uz" ? "Real keýslar bo‘yicha vazifalar" : "Задачи на реальных кейсах" },
              ].map((x, i) => (
                <div key={i} className={`card card-animate card-delay-${i}`}>
                  <div className="card__tag">{x.t}</div>
                  <div className="card__title">{x.s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING / Тарифы */}
      <section id="courses" className="section section--soft withRouteBG">
        <div className="container routeContent">
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
                <li>{lang === "uz" ? "Real mini-keýslar bo‘yicha amaliyot" : "Практика на реальных мини-кейсах"}</li>
                <li>{lang === "uz" ? "Kuratordan oqim chati" : "Общий чат потока с наставником"}</li>
                <li>{lang === "uz" ? "Yakuniy sertifikat" : "Сертификат по итогам"}</li>
              </ul>

              <div className="plan__foot">
                <a className="cta" href="#contact" style={{ textDecoration: "none" }}>
                  {t("cta.enroll")}
                </a>
                <div className="note">{lang === "uz" ? "Bo‘lib-bo‘lib to‘lash mumkin" : "Рассрочка доступна"}</div>
              </div>
            </article>

            {/* Погружение */}
            <article className="plan">
              <div className="plan__head">
                <span className="kicker">{lang === "uz" ? "Tarif" : "Тариф"}</span>
                <h3 className="plan__title">{lang === "uz" ? "Chuqur o‘rganish" : "Погружение"}</h3>
                <div className="price">
                  <span className="price__now">{lang === "uz" ? "5 hafta" : "5 нед"}</span>
                  <span className="price__label">{lang === "uz" ? "11 jonli dars + yordam" : "11 живых занятий + поддержка"}</span>
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
                <a className="cta" href="#contact" style={{ textDecoration: "none" }}>
                  {t("cta.take_seat")}
                </a>
                <div className="note">
                  {lang === "uz" ? <>Yana <b>8</b> o‘rin · 7 kun kafolat</> : <>Осталось <b>8</b> мест · Гарантия возврата 7 дней</>}
                </div>
              </div>
            </article>

            {/* Премиум — featured + лента «Популярный» */}
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
                <a className="cta cta--mega cta--compact" href="#contact" style={{ textDecoration: "none" }}>
                  {t("cta.premium")}
                </a>
                <div className="note note--right">
                  {lang === "uz" ? "Joylar cheklangan · Individual yordam" : "Лимит мест · Индивидуальная поддержка"}
                </div>
              </div>
            </article>
          </div>

          {/* SOCIAL PROOF */}
          <div className="proof">
            <div className="proof__row">
              {/* Рейтинг */}
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

              {/* Аватарки + счётчик выпускников */}
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

              {/* Гарантия / безопасная оплата */}
              <div className="proof__card proof__card--guard">
                <div className="guardRow">
                  <div className="payIcons">
                    <img className="payIcon" src="/src/assets/uzcard.jpg" alt="Uzcard" />
                    <img className="payIcon" src="/src/assets/humo.png" alt="Humo" />
                    <img className="payIcon" src="/src/assets/Visa.png" alt="Visa" />
                    <img className="payIcon" src="/src/assets/mastercard.png" alt="Mastercard" />
                  </div>
                  <div className="proof__label guardText">
                    {t("proof.guarantee")}
                  </div>
                </div>
                <div className="pay">
                  <span className="pay__tag">Uzcard</span>
                  <span className="pay__tag">Humo</span>
                  <span className="pay__tag">Visa</span>
                  <span className="pay__tag">Mastercard</span>
                </div>
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
          {/* список шагов */}
          <div className="stepList" ref={stepsRef}>
            {howSteps.map((s, i) => (
              <button
                key={s.key}
                type="button"
                className={`stepBtn ${howIdx === i ? "active" : ""}`}
                onClick={() => setHowIdx(i)}
              >
                <div className="stepIndex">{i + 1}</div>
                <div className="stepTitle">{s.title}</div>
              </button>
            ))}
          </div>

          {/* сцены — режимы оболочки зависят от шага */}
          <div className={`sceneWrap ${howIdx === 0 ? "sceneWrap--plain" : ""} ${howIdx === 1 ? "sceneWrap--tight" : ""}`}>
            <div className="fadeWrap">
              {/* Шаг 1 — просто видео */}
              <div className={`fadeScene ${howIdx === 0 ? "active" : ""}`}>
                <div className="scene">
                  <div className="signupVideo">
                    <video
                      key={howIdx === 0}
                      src="/registration_v8.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                    />
                  </div>
                </div>
              </div>
{/* Шаг 2 — форматы обучения */}
<div className={`fadeScene ${howIdx === 1 ? "active" : ""}`}>
  <div className="scene">
    <div className="dual dual--compact">
      {/* Оффлайн */}
      <div className="format">
        <div className="format__frame">
          <svg viewBox="0 0 360 260" className="format__svg format__svg--offline" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="mintSoft" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="var(--mint)" stopOpacity="0.35" />
                <stop offset="1" stopColor="var(--mint)" stopOpacity="0.15" />
              </linearGradient>
            </defs>
            <rect x="70" y="36" width="260" height="200" rx="14"
                  fill="url(#mintSoft)" stroke="var(--mint)" strokeOpacity="0.6" />
            <g fill="none" stroke="var(--mint)" strokeWidth="4" strokeLinecap="round">
              <path d="M100 70 H300" opacity="0.85">
                <animate attributeName="stroke-dasharray" from="0,240" to="240,0" dur="0.9s" fill="freeze" />
              </path>
              <path d="M100 96 H260" opacity="0.65">
                <animate attributeName="stroke-dasharray" begin="0.2s" from="0,200" to="200,0" dur="0.9s" fill="freeze" />
              </path>
              <path d="M100 122 H240" opacity="0.55">
                <animate attributeName="stroke-dasharray" begin="0.35s" from="0,180" to="180,0" dur="0.9s" fill="freeze" />
              </path>
              <path d="M120 150 L160 130 L200 142 L240 118" opacity="0.85">
                <animate attributeName="stroke-dasharray" begin="0.6s" from="0,160" to="160,0" dur="0.9s" fill="freeze" />
              </path>
            </g>
            <g transform="translate(30,80)">
              <circle cx="36" cy="16" r="12" fill="#0f1e1d" />
              <rect x="20" y="30" width="32" height="54" rx="10" fill="#111317" />
              <g transform="translate(36,44)">
                <line x1="0" y1="0" x2="64" y2="-26"
                      stroke="var(--mint)" strokeWidth="6" strokeLinecap="round">
                  <animate attributeName="x2" values="64; 110; 90; 130; 64"
                           keyTimes="0; .25; .45; .7; 1" dur="2.2s" repeatCount="indefinite" />
                  <animate attributeName="y2" values="-26; -10; -30; -40; -26"
                           keyTimes="0; .25; .45; .7; 1" dur="2.2s" repeatCount="indefinite" />
                </line>
                <circle r="5" fill="var(--mint)">
                  <animate attributeName="cx" values="64; 110; 90; 130; 64"
                           keyTimes="0; .25; .45; .7; 1" dur="2.2s" repeatCount="indefinite" />
                  <animate attributeName="cy" values="-26; -10; -30; -40; -26"
                           keyTimes="0; .25; .45; .7; 1" dur="2.2s" repeatCount="indefinite" />
                </circle>
              </g>
            </g>
          </svg>
        </div>
        <div className="format__label">{lang === "uz" ? "Oflayn" : "Оффлайн"}</div>
      </div>

      {/* Онлайн */}
      <div className="format">
        <div className="format__frame format__card format__card--shrink">
          <div className="format__badge">ZOOM</div>
          <div className="format__dots">
            <span /><span /><span />
          </div>
        </div>
        <div className="format__label">{lang === "uz" ? "Onlayn" : "Онлайн"}</div>
      </div>
    </div>
  </div>
</div>



              <div className={`fadeScene ${howIdx === 2 ? "active" : ""}`}>
        <div className="scene scene--split">
          <div className="logiAura" aria-hidden />
          <div className="logiSplit">
            <div
              className="logiPhoto"
              style={{ backgroundImage: "url('/src/assets/lighttg.jpg')" }}
              aria-label="Фото рейса"
            >
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

      {/* Шаг 4 — сертификат (урезан до высоты левого блока) */}
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


      {/* BENEFITS — полноэкранный круг */}
      <section id="benefits" className="benefits-bleed-full">
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

      {/* TESTIMONIALS — автокарусель */}
      <section id="testimonials" className="section">
        <div className="container">
          <h2 className="h2">{t("section.testimonials")}</h2>
          <div ref={scrollRef} className="scroll-x carousel" style={{ marginTop: 6 }}>
  {[...testimonials, ...testimonials].map((tst, i) => (
    <div key={i} className="card tcard tcard--video">
      <div className="card__tag">{tst.tag}</div>
      <p className="p" style={{ marginTop: 6, minHeight: 72 }}>«{tst.text}»</p>
      <div className="testimonial__name">{tst.name}</div>
    </div>
  ))}
</div>

        </div>
      </section>

      

      {/* FAQ */}
      <section id="faq" className="section">
        <div className="container">
          <h2 className="h2">{t("section.faq")}</h2>
          {i18n[lang].faq.map(([q, a], i) => (
            <details key={i}>
              <summary>{q}</summary>
              <p className="p" style={{ marginTop: 6 }}>{a}</p>
            </details>
          ))}
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
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder={lang === "uz" ? "Ismingiz" : "Ваше имя"}
                style={inputStyle}
              />
            </div>

            <div className="card">
              <label className="p">{t("form.phone")}</label>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+998 xx xxx xx xx"
                style={inputStyle}
              />
            </div>

            <div className="card" style={{ gridColumn: "1 / -1" }}>
              <label className="p">{t("form.tg")}</label>
              <input
                value={form.telegram || ""}
                onChange={(e) => setForm({ ...form, telegram: e.target.value })}
                placeholder="@username"
                style={inputStyle}
              />
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

          {/* ЛЕВО: карта + адрес */}
          <div className="footer__left">
            <div className="footer__map">
              <a
                className="mapBadge"
                href="https://yandex.ru/maps/org/utl_school/84454493019/"
                target="_blank" rel="noopener noreferrer"
              >
                {t("footer.address_city")}
              </a>

              <iframe
                src="https://yandex.uz/map-widget/v1/?um=constructor%3A2a74d4e88a98fa6eaa3fa3a2f33cfa49e33b3bfb05f3db59f351c7b0197c3a45&source=constructor"
                width="100%" height="100%" frameBorder="0" title="UTL School Location"
              ></iframe>
            </div>

            <p className="footer__address">
              {t("footer.address_city")} <br />
              {t("footer.address_hint")}
            </p>
          </div>

          {/* ПРАВО: контакты */}
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

              <div className="footer__phone">
                <a href="tel:+998901234567">{t("footer.phone")}</a>
              </div>
              <div className="footer__legal">© 2024-{new Date().getFullYear()} UTL School</div>
            </div>
          </div>

        </div>
      </footer>

      {/* FAB мобилки */}
      <div className="fab">
        <a className="cta" href="#contact" style={{ textDecoration: "none" }}>{t("cta.nav")}</a>
        <div style={{ height: 8 }} />
        <a className="cta cta--ghost" href="tel:+998901234567" style={{ textDecoration: "none" }}>{t("cta.contact_call")}</a>
      </div>
    </>
  );
}

const inputStyle = {
  width: "100%",
  marginTop: 8,
  padding: "12px 14px",
  border: "1px solid #e6ebed",
  borderRadius: 12,
  fontSize: 16,
  outline: "none",
};
