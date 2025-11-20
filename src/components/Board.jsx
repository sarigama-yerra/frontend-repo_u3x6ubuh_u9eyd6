import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function Board({ token, matchId }) {
  const [data, setData] = useState(null);
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  async function refresh() {
    const r = await fetch(`${API}/matches/${matchId}`, { headers }).then(r=>r.json());
    setData(r);
  }

  useEffect(()=>{ refresh(); const t = setInterval(refresh, 2000); return ()=>clearInterval(t); },[matchId]);

  async function raisePct(p) {
    await fetch(`${API}/matches/${matchId}/raise`, { method:'POST', headers: { ...headers, 'Content-Type': 'application/json' }, body: JSON.stringify({ percent: p }) }).then(r=>r.json());
    refresh();
  }

  if (!data) return <div className="p-4">Loading...</div>;
  const { match, moves, raises } = data;
  return (
    <div className="space-y-3 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-between">
        <div className="text-sm">Pot: <b>{match.pot_amount}</b> VC • Raises: {match.raise_count}/6 • Token: {match.raise_token_holder}</div>
        <div className="flex gap-2">
          <button onClick={()=>raisePct(25)} className="px-3 py-1 rounded-md border">+25%</button>
          <button onClick={()=>raisePct(50)} className="px-3 py-1 rounded-md border">+50%</button>
          <button onClick={()=>raisePct(100)} className="px-3 py-1 rounded-md border">+100%</button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="aspect-square rounded-lg bg-checkerboard" />
        <div className="text-sm">
          <div className="font-semibold mb-1">Moves</div>
          <div className="h-56 overflow-auto rounded border p-2 space-y-1">
            {moves.map(m=> <div key={m.id} className="font-mono text-xs">{m.ply}. {m.san}</div>)}
          </div>
          <div className="font-semibold mt-3 mb-1">Raises</div>
          <div className="h-32 overflow-auto rounded border p-2 space-y-1">
            {raises.map(r=> <div key={r.id} className="text-xs">Δ {r.amount_delta} → pot {r.pot_after} [{r.accepted === null || r.accepted === undefined ? 'pending' : (r.accepted ? 'accepted' : 'refused')}]</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
