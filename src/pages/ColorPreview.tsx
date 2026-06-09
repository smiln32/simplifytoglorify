import { useState } from 'react';
import { categoryColors as defaultColors } from '@/data/categoryColors';

export default function ColorPreview() {
  const [colors, setColors] = useState<Record<string, string>>({ ...defaultColors });
  const [copied, setCopied] = useState(false);

  function updateColor(name: string, hex: string) {
    setColors(prev => ({ ...prev, [name]: hex }));
  }

  function copyChanges() {
    const changed = Object.entries(colors)
      .filter(([name, hex]) => hex !== defaultColors[name as keyof typeof defaultColors])
      .map(([name, hex]) => `  '${name}': '${hex}',`)
      .join('\n');

    const all = Object.entries(colors)
      .map(([name, hex]) => `  '${name}': '${hex}',`)
      .join('\n');

    navigator.clipboard.writeText(changed || '// No changes yet');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    console.log('Full palette:\n' + all);
  }

  function resetAll() {
    setColors({ ...defaultColors });
  }

  const changed = Object.entries(colors).filter(
    ([name, hex]) => hex !== defaultColors[name as keyof typeof defaultColors]
  );

  return (
    <div className="min-h-screen bg-white p-8 lg:p-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h1 className="font-display text-3xl text-charcoal">Color Editor</h1>
            <p className="text-muted-slate mt-1">Click any swatch to change its color. Changes are live.</p>
          </div>
          <div className="flex gap-3 mt-1">
            <button
              onClick={resetAll}
              className="px-4 py-2 text-sm border border-charcoal/20 rounded-lg text-muted-slate hover:text-charcoal transition-colors"
            >
              Reset all
            </button>
            <button
              onClick={copyChanges}
              className="px-4 py-2 text-sm bg-slate-blue text-white rounded-lg hover:bg-charcoal transition-colors"
            >
              {copied ? 'Copied!' : `Copy changes${changed.length ? ` (${changed.length})` : ''}`}
            </button>
          </div>
        </div>

        {changed.length > 0 && (
          <div className="mb-8 p-4 bg-white rounded-[12px] text-sm font-mono text-charcoal space-y-1">
            {changed.map(([name, hex]) => (
              <div key={name} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border border-charcoal/10 flex-shrink-0" style={{ backgroundColor: hex }} />
                <span className="text-muted-slate">'{name}':</span>
                <span className="font-semibold">'{hex}'</span>
                <span className="text-muted-slate text-xs">(was {defaultColors[name as keyof typeof defaultColors]})</span>
              </div>
            ))}
          </div>
        )}

        {/* Swatches with pickers */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mb-12">
          {Object.entries(colors).map(([name, hex]) => (
            <label key={name} className="flex flex-col gap-2 cursor-pointer group">
              <div className="relative">
                <div
                  className="w-full h-16 rounded-[12px] border-2 border-transparent group-hover:border-charcoal/20 transition-all"
                  style={{ backgroundColor: hex }}
                />
                <input
                  type="color"
                  value={hex}
                  onChange={(e) => updateColor(name, e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <div>
                <p className="font-display text-sm text-charcoal leading-tight">{name}</p>
                <p className="text-xs font-mono text-muted-slate">{hex}</p>
              </div>
            </label>
          ))}
        </div>

        {/* Live pill preview */}
        <div>
          <h2 className="font-display text-xl text-charcoal mb-4">Pills — as they appear on the site</h2>
          <div className="flex flex-wrap gap-3">
            {Object.entries(colors).map(([name, hex]) => (
              <span
                key={name}
                className="px-5 py-2 rounded-full text-sm font-medium border"
                style={{ backgroundColor: `${hex}20`, color: hex, borderColor: hex }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
