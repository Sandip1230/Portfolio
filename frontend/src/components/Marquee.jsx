export default function Marquee({ items }) {
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {[...items, ...items].map((t, i) => <span key={i} className="marquee-item">{t}</span>)}
      </div>
    </div>
  );
}