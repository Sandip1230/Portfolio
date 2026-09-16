import { useReveal } from '../hooks/useReveal';

export default function TimelineItem({ date, title, desc }) {
  const r = useReveal(0.3);
  return (
    <div className={`tl-item-v2 ${r.revealClass}`} ref={r.ref}>
      <span className="tl-date">{date}</span>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}