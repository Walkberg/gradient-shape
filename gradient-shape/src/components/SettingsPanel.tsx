import { useGradientStudio } from "../providers";

export function SettingsPanel() {
  const {
    noiseIntensity,
    setNoiseIntensity,
    noiseScale,
    setNoiseScale,
    blur,
    setBlur,
    rotation,
    setRotation,
    canvasSize,
    setCanvasSize,
  } = useGradientStudio();

  const randomizeSettings = () => {
    setNoiseIntensity(Math.floor(Math.random() * 8) + 1);
    setNoiseScale(Math.floor(Math.random() * 60) + 60);
    setRotation(Math.floor(Math.random() * 360));
    setBlur(Math.floor(Math.random() * 30) + 30);
  };

  return (
    <div className="bg-[#7B2FBE] text-white brutal-border brutal-shadow p-3">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold uppercase">Réglages</h2>
        <button
          onClick={randomizeSettings}
          className="brutal-border-thin brutal-shadow-xs p-1 bg-white hover:bg-[#FFFDE7] text-lg"
          title="Randomiser réglages"
        >
          🎲
        </button>
      </div>

      <div className="mb-2">
        <label className="block mb-1 font-bold text-sm flex justify-between">
          <span>NOISE</span>
          <span>{noiseIntensity}px</span>
        </label>
        <input
          type="range"
          min="0"
          max="8"
          value={noiseIntensity}
          onChange={(e) => setNoiseIntensity(parseInt(e.target.value))}
        />
      </div>

      <div className="mb-2">
        <label className="block mb-1 font-bold text-sm flex justify-between">
          <span>ÉCHELLE NOISE</span>
          <span>{noiseScale}</span>
        </label>
        <input
          type="range"
          min="30"
          max="150"
          value={noiseScale}
          onChange={(e) => setNoiseScale(parseInt(e.target.value))}
        />
      </div>

      <div className="mb-2">
        <label className="block mb-1 font-bold text-sm flex justify-between">
          <span>FLOU</span>
          <span>{blur}px</span>
        </label>
        <input
          type="range"
          min="0"
          max="80"
          value={blur}
          onChange={(e) => setBlur(parseInt(e.target.value))}
        />
      </div>

      <div className="mb-2">
        <label className="block mb-1 font-bold text-sm flex justify-between">
          <span>ROTATION</span>
          <span>{rotation}°</span>
        </label>
        <input
          type="range"
          min="0"
          max="360"
          value={rotation}
          onChange={(e) => setRotation(parseInt(e.target.value))}
        />
      </div>

      <div>
        <label className="block mb-1 font-bold text-sm">TAILLE</label>
        <input
          type="number"
          min="400"
          max="2048"
          step="100"
          value={canvasSize}
          onChange={(e) => setCanvasSize(parseInt(e.target.value))}
        />
      </div>
    </div>
  );
}
