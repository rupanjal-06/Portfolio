import { useEffect, useRef, useState } from "react";


export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [glows, setGlows] = useState([]);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;

    if (!isFinePointer) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor-active");

    function handleMove(e) {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `
          translate3d(${e.clientX}px, ${e.clientY}px, 0)
          translate(-50%, -50%)
        `;
      }
    }

    function handleDown(e) {
      const id = `${Date.now()}-${Math.random()}`;

      setGlows((current) => [
        ...current,
        {
          id,
          x: e.clientX,
          y: e.clientY,
        },
      ]);

      setTimeout(() => {
        setGlows((current) => current.filter((glow) => glow.id !== id));
      }, 700);

      cursorRef.current?.classList.add("cursor-click");
    }

    function handleUp() {
      cursorRef.current?.classList.remove("cursor-click");
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    return () => {
      document.body.classList.remove("custom-cursor-active");

      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Main cursor */}
      <div ref={cursorRef} className="snow-cursor" aria-hidden="true">
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Outer crystal */}
          <path
            d="M16 2
               L20.5 7
               L27 6
               L25 12
               L30 16
               L25 20
               L27 26
               L20.5 25
               L16 30
               L11.5 25
               L5 26
               L7 20
               L2 16
               L7 12
               L5 6
               L11.5 7
               Z"
            fill="url(#crystalGradient)"
            stroke="#F8FDFF"
            strokeWidth="1"
            strokeLinejoin="round"
          />

          {/* Inner crystal */}
          <path
            d="M16 6
               L19 11
               L24 10
               L22 15
               L26 16
               L22 18
               L24 22
               L19 21
               L16 26
               L13 21
               L8 22
               L10 18
               L6 16
               L10 14
               L8 10
               L13 11
               Z"
            fill="url(#innerGradient)"
            opacity="0.95"
          />

          {/* Bright crystal center */}
          <circle cx="16" cy="16" r="2.5" fill="#FFFFFF" />

          <defs>
            <linearGradient
              id="crystalGradient"
              x1="3"
              y1="3"
              x2="29"
              y2="29"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#FFFFFF" />
              <stop offset="0.45" stopColor="#E8F6FF" />
              <stop offset="1" stopColor="#7DD3FC" />
            </linearGradient>

            <linearGradient
              id="innerGradient"
              x1="8"
              y1="8"
              x2="24"
              y2="24"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#FFFFFF" />
              <stop offset="0.5" stopColor="#BAE6FD" />
              <stop offset="1" stopColor="#60A5FA" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Click glow */}
      {glows.map((glow) => (
        <span
          key={glow.id}
          className="cursor-glow-ping"
          style={{
            left: `${glow.x}px`,
            top: `${glow.y}px`,
          }}
          aria-hidden="true"
        />
      ))}
    </>
  );
}

