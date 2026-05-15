export default function ScriptureBanner() {
  return (
    <section className="scripture-banner py-20 lg:py-28 bg-sage">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="w-12 h-px mx-auto mb-12 bg-sage" />
        <p className="font-display text-2xl sm:text-3xl lg:text-4xl italic leading-snug"
        style={{ color: 'var(--ivory)' }}
        >
          "Be still and know that I am God."
        </p>
        <p className="mt-5 text-sm tracking-widest uppercase font-body text-slate-blue">
          Psalm 46:10
        </p>
        <div className="w-12 h-px mx-auto mt-12 bg-sage" />
      </div>
    </section>
  );
}
