import { useGradientStudio, type Shape } from "../providers";

export function ShapesSelector() {
  const { shapes, currentShape, setCurrentShape, editingLayer } =
    useGradientStudio();

  return (
    <div className="bg-[#00D9FF] brutal-border brutal-shadow p-3">
      <h2 className="text-lg font-bold mb-2 uppercase text-black">
        Formes {editingLayer && <span className="text-xs">(Édition)</span>}
      </h2>
      <div className="grid grid-cols-3 gap-2">
        {shapes.map((shape: Shape) => (
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
  );
}
