import { useGradientStudio } from "../providers";

export function ActionHeader() {
  const { layers, randomize, clearAll, download } = useGradientStudio();

  return (
    <div className="flex space-x-2 mb-2">
      <button
        className="brutal-button brutal-border brutal-shadow p-2 bg-[#06FFA5] text-black hover:bg-[#05DD8F] uppercase font-bold text-sm"
        onClick={randomize}
        title="Randomiser tout"
      >
        🎲 Aléa
      </button>
      <button
        className="brutal-button brutal-border brutal-shadow p-2 bg-[#FFB800] text-black hover:bg-[#DD9F00] uppercase font-bold text-sm"
        onClick={clearAll}
        disabled={layers.length === 0}
      >
        🗑️ Effacer
      </button>
      <button
        className="brutal-button brutal-border brutal-shadow p-2 bg-[#3A86FF] text-white hover:bg-[#2D6ACC] uppercase font-bold text-sm"
        onClick={download}
        disabled={layers.length === 0}
      >
        ⬇️ Sauvegarder
      </button>
    </div>
  );
}
