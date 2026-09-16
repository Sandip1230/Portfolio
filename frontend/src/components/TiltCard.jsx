import { useRef } from 'react';

export default function TiltCard({ children, onClick }) {
  const ref = useRef(null);
  function onMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(700px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateY(-4px)`;
  }
  function onLeave() { if (ref.current) ref.current.style.transform = ''; }
  return (
    <button ref={ref} className="card" onClick={onClick} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </button>
  );
}