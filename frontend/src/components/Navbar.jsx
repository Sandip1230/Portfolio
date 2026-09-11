export default function Navbar() {
  const links = ['about', 'skills', 'work', 'experience', 'contact'];
  return (
    <nav className="nav">
      <div className="logo">Sandip<span style={{ color: 'var(--pink)' }}>.</span></div>
      <div className="links">
        {links.map(l => <a key={l} href={`#${l}`}>{l[0].toUpperCase() + l.slice(1)}</a>)}
      </div>
    </nav>
  );
}