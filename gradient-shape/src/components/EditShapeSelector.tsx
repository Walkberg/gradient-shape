import { useGradientStudio, type Shape } from "../providers";

export function EditShapeSelector() {
  const { shapes, currentShape, updateEditingLayerProperty, setCurrentShape } =
    useGradientStudio();

  const handleShapeClick = (shapeId: string) => {
    setCurrentShape(shapeId);
    updateEditingLayerProperty("shape", shapeId);
  };

  return (
    <div className="bg-[#00D9FF] brutal-border brutal-shadow p-3">
      <h2 className="text-lg font-bold mb-2 uppercase text-black">
        Changer la forme
      </h2>
      <div className="grid grid-cols-3 gap-2">
        {shapes.map((shape: Shape) => (
          <button
            key={shape.id}
            onClick={() => handleShapeClick(shape.id)}
            className={`shape-btn brutal-border-thin brutal-shadow-xs p-2 font-bold text-2xl transition-colors ${
              currentShape === shape.id
                ? "bg-[#FFF9C4] ring-2 ring-[#FF6B35]"
                : "bg-white hover:bg-[#FFFDE7]"
            }`}
          >
            {shape.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
