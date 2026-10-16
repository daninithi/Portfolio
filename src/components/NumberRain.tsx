import { useEffect, useRef } from "react";

// --- Settings you can tweak ---
const CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const FONT_SIZE = 11;     // size of each character in px
const CHANGE_RATE = 0.02; // share of characters that swap each frame
const SPEED = 0.0004;     // how fast the patches change shape
const DRIFT = 20;         // how fast patches move left to right
const MAX_OPACITY = 0.3;  // how bright the brightest characters get
const THRESHOLD = 0.65;   // higher = less of the screen covered
// areas where no letters should appear
const AVOID = [".tag-box", ".content h1", ".description", ".buttons", "nav"];
const AVOID_PADDING = 24;   // extra empty space around those areas (px)
const AVOID_FADE = 80;      // how gently the letters fade out near them (px)

const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

// A smooth, slowly moving "cloud" value between 0 and 1 for each spot.
function cloud(x: number, y: number, t: number) {
  const v =
    Math.sin(x * 0.07 + t) * Math.cos(y * 0.13 - t * 0.8) +
    Math.sin((x + y) * 0.04 + t * 0.6) +
    Math.cos((x - y) * 0.05 - t * 0.4) * 0.6;
  return (v + 2.6) / 5.2;
}

function NumberRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const cellW = FONT_SIZE * 0.62;
    const cellH = FONT_SIZE * 1.5;
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cols = 0;
    let rows = 0;
    let grid: string[] = [];
    let frame = 0;
    let frameCount = 0;
    let avoidRects: DOMRect[] = [];

    // Find where the text blocks are, measured from the canvas's top-left corner
    const measureAvoid = () => {
      const top = canvas.getBoundingClientRect().top;
      avoidRects = AVOID.flatMap((sel) =>
        [...document.querySelectorAll(sel)].map((el) => {
          const r = el.getBoundingClientRect();
          return new DOMRect(r.x, r.y - top, r.width, r.height);
        })
      );
    };

    // 0 inside a text block, rising smoothly to 1 further away from it
    const avoidFactor = (x: number, y: number) => {
      let factor = 1;
      for (const r of avoidRects) {
        const dx = Math.max(r.left - AVOID_PADDING - x, 0, x - r.right - AVOID_PADDING);
        const dy = Math.max(r.top - AVOID_PADDING - y, 0, y - r.bottom - AVOID_PADDING);
        const f = Math.min(Math.hypot(dx, dy) / AVOID_FADE, 1);
        factor = Math.min(factor, f * f * (3 - 2 * f)); // smooth curve, no hard edge
      }
      return factor;
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(innerWidth / cellW);
      rows = Math.ceil(innerHeight / cellH);
      grid = Array.from({ length: cols * rows }, randomChar);
    };

    const draw = (time: number) => {
      // The rain only lives on the first screen: skip the work once it's scrolled away
      if (!reduceMotion && canvas.getBoundingClientRect().bottom < 0) {
        frame = requestAnimationFrame(draw);
        return;
      }
      const t = time * SPEED;
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      ctx.font = `${FONT_SIZE}px "SF Mono", Menlo, Consolas, monospace`;
      ctx.textBaseline = "top";

      // Re-measure now and then, because the text fades/moves in on load
      if (frameCount++ % 30 === 0) measureAvoid();

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // Only show text where the cloud is "thick" enough
          const strength =
            (cloud(c - t * DRIFT, r, t * 0.3) - THRESHOLD) * 3.5 *
            avoidFactor(c * cellW + cellW / 2, r * cellH + cellH / 2);
          if (strength <= 0) continue;

          const i = r * cols + c;
          if (Math.random() < CHANGE_RATE) grid[i] = randomChar();

          ctx.fillStyle = `rgba(200, 200, 200, ${Math.min(strength, 1) * MAX_OPACITY})`;
          ctx.fillText(grid[i], c * cellW, r * cellH);
        }
      }
      if (!reduceMotion) frame = requestAnimationFrame(draw);
    };

    const onResize = () => {
      resize();
      measureAvoid();
      if (reduceMotion) draw(0);
    };

    resize();
    frame = requestAnimationFrame(draw);
    addEventListener("resize", onResize);
    addEventListener("scroll", measureAvoid, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("resize", onResize);
      removeEventListener("scroll", measureAvoid);
    };
  }, []);

  return <canvas ref={canvasRef} className="number-rain" aria-hidden="true" />;
}

export default NumberRain;
