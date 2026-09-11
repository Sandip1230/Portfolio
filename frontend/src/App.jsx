import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProjectModal from './components/ProjectModal';

const SKILLS = ['React', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 'Socket.io', 'Yjs', 'JavaScript', 'Vite', 'REST APIs', 'Git', 'Arduino'];

const EXPERIENCE = [
  { date: 'Aug 2026 — Present', title: 'Engineering Intern, Axlero Solutions', desc: 'Presentation scripts, review documentation, milestone coordination.' },
  { date: 'Mar 2026', title: 'Team Lead (PENTABOTs) — Quantumard National Hackathon', desc: 'AIR Rank 38, Phase 2 Build Round.' },
  { date: 'Jul 2026', title: 'Bharatiya Antariksh Hackathon', desc: 'Built VayuNetra — satellite-based air quality intelligence platform.' },
  { date: 'Apr 2026', title: 'NPTEL — Programming in Java', desc: 'Certification.' },
];

export default function App() {
  const [projects, setProjects] = useState([]);
  const [modalProject, setModalProject] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  useEffect(() => { fetch('/api/projects').then(r => r.json()).then(setProjects).catch(() => {}); }, []);

  async function submitContact(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      setStatus('ok'); setForm({ name: '', email: '', message: '' });
    } catch { setStatus('err'); }
  }

  return (
    <>
      <Navbar />

      <section className="hero" id="hero">
        <div className="blob blob-1" /><div className="blob blob-2" />
        <div className="hero-content">
          <h1>Full-stack developer building real-time, playful, AI-enabled products.</h1>
          <p>B.Tech CSE student at JIS College of Engineering — I build collaborative apps, browser games, and satellite-data platforms with the MERN stack.</p>
          <div className="hero-links">
            <a href="#work" className="btn btn-fill">See my work</a>
            <a href="#contact" className="btn btn-outline">Get in touch</a>
          </div>
        </div>
      </section>

      <section className="section about" id="about">
        <div className="eyebrow">About</div>
        <p>I'm a Computer Science and Engineering student who likes shipping things that feel alive — real-time collaboration, animated game combat systems, AI-fused data platforms. Comfortable across the stack, from Socket.io state sync to Arduino wiring.</p>
        <p>Currently interning as an Engineering Intern at Axlero Solutions.</p>
      </section>

      <section className="section" id="skills">
        <div className="eyebrow">Skills</div>
        <h2>What I work with</h2>
        <div className="skill-row">{SKILLS.map(s => <span className="pill" key={s}>{s}</span>)}</div>
      </section>

      <section className="section" id="work">
        <div className="eyebrow">Work</div>
        <h2>Selected projects</h2>
        <div className="grid">
          {projects.map(p => (
            <button className="card" key={p.slug} onClick={() => setModalProject(p)}>
              <h3>{p.title}</h3>
              <p>{p.short}</p>
              <div>{p.stack.slice(0, 3).map(s => <span className="tag" key={s}>{s}</span>)}</div>
            </button>
          ))}
        </div>
      </section>

      <section className="section" id="experience">
        <div className="eyebrow">Experience</div>
        <h2>Where I've been</h2>
        <div className="timeline">
          {EXPERIENCE.map((e, i) => (
            <div className="tl-item" key={i}>
              <div className="tl-date">{e.date}</div>
              <div><h3>{e.title}</h3><p>{e.desc}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="contact">
        <div className="eyebrow">Contact</div>
        <h2>Let's build something</h2>
        <div className="contact-wrap">
          <div className="contact-info">
            <p style={{ color: 'var(--dim)' }}>Open to internships, collabs, and interesting problems.</p>
            <a href="mailto:maitrasandip99@gmail.com">maitrasandip99@gmail.com</a>
            <a href="https://github.com/Sandip1230" target="_blank" rel="noreferrer">github.com/Sandip1230</a>
            <a href="https://www.linkedin.com/in/sandip-maitra-20016137a/" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
          <form className="form" onSubmit={submitContact}>
            <input required placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <input required type="email" placeholder="Your email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            <textarea required rows={5} placeholder="Message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
            <button className="btn-fill" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send message'}</button>
            {status === 'ok' && <div className="status-msg ok">✓ Message sent</div>}
            {status === 'err' && <div className="status-msg err">✗ Something went wrong</div>}
          </form>
        </div>
      </section>

      <footer>© 2026 Sandip Maitra — built with the MERN stack.</footer>

      <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
    </>
  );
}