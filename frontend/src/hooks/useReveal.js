import { useEffect, useRef, useState } from 'react';

export function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [dir, setDir] = useState('down');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        setDir(entry.boundingClientRect.top > 0 ? 'down' : 'up');
        setVisible(entry.isIntersecting);
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, revealClass: `reveal ${dir === 'down' ? 'from-bottom' : 'from-top'} ${visible ? 'in' : ''}` };
}