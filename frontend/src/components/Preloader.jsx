import { useEffect, useState } from 'react';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [hide, setHide] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const dur = 1400;
    let raf;
    function tick(now) {
      const t = Math.min((now - start) / dur, 1);
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => setHide(true), 250);
        setTimeout(() => setGone(true), 750);
      }
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (gone) return null;

  return (
    <div className={`preloader ${hide ? 'hide' : ''}`}>
      <div className="preloader-logo">Sandip<span className="dot">.</span></div>
      <div className="preloader-bar"><div className="preloader-fill" style={{ width: `${progress}%` }} /></div>
      <div className="preloader-pct">{progress}%</div>
    </div>
  );
}