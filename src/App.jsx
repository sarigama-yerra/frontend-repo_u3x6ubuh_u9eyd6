import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Lobby from './components/Lobby'
import Board from './components/Board'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [user, setUser] = useState(null)
  const [wallet, setWallet] = useState(null)
  const [token, setToken] = useState(null)
  const [matchId, setMatchId] = useState(null)

  async function signIn() {
    // Dev stub: call /auth/exchange with a random email to mint a wallet and get API token
    const seed = Math.random().toString(36).slice(2, 8)
    const email = `chesser-${seed}@example.com`
    const r = await fetch(`${API}/auth/exchange`, { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ email, name: 'Guest', image: '' }) }).then(r=>r.json())
    setToken(r.token)
    setUser(r.user)
  }

  async function signOut() {
    setUser(null); setToken(null); setWallet(null)
  }

  async function loadWallet(tkn) {
    if (!tkn) return
    const w = await fetch(`${API}/me/wallet`, { headers: { Authorization: `Bearer ${tkn}` }}).then(r=>r.json())
    setWallet(w)
  }

  useEffect(()=>{ loadWallet(token) }, [token])

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      <Navbar onSignIn={signIn} onSignOut={signOut} user={user} wallet={wallet} />
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        <Hero />
        <Lobby token={token} onAuthed={()=>{}} wallet={wallet} />
      </main>
    </div>
  )
}

export default App