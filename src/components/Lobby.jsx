import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function Lobby({ token, onAuthed, wallet }) {
  const [stake, setStake] = useState(100);
  const [tc, setTc] = useState('3+2');
  const [status, setStatus] = useState('idle');
  const [match, setMatch] = useState(null);
  const [code, setCode] = useState('');

  async function pollMatch() {
    // noop for now
  }

  async function joinQueue() {
    setStatus('queue');
    const r = await fetch(`${API}/queue/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ stake, time_control: tc, private_code: code || null })
    }).then(r => r.json());
    if (r.matched) {
      setMatch(r.match);
      setStatus('matched');
    } else {
      setStatus('waiting');
    }
  }

  async function leaveQueue() {
    await fetch(`${API}/queue/leave`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
    setStatus('idle');
  }

  return (
    <div className="w-full grid md:grid-cols-[1fr,380px] gap-8">
      <div className="space-y-4">
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-semibold mb-2">Quick Play</h3>
          <div className="flex flex-wrap items-center gap-3">
            <label className="text-sm">Stake</label>
            <select className="px-2 py-1 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent" value={stake} onChange={e=>setStake(parseInt(e.target.value))}>
              {[50,100,250,500].map(v=> <option key={v} value={v}>{v} VC</option>)}
            </select>
            <label className="text-sm ml-2">Time</label>
            <select className="px-2 py-1 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent" value={tc} onChange={e=>setTc(e.target.value)}>
              {['3+2','5+0','10+5'].map(v=> <option key={v} value={v}>{v}</option>)}
            </select>
            <input placeholder="Private code (optional)" value={code} onChange={e=>setCode(e.target.value)} className="px-2 py-1 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent flex-1" />
            {status==='idle' && <button onClick={joinQueue} className="px-4 py-1.5 rounded-md bg-indigo-600 text-white">Play</button>}
            {status!=='idle' && <button onClick={leaveQueue} className="px-4 py-1.5 rounded-md border border-zinc-300 dark:border-zinc-700">Leave</button>}
          </div>
          {status==='waiting' && <p className="text-sm text-zinc-500 mt-2">Searching for an opponent...</p>}
          {status==='matched' && match && <div className="mt-3 text-sm">Matched! Match ID: <span className="font-mono">{match.id}</span></div>}
        </div>
      </div>
      <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 h-max">
        <h3 className="font-semibold mb-2">Wallet</h3>
        {wallet ? (
          <div className="text-sm space-y-1">
            <div>Balance: <b>{wallet.soft_balance}</b> VC</div>
            <div>On Hold: <b>{wallet.hold_soft}</b> VC</div>
          </div>
        ) : <p className="text-sm text-zinc-500">Sign in to see your wallet.</p>}
      </div>
    </div>
  );
}
