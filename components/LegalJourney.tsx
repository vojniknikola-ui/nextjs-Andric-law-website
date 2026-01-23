const HERO_BG_URL =
  'https://6c173bpkbtxg84ji.public.blob.vercel-storage.com/site/hero-lawyer-office-7gAa7FO4H3gsBx4ym2BFeuXY1nWq0o.jpg';

export function LegalJourney() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG_URL})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/70 via-slate-900/60 to-slate-950/70" />
      </div>
      <div
        className="relative h-64 sm:h-80 lg:h-96"
        role="img"
        aria-label="Hero slika advokatske kancelarije"
      />
    </div>
  );
}
