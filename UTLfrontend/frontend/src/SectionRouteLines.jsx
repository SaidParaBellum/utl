// SectionRouteLines.jsx
export default function SectionRouteLines({ variant = "about" }) {
  /**
   * Координаты «Tashkent» под правой нижней фотографией в секции ABOUT.
   * Подгони при необходимости на 5–15px.
   */
  const TK = { x: 1085, y: 356 }; // ⟵ точка под правой нижней фоткой

  /**
   * ABOUT:
   * - линейная траектория из сегментов
   * - ныряет ниже контента, затем поднимается
   * - ПРОХОДИТ ТОЧНО ЧЕРЕЗ точку Tashkent (узел маршрута)
   * - затем идёт через Dzerzhinsk и выходит вправо
   */
  const aboutPath = [
    "M -60,120",   // входим слева сверху
    "L 240,140",   // Moscow
    "L 900,420",   // под текст/бейджи
    `L ${TK.x},${TK.y}`, // !!! Tashkent — точка на линии
    "L 1710,230",  // Dzerzhinsk (вершина сегмента)
    "L 2000,230",  // ровный выход вправо
  ].join(" ");

  /**
   * COURSES — как было (мягкая диагональ)
   */
  const coursesPath =
    "M -80,180 L 300,210 Q 700,240 1040,230 L 1380,270 L 1680,300 T 2000,320";

  const mainPath = variant === "about" ? aboutPath : coursesPath;

  // Маркеры городов (координаты подогнаны под линию)
  const cities =
    variant === "about"
      ? [
          { x: 240, y: 140, label: "Moscow" },
          { x: TK.x, y: TK.y, label: "Tashkent" }, // совпадает с узлом маршрута
          { x: 1710, y: 230, label: "Dzerzhinsk" },
        ]
      : [
          { x: 320, y: 210, label: "Moscow" },
          { x: 1040, y: 230, label: "Tashkent" },
          { x: 1680, y: 300, label: "Dzerzhinsk" },
        ];

  return (
    <>
      <style>{`
        .withRouteBG{ position:relative; overflow:hidden }
        .routeContent{ position:relative; z-index:1 } /* контент поверх */
        .routeSectionBG{
          position:absolute; inset:0; width:100%; height:100%;
          pointer-events:none; z-index:0; opacity:.6;  /* линия под элементами */
        }
        .routeSectionBG .rl{
          fill:none; vector-effect:non-scaling-stroke; stroke-linecap:round;
          stroke:url(#mint);
          filter: drop-shadow(0 1px 6px rgba(168,211,207,.35));
        }
        .routeSectionBG .rl-main{
          stroke-width:3.1;
          stroke-dasharray:1200;
          animation:routeFlow 9s linear infinite;
          opacity:.95;
        }
        @keyframes routeFlow{ from{stroke-dashoffset:1200} to{stroke-dashoffset:0} }

        .cityDot{ fill:#A8D3CF }
        .cityPulse{ fill:none; stroke:#A8D3CF; stroke-width:1.6; opacity:.85; animation:pulse 2.6s ease-in-out infinite }
        .routeLabel{
          font:600 14px/1.2 Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          fill:#7bbdb6; letter-spacing:.3px;
          paint-order:stroke; stroke:#fff; stroke-width:3px;
        }
        @keyframes pulse{ 0%{r:9;opacity:.85} 50%{r:15;opacity:0} 100%{r:9;opacity:.85} }

        @media (max-width:980px){
          .routeSectionBG{ opacity:.45 }
          .routeLabel{ font-weight:700; font-size:13px }
        }
      `}</style>

      <svg
        className="routeSectionBG"
        viewBox="0 0 1920 700"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id="mint" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#A8D3CF" />
            <stop offset="1" stopColor="#7BBDB6" />
          </linearGradient>
        </defs>

        <path className="rl rl-main" pathLength="1200" d={mainPath} />

        {cities.map((c, i) => (
          <g key={i} transform={`translate(${c.x},${c.y})`}>
            <circle r="4.5" className="cityDot" />
            <circle r="9" className="cityPulse" />
            <text x="12" y="-12" className="routeLabel">{c.label}</text>
          </g>
        ))}
      </svg>
    </>
  );
}
