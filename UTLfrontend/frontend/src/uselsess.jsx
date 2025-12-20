import { useEffect, useRef, useState } from "react";
import { IconCheck, IconBook, Bracket } from "./icons.jsx";

const nav = [
  { href: "#hero", label: "Главная" },
  { href: "#about", label: "О школе" },
  { href: "#courses", label: "Курсы" },
  { href: "#benefits", label: "Почему мы" },
  { href: "#teachers", label: "Преподаватели" },
  { href: "#testimonials", label: "Отзывы" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Контакты" },
];

export default function App() {
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", consent: false });
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("#hero");

  // slider ref
  const scrollRef = useRef(null);
  const scrollBy = (dx) => scrollRef.current?.scrollBy({ left: dx, behavior: "smooth" });

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

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((v) => !v);

  const submitLead = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.consent)
      return alert("Заполните имя, телефон и дайте согласие");
    try {
      setSending(true);
      setOk(false);
      const r = await fetch("http://127.0.0.1:8000/api/leads/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          consent_personal_data: form.consent,
        }),
      });
      if (!r.ok) throw new Error("fail");
      setOk(true);
      setForm({ name: "", phone: "", consent: false });
    } catch (e) {
      alert("Ошибка отправки. Попробуйте позже.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <div className="container nav__inner">
          <div className="brand">
            <span className="brand__logo" aria-hidden />
            UTL&nbsp;School
          </div>

          <div className="nav__links">
            {nav.map((i) => (
              <a
                key={i.href}
                className={`nav__link ${active === i.href ? "nav__link--active" : ""}`}
                href={i.href}
                style={{ textDecoration: "none" }} // без подчёркивания
              >
                {i.label}
              </a>
            ))}
          </div>

          <a className="cta" href="#contact" style={{ textDecoration: "none" }}>
            Записаться
          </a>

          {/* Burger only on mobile */}
          <button className="burger" onClick={toggleMenu} aria-label="Открыть меню">
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

      {/* Drawer mobile */}
      <div className={`drawer ${menuOpen ? "drawer--open" : ""}`}>
        <div className="drawer__links">
          {nav.map((i) => (
            <a
              key={i.href}
              className="drawer__link"
              href={i.href}
              onClick={closeMenu}
              style={{ textDecoration: "none" }} // без подчёркивания
            >
              {i.label}
            </a>
          ))}
          <a className="cta" href="#contact" onClick={closeMenu} style={{ textDecoration: "none" }}>
            Оставить заявку
          </a>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="hero">
        <div className="container">
          <span className="badge">С нуля до уверенного старта</span>
          <h1 className="h1">Стань профессионалом в логистике за 1 месяц</h1>
          <p className="p" style={{ maxWidth: 680 }}>
            Онлайн и офлайн обучение. Реальные кейсы, практика, сертификат и помощь в трудоустройстве.
          </p>
          <div className="badges">
            <span className="badge">Преподаватели-практики</span>
            <span className="badge">Кейсы реального бизнеса</span>
            <span className="badge">Сертификат</span>
            <span className="badge">Карьерная поддержка</span>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 10 }}>
            <a className="cta" href="#contact" style={{ textDecoration: "none" }}>
              Записаться на вводный урок
            </a>
            <a className="cta cta--ghost" href="#courses" style={{ textDecoration: "none" }}>
              Смотреть программу
            </a>
          </div>
          <p className="p" style={{ marginTop: 6, fontSize: 14, opacity: 0.8 }}>
            Места ограничены — набор на текущий поток открыт.
          </p>
        </div>
      </header>

      {/* ABOUT */}
      <section id="about" className="section">
        <div className="container">
          <h2 className="h2">О школе</h2>
          <div style={{ color: "var(--mint)", marginTop: 6 }}>
            <Bracket />
          </div>
          <p className="p" style={{ maxWidth: 820 }}>
            UTL School — практическая школа будущих логистов в Узбекистане. Даем системные знания, учим
            работать с цепочками поставок, инкотермс, ВЭД и документами, и помогаем устроиться в компанию.
          </p>
          <div className="grid grid--3" style={{ marginTop: 18 }}>
            {[
              { t: "1 месяц", s: "3 занятия в неделю" },
              { t: "Форматы", s: "Онлайн и офлайн" },
              { t: "Практика", s: "Задачи на реальных кейсах" },
            ].map((x, i) => (
              <div key={i} className="card">
                <div className="card__tag">{x.t}</div>
                <div className="card__title">{x.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section id="courses" className="section section--soft">
        <div className="container">
          <h2 className="h2">Курсы</h2>
          <div style={{ color: "var(--mint)", marginTop: 6 }}>
            <Bracket />
          </div>
          <div className="grid grid--3" style={{ marginTop: 16 }}>
            {[
              {
                name: "Логистика с нуля",
                text: "База: процессы, инкотермс, документы, работа с поставщиками.",
              },
              {
                name: "ВЭД-менеджер",
                text: "Импорт/экспорт, таможня, риски, логистические схемы.",
              },
              {
                name: "Практикум+Карьерный трек",
                text: "Решение кейсов + помощь с резюме и собеседованием.",
              },
            ].map((c, i) => (
              <article key={i} className="card">
                <div className="card__title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    className="course__icon"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: "var(--mint)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--mint-ink)",
                      fontWeight: 800,
                    }}
                    aria-hidden
                  >
                    <IconBook />
                  </span>
                  {c.name}
                </div>
                <p className="p">{c.text}</p>
                <div className="badges">
                  <span className="badge">1 мес.</span>
                  <span className="badge">3 занятия/нед</span>
                  <span className="badge">Онлайн/офлайн</span>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                  <a className="cta" href="#contact" style={{ textDecoration: "none" }}>
                    Оставить заявку
                  </a>
                  <a className="cta cta--ghost" href="#faq" style={{ textDecoration: "none" }}>
                    Смотреть программу
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="benefits" className="section">
        <div className="container">
          <h2 className="h2">Почему выбирают нас</h2>
          <div style={{ color: "var(--mint)", marginTop: 6 }}>
            <Bracket />
          </div>
          <div className="grid grid--3" style={{ marginTop: 16 }}>
            {[
              { t: "Преподы-практики", d: "Специалисты из логистики и ВЭД." },
              { t: "Сертификат", d: "Финальный зачёт и сертификат UTL." },
              { t: "Трудоустройство", d: "Помощь с резюме и собеседованиями." },
              { t: "Реальные кейсы", d: "Практика на кейсах реального бизнеса." },
              { t: "Поддержка", d: "Чат-поддержка и наставники." },
              { t: "Гибкий формат", d: "Онлайн/офлайн, записи занятий." },
            ].map((b, i) => (
              <div key={i} className="card">
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <IconCheck />
                  <div className="card__tag">{b.t}</div>
                </div>
                <p className="p">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEACHERS */}
      <section id="teachers" className="section section--soft">
        <div className="container">
          <h2 className="h2">Преподаватели</h2>
          <div style={{ color: "var(--mint)", marginTop: 6 }}>
            <Bracket />
          </div>
          <div className="grid grid--3" style={{ marginTop: 16 }}>
            {["Алишер Х.", "Муниса Р.", "Дилшод К."].map((n, i) => (
              <div key={i} className="card">
                <div className="card__title">{n}</div>
                <p className="p">10+ лет в логистике и ВЭД. Практические кейсы и разборы.</p>
                <a className="cta" href="#contact" style={{ textDecoration: "none" }}>
                  Записаться
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="section">
        <div className="container">
          <h2 className="h2">Отзывы студентов</h2>
          <div style={{ color: "var(--mint)", marginTop: 6 }}>
            <Bracket />
          </div>

          <div className="sliderBtns">
            <button className="iconBtn" onClick={() => scrollBy(-320)} aria-label="Назад">
              ‹
            </button>
            <button className="iconBtn" onClick={() => scrollBy(320)} aria-label="Вперед">
              ›
            </button>
          </div>

          <div ref={scrollRef} className="scroll-x" style={{ marginTop: 6 }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card">
                <div className="card__tag">Выпускник</div>
                <p className="p">
                  «Нашёл работу через 3 недели после курса. Очень зашли практические задания!»
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="section section--soft">
        <div className="container">
          <h2 className="h2">Как проходит обучение</h2>
          <div style={{ color: "var(--mint)", marginTop: 6 }}>
            <Bracket />
          </div>
        </div>
        <div className="container steps" style={{ marginTop: 12 }}>
          {[
            "Регистрация и вводный урок",
            "Обучение: онлайн/офлайн + записи",
            "Итоговый проект и зачёт",
            "Сертификат и карьерная поддержка",
          ].map((s, i) => (
            <div key={i} className="step">
              <div className="step__index">{i + 1}</div>
              <div className="p">{s}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section">
        <div className="container">
          <h2 className="h2">FAQ</h2>
          <div style={{ color: "var(--mint)", marginTop: 6 }}>
            <Bracket />
          </div>
          {[
            ["Сколько длится обучение?", "Обычно 4 недели, 3 занятия в неделю."],
            ["Можно ли учиться онлайн?", "Да, полная онлайн-поддержка, записи занятий."],
            ["Вы помогаете с трудоустройством?", "Да, помогаем с резюме, готовим к интервью."],
          ].map(([q, a], i) => (
            <details key={i}>
              <summary>{q}</summary>
              <p className="p" style={{ marginTop: 6 }}>
                {a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* CONTACT / LEAD FORM */}
      <section id="contact" className="section section--soft">
        <div className="container">
          <h2 className="h2">Оставить заявку</h2>
          <div style={{ color: "var(--mint)", marginTop: 6 }}>
            <Bracket />
          </div>
          <form onSubmit={submitLead} className="grid grid--2" style={{ marginTop: 12 }}>
            <div className="card">
              <label className="p">Имя</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ваше имя"
                style={inputStyle}
              />
            </div>
            <div className="card">
              <label className="p">Телефон</label>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+998 xx xxx xx xx"
                style={inputStyle}
              />
            </div>
            <div className="card" style={{ gridColumn: "1 / -1" }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                />
                <span className="p">Согласен на обработку персональных данных</span>
              </label>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <button className="cta" disabled={sending}>
                {sending ? "Отправляем…" : "Получить консультацию"}
              </button>
              {ok && <span className="p" style={{ color: "#16a34a" }}>Спасибо! Мы свяжемся с вами.</span>}
            </div>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div>© {new Date().getFullYear()} UTL School</div>
          <div className="p">Ташкент • +998 (90) 123-45-67 • @utl_school</div>
        </div>
      </footer>

      {/* Floating CTA mobile */}
      <div className="fab">
        <a className="cta" href="#contact" style={{ textDecoration: "none" }}>
          Записаться
        </a>
        <div style={{ height: 8 }} />
        <a className="cta cta--ghost" href="tel:+998901234567" style={{ textDecoration: "none" }}>
          Позвонить
        </a>
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
