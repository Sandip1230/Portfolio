import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import Magnetic from './Magnetic';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const links = ['about', 'skills', 'work', 'achievements', 'experience'];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#hero" className="logo">Sandip<span className="dot">.</span></a>
      <div className="nav-right">
        <div className="links">
          {links.map(l => <a key={l} href={`#${l}`}>{l[0].toUpperCase() + l.slice(1)}</a>)}
        </div>
        <ThemeToggle />
        <Magnetic strength={14}><a href="#contact" className="nav-cta">Let's Talk</a></Magnetic>
      </div>
    </nav>
  );
}