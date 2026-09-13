import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminPage() {
  const [key, setKey] = useState(localStorage.getItem('adminKey') || '');
  const [messages, setMessages] = useState(null);
  const [error, setError] = useState('');

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

  if (!messages) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, background: '#0a0e14', color: '#fff' }}>
        <h2>Admin Login</h2>
        <input
          type="password" placeholder="Admin key" value={key}
          onChange={e => setKey(e.target.value)}
          style={{ padding: 12, borderRadius: 8, border: '1px solid #333', background: '#121a2b', color: '#fff', width: 260 }}
        />
        <button onClick={() => loadMessages(key)} style={{ padding: '10px 24px', borderRadius: 8, background: '#22c55e', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
          Enter
        </button>
        {error && <p style={{ color: '#ef4444' }}>{error}</p>}
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0e14', color: '#fff', padding: '60px 6vw' }}>
      <h1 style={{ marginBottom: 30 }}>Messages ({messages.length})</h1>
      {messages.length === 0 && <p>No messages yet.</p>}
      {messages.map(m => (
        <div key={m._id} style={{ background: '#121a2b', border: '1px solid #232a35', borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <strong>{m.name}</strong>
            <span style={{ color: '#8b93a7', fontSize: 13 }}>{new Date(m.createdAt).toLocaleString()}</span>
          </div>
          <div style={{ color: '#22c55e', fontSize: 14, marginBottom: 10 }}>{m.email}</div>
          <p style={{ color: '#c9d1d9', lineHeight: 1.5 }}>{m.message}</p>
        </div>
      ))}
    </div>
  );
}