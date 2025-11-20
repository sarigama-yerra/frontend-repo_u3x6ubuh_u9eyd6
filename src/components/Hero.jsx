import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/UGnf9D1Hp3OG8vSG/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent dark:from-zinc-950 dark:via-zinc-950/50 pointer-events-none" />
      <div className="relative z-10 p-8 md:p-12 flex flex-col gap-4 max-w-2xl">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Raise the stakes on every move.</h1>
        <p className="text-zinc-600 dark:text-zinc-300">FIDE-legal chess with live, virtual stakes. Propose raises before you move. Opponent refuses? Instant loss. Pure VC. No cash-out.</p>
      </div>
    </div>
  );
}
