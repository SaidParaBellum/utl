// IPhoneFrame.jsx
export default function IPhoneFrame({
  children,
  width = 320,
  // тонкая настройка «островка»
  islandW = 90,
  islandH = 26,
  islandRadius = 12,
  showCameraDot = true,
}) {
  const aspect = 2.167; // ~ iPhone 14/15 Pro
  const height = Math.round(width * aspect);

  // геометрия экрана
  const screenX = 8;
  const screenY = 10;
  const screenW = 344;
  const screenH = 760;
  const screenRx = 48;

  // позиция островка (по центру сверху)
  const islandX = (360 - islandW) / 2;
  const islandY = 28;

  return (
    <div
      className="iphone"
      style={{
        width,
        height,
        position: "relative",
        borderRadius: 60,
        filter: "drop-shadow(0 10px 30px rgba(0,0,0,.25))",
        userSelect: "none",
      }}
    >
      {/* Слой ЭКРАНА: прозрачный фон + ваш контент */}
      <div
        className="iphone__screen"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 48,
          overflow: "hidden",
          background: "transparent", // ← экран ПРОЗРАЧНЫЙ
          // маска экрана с вырезом под «островок»
          WebkitMask: `
            radial-gradient(${islandW / 2}px ${islandH / 2}px at ${islandX + islandW / 2}px ${islandY + islandH / 2}px, transparent 99%, #000 100%),
            linear-gradient(#000,#000)
          `,
          maskComposite: "exclude",
          WebkitMaskComposite: "source-over, destination-in",
        }}
      >
        <div style={{ width: "100%", height: "100%" }}>{children}</div>
      </div>

      {/* Корпус/рамка + стекло + «островок» */}
      <svg
        className="iphone__svg"
        viewBox="0 0 360 780"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        aria-hidden
      >
        <defs>
          <linearGradient id="bezelGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2a2e34" />
            <stop offset="1" stopColor="#0d0f12" />
          </linearGradient>

          <mask id="screenMask">
            <rect x={screenX} y={screenY} width={screenW} height={screenH} rx={screenRx} fill="#fff" />
            <rect x={islandX} y={islandY} width={islandW} height={islandH} rx={islandRadius} fill="#000" />
          </mask>
        </defs>

        {/* Корпус */}
        <rect
          x="0.5"
          y="0.5"
          width="359"
          height="779"
          rx="60"
          fill="url(#bezelGrad)"
          stroke="#161a20"
        />

        {/* Лёгкий стеклянный блик внутри экрана (не заливает фон) */}
        <g mask="url(#screenMask)">
          <rect x={screenX} y={screenY} width={screenW} height={screenH} rx={screenRx} fill="transparent" />
          <rect x="-40" y="-40" width="460" height="220" fill="rgba(255,255,255,.14)" transform="rotate(8)" />
        </g>

        {/* «Островок» поверх */}
        <g>
          <rect x={islandX} y={islandY} width={islandW} height={islandH} rx={islandRadius} fill="#000" />
          {showCameraDot && (
            <circle cx={islandX + islandW - 12} cy={islandY + islandH / 2} r="2.4" fill="#0a84ff" />
          )}
        </g>
      </svg>
    </div>
  );
}
