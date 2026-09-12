import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const links = ['about', 'skills', 'work', 'achievements', 'experience'];
  return (
    <nav className="nav">
      <div className="logo">Sandip<span style={{ color: 'var(--cyan)' }}>.</span></div>
      <div className="nav-right">
        <div className="links">
          {links.map(l => <a key={l} href={`#${l}`}>{l[0].toUpperCase() + l.slice(1)}</a>)}
        </div>
        <ThemeToggle />
        <a href="#contact" className="nav-cta">Let's Talk</a>
      </div>
    </nav>
  );
}