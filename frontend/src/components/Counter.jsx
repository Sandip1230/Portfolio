import { useEffect, useRef, useState } from 'react';

function parseNum(str) {
  const m = String(str).match(/^(\d+)(.*)$/);
  return m ? { num: parseInt(m[1], 10), suffix: m[2] } : null;
}

export default function Counter({ value }) {
  const parsed = parseNum(value);
  const ref = useRef(null);
  const done = useRef(false);
  const [display, setDisplay] = useState(parsed ? '0' + parsed.suffix : value);

  useEffect(() => {
    if (!parsed) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !done.current) {
        done.current = true;
        const start = performance.now(), dur = 1200;
        function step(now) {
          const t = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(Math.round(eased * parsed.num) + parsed.suffix);
          if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return <span ref={ref}>{display}</span>;
}