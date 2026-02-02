import { useGradientStudio } from "../providers";
import { RandomButton } from "./RandomButton";

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

  const animateValue = (
    current: number,
    target: number,
    setter: (value: number) => void,
    duration: number = 500,
  ) => {
    const startTime = performance.now();
    const diff = target - current;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(current + diff * eased);

      setter(value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const randomizeSettings = () => {
    const targetNoise = Math.floor(Math.random() * 100);
    const targetScale = Math.floor(Math.random() * 10);
    const targetRotation = Math.floor(Math.random() * 360);
    const targetBlur = Math.floor(Math.random() * 30) + 30;

    animateValue(noiseIntensity, targetNoise, setNoiseIntensity);
    animateValue(noiseScale, targetScale, setNoiseScale);
    animateValue(rotation, targetRotation, setRotation);
    animateValue(blur, targetBlur, setBlur);
  };

  return (
    <div className="bg-[#7B2FBE] text-white brutal-border brutal-shadow p-3">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold uppercase">Réglages</h2>
        <RandomButton onClick={randomizeSettings} />
      </div>

      <div className="mb-2">
        <label className="block mb-1 font-bold text-sm flex justify-between">
          <span>NOISE</span>
          <span>{noiseIntensity}%</span>
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={noiseIntensity}
          onChange={(e) => setNoiseIntensity(parseInt(e.target.value))}
        />
      </div>

      <div className="mb-2">
        <label className="block mb-1 font-bold text-sm flex justify-between">
          <span>ÉCHELLE NOISE</span>
          <span>{noiseScale}px</span>
        </label>
        <input
          type="range"
          min="0"
          max="10"
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
