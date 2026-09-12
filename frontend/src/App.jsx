import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProjectModal from './components/ProjectModal';
import Skills from './components/Skills';
import { useReveal } from './hooks/useReveal';

const FALLBACK_PROJECTS = [
  { slug: 'syncspace', title: 'SyncSpace', short: 'Real-time collaborative code editor + whiteboard workspace.', full: 'Developed a real-time collaborative code editor and whiteboard workspace using Socket.io and Yjs for state synchronization, with admin handoff logic and custom room approval interfaces.', stack: ['React', 'Socket.io', 'Yjs', 'Vite'], link: 'https://github.com/Sandip1230' },
  { slug: 'rampage-united', title: 'Rampage United', short: 'Multiplayer typing-speed fighting game with combat mechanics.', full: 'Designed a multiplayer typing-speed fighting game featuring dynamic combat mechanics, weapon stores, and complex character animation systems.', stack: ['React', 'Vite', 'Web Audio API', 'Canvas'], link: 'https://github.com/Sandip1230' },
  { slug: 'vayusetu', title: 'VayuSetu', short: 'AI-powered satellite-based air quality intelligence platform.', full: 'Engineered an AI-powered satellite-based air quality intelligence platform for the Bharatiya Antariksh Hackathon 2026.', stack: ['React', 'Flask', 'Machine Learning'], link: 'https://github.com/Sandip1230' },
  { slug: 'matrixon', title: 'Matrixon', short: 'Web app with an interactive terminal interface and local WebGPU model execution.', full: 'Built a web-based learning application featuring an interactive terminal interface and custom CSS themes; integrated local WebGPU model execution and ping status utilities.', stack: ['Node.js', 'Express', 'WebGPU'], link: 'https://github.com/Sandip1230' },
  { slug: 'forma-ai', title: 'Forma AI', short: 'Full-stack internship project with a modular codebase.', full: 'Configured a full-stack internship project within a modular codebase, managing repository settings and client-side package dependencies.', stack: ['React', 'Node.js', 'Express', 'MongoDB'], link: 'https://github.com/Sandip1230' },
  { slug: 'smart-car', title: 'Shape-Shifting Smart Car Prototype', short: 'Bluetooth-controlled robotic vehicle prototype.', full: 'Constructed a Bluetooth-controlled robotic vehicle, including hardware manifests, wiring blueprints, and Arduino control code.', stack: ['Arduino', 'L293D', 'Bluetooth'], link: 'https://github.com/Sandip1230' },
];

const HOBBIES = ['Programming', 'Gaming', 'Web Development', 'Technology'];

const STATS = [
  { num: '6+', label: 'Projects Built' },
  { num: '2', label: 'Hackathons' },
  { num: 'AIR 38', label: 'National Rank' },
  { num: '1', label: 'Certification' },
];

const ACHIEVEMENTS = [
  { badge: '🏆', title: 'Quantumard National Hackathon', date: 'March 2026', desc: 'Team Lead (PENTABOTs) — AIR Rank 38, Phase 2 Build Round.' },
  { badge: '🛰️', title: 'Bharatiya Antariksh Hackathon', date: 'July 2026', desc: 'Participant — built VayuSetu, an AI-powered satellite-based air quality intelligence platform.' },
  { badge: '📜', title: 'NPTEL Certification — Programming in Java', date: 'April 2026', desc: 'Completed certification in Java programming fundamentals.' },
  { badge: '💼', title: 'Engineering Intern, Axlero Solutions', date: 'Aug 2026 — Present', desc: 'Presentation scripts, review documentation, and milestone coordination.' },
];

const EXPERIENCE = [
  { date: 'Aug 2026 — Present', title: 'Engineering Intern, Axlero Solutions', desc: 'Prepared project presentation scripts and authored mid-month review documentation. Coordinated and scheduled final project review milestones and generated internal corporate notices.' },
  { date: 'Sep 2026 — Present', title: 'B.Tech in Computer Science and Engineering', desc: 'JIS College of Engineering, Kolkata.' },
];

export default function App() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [modalProject, setModalProject] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const aboutR = useReveal();
  const skillsR = useReveal();
  const workR = useReveal();
  const achR = useReveal();
  const expR = useReveal();
  const contactR = useReveal();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/projects`).then(r => r.json()).then(d => { if (d?.length) setProjects(d); }).catch(() => {});
  }, []);

  async function submitContact(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      setStatus('ok'); setForm({ name: '', email: '', message: '' });
    } catch { setStatus('err'); }
  }

  return (
    <>
      <Navbar />

      <section className="hero" id="hero">
        <div className="blob blob-1" /><div className="blob blob-2" />

        <div className="billboard">
          <div className="billboard-text">
            <span>FULL-STACK</span>
            <span>DEVELOPER</span>
          </div>
          <div className="billboard-photo">
            <img src="/profile.png" alt="Sandip Maitra" />
          </div>
        </div>

        <div className="hero-intro">
          <div className="name">Hello</div>
          <div className="name-row">
            <h2>I'm Sandip Maitra</h2>
            <a href="/Sandip_Maitra_CV.pdf" download className="btn-cv">⬇ Download CV</a>
          </div>
          <p>B.Tech CSE student at JIS College of Engineering — I build collaborative apps, browser games, and satellite-data platforms with the MERN stack.</p>

          <div className="social-row">
            <a className="social-icon" href="https://github.com/Sandip1230" target="_blank" rel="noreferrer">Gh</a>
            <a className="social-icon" href="https://www.linkedin.com/in/sandip-maitra-20016137a/" target="_blank" rel="noreferrer">in</a>
            <a className="social-icon" href="mailto:maitrasandip99@gmail.com">✉</a>
          </div>

          <div className="hero-links">
            <a href="#contact" className="btn btn-fill">Hire Me</a>
            <a href="#work" className="btn btn-outline">See Work</a>
          </div>

          <div className="stats-strip">
            {STATS.map(s => (
              <div className="stat" key={s.label}>
                <div className="num">{s.num}</div>
                <div className="label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`section about ${aboutR.revealClass}`} id="about" ref={aboutR.ref}>
        <div className="eyebrow">About</div>
        <p>I'm a Computer Science and Engineering student who likes shipping things that feel alive — real-time collaboration, animated game combat systems, AI-fused data platforms. Comfortable across the stack, from Socket.io state sync to Arduino wiring.</p>
        <p>Based in Kolkata, India. Currently interning as an Engineering Intern at Axlero Solutions.</p>
        <div className="skill-row" style={{ marginTop: 20 }}>
          {HOBBIES.map(h => <span className="pill" key={h}>{h}</span>)}
        </div>
      </section>

      <section className={`section ${skillsR.revealClass}`} id="skills" ref={skillsR.ref}>
        <div className="eyebrow">Skills</div>
        <h2 style={{ marginBottom: 6 }}>What I work with</h2>
        <Skills />
      </section>

      <section className={`section ${workR.revealClass}`} id="work" ref={workR.ref}>
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

      <section className={`section ${achR.revealClass}`} id="achievements" ref={achR.ref}>
        <div className="eyebrow">Achievements</div>
        <h2>Recognitions & milestones</h2>
        <div className="ach-grid">
          {ACHIEVEMENTS.map((a, i) => (
            <div className="ach-card" key={i}>
              <div className="ach-badge">{a.badge}</div>
              <span className="date">{a.date}</span>
              <h3>{a.title}</h3>
              <p>{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`section ${expR.revealClass}`} id="experience" ref={expR.ref}>
        <div className="eyebrow">Experience & Education</div>
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

      <section className={`section ${contactR.revealClass}`} id="contact" ref={contactR.ref}>
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