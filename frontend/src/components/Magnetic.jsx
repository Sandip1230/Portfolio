import { useRef } from 'react';

export default function Magnetic({ children, strength = 22 }) {
  const ref = useRef(null);
  function onMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width * strength;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height * strength;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  }
  function onLeave() { if (ref.current) ref.current.style.transform = 'translate(0,0)'; }
  return (
    <span ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ display: 'inline-block', transition: 'transform .15s ease-out' }}>
      {children}
    </span>
  );
}