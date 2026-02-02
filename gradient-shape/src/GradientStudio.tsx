import type { JSX } from "react";
import { useGradientStudio } from "./providers/GradientStudioProvider";
import "./GradientStudio.css";

export function GradientShapeStudio(): JSX.Element {
  const {
    canvasRef,
    canvasSize,
    setCanvasSize,
    currentShape,
    setCurrentShape,
    layers,
    colors,
    setColors,
    alphas,
    setAlphas,
    noiseIntensity,
    setNoiseIntensity,
    noiseScale,
    setNoiseScale,
    rotation,
    setRotation,
    blur,
    setBlur,
    editingLayer,
    draggedLayer,
    shapes,
    addLayer,
    editLayer,
    updateLayer,
    cancelEdit,
    removeLayer,
    clearAll,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    randomize,
    download,
  } = useGradientStudio();

  return (
    <div
      className="h-screen bg-[#FFFDE7] p-3 overflow-hidden"
      style={{ fontFamily: "monospace" }}
    >
      <div className="grid grid-cols-[380px_1fr] gap-4 h-full">
        <div className="space-y-3 overflow-y-auto">
          <header>
            <div className="bg-[#FF6B35] brutal-border brutal-shadow p-3">
              <h1 className="text-2xl font-bold mb-1">GRADIENT STUDIO</h1>
              <p className="text-sm">Gradients + Noise + Alpha = 🔥</p>
            </div>
          </header>
          <div className="bg-[#00D9FF] brutal-border brutal-shadow p-3">
            <h2 className="text-lg font-bold mb-2 uppercase text-black">
              Formes{" "}
              {editingLayer && <span className="text-xs">(Édition)</span>}
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {shapes.map((shape) => (
                <button
                  key={shape.id}
                  onClick={() => setCurrentShape(shape.id)}
                  className={`shape-btn brutal-border-thin brutal-shadow-xs p-2 bg-white font-bold text-2xl ${
                    currentShape === shape.id ? "active" : ""
                  }`}
                >
                  {shape.icon}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-[#F7931E] brutal-border brutal-shadow p-3">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold uppercase text-black">
                Couleurs + Alpha
              </h2>
              <button
                onClick={() => {
                  const randomColor = () => {
                    const hue = Math.floor(Math.random() * 360);
                    const sat = Math.floor(Math.random() * 50) + 50;
                    const light = Math.floor(Math.random() * 30) + 40;
                    const hslToHex = (h: number, s: number, l: number): string => {
                      l /= 100;
                      const a = (s * Math.min(l, 1 - l)) / 100;
                      const f = (n: number): string => {
                        const k = (n + h / 30) % 12;
                        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
                        return Math.round(255 * color)
                          .toString(16)
                          .padStart(2, "0");
                      };
                      return `#${f(0)}${f(8)}${f(4)}`;
                    };
                    return hslToHex(hue, sat, light);
                  };
                  setColors([randomColor(), randomColor(), randomColor(), randomColor()]);
                  setAlphas([
                    Math.floor(Math.random() * 40) + 60,
                    Math.floor(Math.random() * 40) + 60,
                    Math.floor(Math.random() * 40) + 60,
                    Math.floor(Math.random() * 40) + 60,
                  ]);
                }}
                className="brutal-border-thin brutal-shadow-xs p-1 bg-white hover:bg-[#FFFDE7] text-lg"
                title="Randomiser couleurs"
              >
                🎲
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {colors.map((color, index) => (
                <div key={index} className="flex items-center gap-1">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => {
                      const newColors = [...colors];
                      newColors[index] = e.target.value;
                      setColors(newColors);
                    }}
                    className="w-12 h-8"
                  />
                  <div className="bg-white brutal-border-thin px-2 flex items-center justify-center font-bold text-xs flex-1">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={alphas[index]}
                      onChange={(e) => {
                        const newAlphas = [...alphas];
                        newAlphas[index] = parseInt(e.target.value) || 0;
                        setAlphas(newAlphas);
                      }}
                      className="w-full text-center border-0 bg-transparent"
                      style={{ outline: "none" }}
                    />
                    <span>%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#7B2FBE] text-white brutal-border brutal-shadow p-3">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold uppercase">Réglages</h2>
              <button
                onClick={() => {
                  setNoiseIntensity(Math.floor(Math.random() * 30) + 15);
                  setNoiseScale(Math.floor(Math.random() * 60) + 60);
                  setRotation(Math.floor(Math.random() * 360));
                  setBlur(Math.floor(Math.random() * 30) + 30);
                }}
                className="brutal-border-thin brutal-shadow-xs p-1 bg-white hover:bg-[#FFFDE7] text-lg"
                title="Randomiser réglages"
              >
                🎲
              </button>
            </div>

            <div className="mb-2">
              <label className="block mb-1 font-bold text-sm flex justify-between">
                <span>NOISE</span>
                <span>{noiseIntensity}</span>
              </label>
              <input
                type="range"
                min="0"
                max="60"
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
          <div className="space-y-2">
            {editingLayer ? (
              <>
                <button
                  onClick={updateLayer}
                  className="w-full bg-[#00D9FF] brutal-border brutal-shadow hover-lift p-2 font-bold text-lg uppercase text-black"
                >
                  ✓ SAUVEGARDER
                </button>
                <button
                  onClick={cancelEdit}
                  className="w-full bg-white brutal-border brutal-shadow hover-lift p-2 font-bold text-lg uppercase text-black"
                >
                  ✕ ANNULER
                </button>
              </>
            ) : (
              <button
                onClick={addLayer}
                className="w-full bg-[#FF6B35] brutal-border brutal-shadow hover-lift p-2 font-bold text-lg uppercase text-black"
              >
                + AJOUTER FORME
              </button>
            )}
          </div>
          {layers.length > 0 && (
            <div className="bg-white brutal-border brutal-shadow p-3">
              <h2 className="text-lg font-bold mb-2 uppercase text-black">
                Calques ({layers.length})
                <span className="text-sm block mt-1">
                  Glisse pour réordonner
                </span>
              </h2>
              <div className="space-y-2">
                {layers.map((layer, index) => (
                  <div
                    key={layer.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`layer-item flex justify-between items-center bg-[#FFFDE7] brutal-border-thin p-3 ${
                      draggedLayer === index ? "layer-dragging" : ""
                    } ${editingLayer === layer.id ? "bg-[#FFF9C4]" : ""}`}
                  >
                    <span className="font-bold text-black">
                      #{index + 1} -{" "}
                      {shapes.find((s) => s.id === layer.shape)?.name}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => editLayer(layer)}
                        className="bg-[#00D9FF] brutal-border-thin px-3 py-1 font-bold hover:bg-[#00B8D9] text-black"
                      >
                        ✎
                      </button>
                      <button
                        onClick={() => removeLayer(layer.id)}
                        className="bg-[#FF6B35] brutal-border-thin px-3 py-1 font-bold hover:bg-red-600 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="space-y-3 flex flex-col h-full">
          <div className="space-y-2 flex-shrink-0">
            <button
              onClick={randomize}
              className="w-full bg-[#00D9FF] brutal-border brutal-shadow hover-lift p-2 font-bold text-lg uppercase text-black"
            >
              🎲 ALÉATOIRE
            </button>

            <button
              onClick={clearAll}
              className="w-full bg-white brutal-border brutal-shadow hover-lift p-2 font-bold text-lg uppercase text-black"
            >
              🗑️ EFFACER TOUT
            </button>

            <button
              onClick={download}
              className="w-full bg-[#F7931E] brutal-border brutal-shadow hover-lift p-2 font-bold text-lg uppercase text-black"
            >
              ⬇️ TÉLÉCHARGER PNG
            </button>
          </div>
          <div className="bg-white brutal-border brutal-shadow p-4 canvas-checker flex items-center justify-center flex-1 overflow-hidden">
            <canvas
              ref={canvasRef}
              width={canvasSize}
              height={canvasSize}
              className="brutal-border brutal-shadow-sm max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
