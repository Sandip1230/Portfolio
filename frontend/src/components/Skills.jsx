import { useState } from 'react';
import {
  SiReact, SiNodedotjs, SiExpress, SiHtml5, SiCss, SiJavascript, SiVite,
  SiMongodb, SiMysql, SiSocketdotio, SiGit, SiGithub, SiArduino, SiBluetooth,
} from 'react-icons/si';
import { FiCode, FiCpu, FiZap, FiRadio, FiSettings, FiGlobe, FiTerminal } from 'react-icons/fi';

const SKILL_DATA = {
  'Job-related': [
    { name: 'React', icon: SiReact }, { name: 'Node.js', icon: SiNodedotjs },
    { name: 'Express.js', icon: SiExpress }, { name: 'HTML', icon: SiHtml5 },
    { name: 'CSS', icon: SiCss }, { name: 'JavaScript', icon: SiJavascript },
    { name: 'Vite', icon: SiVite }, { name: 'MongoDB', icon: SiMongodb },
    { name: 'MySQL', icon: SiMysql }, { name: 'Socket.io', icon: SiSocketdotio },
    { name: 'Yjs', icon: FiCode }, { name: 'REST APIs', icon: FiGlobe },
  ],
  'Digital': [
    { name: 'Git', icon: SiGit }, { name: 'GitHub', icon: SiGithub },
    { name: 'VS Code', icon: FiTerminal }, { name: 'MongoDB Compass', icon: SiMongodb },
    { name: 'MySQL Workbench', icon: SiMysql },
  ],
  'Embedded / Other': [
    { name: 'Arduino UNO', icon: SiArduino }, { name: 'Microcontrollers', icon: FiCpu },
    { name: 'L293D Motor Driver', icon: FiZap }, { name: 'Bluetooth Modules', icon: SiBluetooth },
    { name: 'Sensors', icon: FiRadio }, { name: 'Servo Motors', icon: FiSettings }, { name: 'VHDL', icon: FiCode },
  ],
};

const TABS = ['All', ...Object.keys(SKILL_DATA)];

export default function Skills() {
  const [active, setActive] = useState('All');
  const visible = active === 'All' ? Object.entries(SKILL_DATA) : [[active, SKILL_DATA[active]]];

  return (
    <>
      <div className="skill-tabs">
        {TABS.map(t => (
          <button key={t} className={`skill-tab ${active === t ? 'active' : ''}`} onClick={() => setActive(t)}>
            {t}
          </button>
        ))}
      </div>

      {visible.map(([group, list]) => (
        <div className="skill-group" key={group}>
          {active === 'All' && <div className="skill-group-label">{group}</div>}
          <div className="skill-grid">
            {list.map((s, i) => {
              const Icon = s.icon;
              return (
                <div className="skill-card" key={s.name} style={{ animationDelay: `${i * 0.04}s` }}>
                  <Icon className="skill-icon" />
                  <span className="skill-name">{s.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}