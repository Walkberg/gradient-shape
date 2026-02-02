import { useGradientStudio } from "../providers";

export function LayersList() {
  const {
    layers,
    editingLayer,
    draggedLayer,
    shapes,
    editLayer,
    removeLayer,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useGradientStudio();

  if (layers.length === 0) return null;

  return (
    <div className="bg-white brutal-border brutal-shadow p-3">
      <h2 className="text-lg font-bold mb-2 uppercase text-black">
        Calques ({layers.length})
        <span className="text-sm block mt-1">Glisse pour réordonner</span>
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
              #{index + 1} - {shapes.find((s) => s.id === layer.shape)?.name}
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
  );
}
