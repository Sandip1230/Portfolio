import { useState, useEffect } from 'react';
import './AdminPage.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminPage() {
  const [key, setKey] = useState(localStorage.getItem('adminKey') || '');
  const [messages, setMessages] = useState(null);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(null);

  async function loadMessages(k) {
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/contact`, { headers: { 'x-admin-key': k } });
      if (res.status === 401) { setError('Wrong key'); return; }
      const data = await res.json();
      setMessages(data);
      localStorage.setItem('adminKey', k);
    } catch {
      setError('Could not reach server');
    }
  }

  useEffect(() => { if (key) loadMessages(key); }, []);

  async function openMessage(m) {
    setExpanded(expanded === m._id ? null : m._id);
    if (!m.read) {
      await fetch(`${API_URL}/api/contact/${m._id}/read`, { method: 'PATCH', headers: { 'x-admin-key': key } });
      setMessages(prev => prev.map(msg => msg._id === m._id ? { ...msg, read: true } : msg));
    }
  }

  async function deleteMessage(id) {
    if (!confirm('Delete this message permanently?')) return;
    await fetch(`${API_URL}/api/contact/${id}`, { method: 'DELETE', headers: { 'x-admin-key': key } });
    setMessages(prev => prev.filter(m => m._id !== id));
  }

  function logout() {
    localStorage.removeItem('adminKey');
    setKey(''); setMessages(null);
  }

  if (!messages) {
    return (
      <div className="admin-login">
        <div className="blob blob-a" /><div className="blob blob-b" />
        <div className="admin-login-card">
          <div className="lock">🔒</div>
          <h2>Admin Login</h2>
          <input type="password" placeholder="Admin key" value={key} onChange={e => setKey(e.target.value)} onKeyDown={e => e.key === 'Enter' && loadMessages(key)} />
          <button onClick={() => loadMessages(key)}>Enter Dashboard</button>
          {error && <div className="err">{error}</div>}
        </div>
      </div>
    );
  }

  const unreadCount = messages.filter(m => !m.read).length;
  const todayCount = messages.filter(m => new Date(m.createdAt).toDateString() === new Date().toDateString()).length;

  const filtered = messages
    .filter(m => filter === 'all' || (filter === 'unread' && !m.read))
    .filter(m => (m.name + m.email + m.message).toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="admin-page">
      <div className="admin-top">
        <h1>Message Dashboard</h1>
        <button className="admin-logout" onClick={logout}>Logout</button>
      </div>

      <div className="admin-stats">
        <div className="admin-stat"><div className="num">{messages.length}</div><div className="label">Total Messages</div></div>
        <div className="admin-stat"><div className="num">{unreadCount}</div><div className="label">Unread</div></div>
        <div className="admin-stat"><div className="num">{todayCount}</div><div className="label">Today</div></div>
      </div>

      <div className="admin-toolbar">
        <input placeholder="Search by name, email, or message..." value={search} onChange={e => setSearch(e.target.value)} />
        <button className={`admin-filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
        <button className={`admin-filter-btn ${filter === 'unread' ? 'active' : ''}`} onClick={() => setFilter('unread')}>Unread</button>
      </div>

      <div className="admin-list">
        {filtered.length === 0 && <div className="admin-empty">No messages match.</div>}
        {filtered.map(m => (
          <div className={`msg-card ${!m.read ? 'unread' : ''}`} key={m._id} onClick={() => openMessage(m)}>
            <div className="msg-head">
              <div className="msg-who">
                {!m.read && <span className="msg-dot" />}
                <span className="msg-name">{m.name}</span>
                <span className="msg-email">{m.email}</span>
              </div>
              <span className="msg-date">{new Date(m.createdAt).toLocaleString()}</span>
            </div>
            {expanded !== m._id && <div className="msg-preview">{m.message}</div>}
            {expanded === m._id && (
              <>
                <div className="msg-full">{m.message}</div>
                <div className="msg-actions">
                  <a className="reply" href={`mailto:${m.email}`} onClick={e => e.stopPropagation()} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border)', fontSize: 12.5, fontWeight: 600 }}>Reply</a>
                  <button className="del" onClick={e => { e.stopPropagation(); deleteMessage(m._id); }}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}