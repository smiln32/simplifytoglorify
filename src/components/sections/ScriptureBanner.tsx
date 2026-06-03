export default function ScriptureBanner() {
  return (
    <section className="scripture-banner py-6 lg:py-8 bg-slate-blue">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="w-12 h-px mx-auto mb-4 bg-white/40" />
        <p className="font-display text-2xl sm:text-3xl lg:text-4xl italic leading-snug text-white">
          "Be still and know that I am God."
        </p>
        <p className="mt-5 text-sm tracking-widest uppercase font-body text-white">
          Psalm 46:10
        </p>
        <div className="w-12 h-px mx-auto mt-4 bg-white/40" />
      </div>
    </section>
  );
}
