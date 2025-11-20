import { useEffect, useState } from 'react';
import { Wallet, LogIn, LogOut, Trophy, ShoppingBag, Swords } from 'lucide-react';

export default function Navbar({ onSignIn, onSignOut, user, wallet }) {
  return (
    <div className="w-full flex items-center justify-between py-4 px-6 backdrop-blur bg-white/60 dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-20">
      <div className="flex items-center gap-2 text-xl font-semibold">
        <Swords className="w-6 h-6 text-indigo-600" />
        <span>StakeChess</span>
      </div>
      <div className="flex items-center gap-4">
        {wallet && (
          <div className="flex items-center gap-2 text-sm px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-200">
            <Wallet className="w-4 h-4" />
            <span>{wallet.soft_balance} VC</span>
          </div>
        )}
        <a href="#/store" className="text-sm flex items-center gap-1 hover:text-indigo-600"><ShoppingBag className="w-4 h-4" /> Store</a>
        <a href="#/season" className="text-sm flex items-center gap-1 hover:text-indigo-600"><Trophy className="w-4 h-4" /> Season</a>
        {user ? (
          <button onClick={onSignOut} className="text-sm flex items-center gap-1 px-3 py-1 rounded-md border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800">
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        ) : (
          <button onClick={onSignIn} className="text-sm flex items-center gap-1 px-3 py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">
            <LogIn className="w-4 h-4" /> Sign in with Google
          </button>
        )}
      </div>
    </div>
  );
}
