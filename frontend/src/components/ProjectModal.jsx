export default function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="close" onClick={onClose}>✕</button>
        <h3>{project.title}</h3>
        <p>{project.full}</p>
        <div>{project.stack.map(s => <span className="tag" key={s}>{s}</span>)}</div>
        {project.link && <a href={project.link} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ marginTop: 16 }}>View repo →</a>}
      </div>
    </div>
  );
}