import { useEffect, useState } from 'react';

const LINES = [
  { cmd: 'whoami', out: 'sandip_maitra — b.tech cse @ jis college of engineering' },
  { cmd: 'cat focus.md', out: 'full-stack dev · mern · real-time systems · ai-enabled platforms' },
  { cmd: 'status --current', out: 'engineering intern @ axlero solutions (aug 2026 – present)' },
];

export default function Terminal() {
  const [visible, setVisible] = useState(0);
  const [typed, setTyped] = useState('');

  useEffect(() => {
    if (visible >= LINES.length) return;
    const cmd = LINES[visible].cmd;
    let i = 0;
    const t = setInterval(() => {
      setTyped(cmd.slice(0, i + 1));
      i++;
      if (i === cmd.length) {
        clearInterval(t);
        setTimeout(() => { setVisible(v => v + 1); setTyped(''); }, 400);
      }
    }, 35);
    return () => clearInterval(t);
  }, [visible]);

  return (
    <div className="terminal">
      {LINES.slice(0, visible).map((l, i) => (
        <div key={i}>
          <span className="prompt">$ </span>{l.cmd}
          <div className="out">{l.out}</div>
        </div>
      ))}
      {visible < LINES.length && (
        <div><span className="prompt">$ </span>{typed}<span className="cursor" /></div>
      )}
    </div>
  );
}