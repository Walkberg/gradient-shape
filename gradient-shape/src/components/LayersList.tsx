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
            onClick={() => editLayer(layer)}
            className={`layer-item flex justify-between items-center bg-[#FFFDE7] brutal-border-thin p-3 cursor-pointer hover:bg-[#FFF9C4] ${
              draggedLayer === index ? "layer-dragging" : ""
            } ${editingLayer === layer.id ? "bg-[#FFF9C4] ring-4 ring-[#FF6B35]" : ""}`}
          >
            <span className="font-bold text-black">
              #{index + 1} - {shapes.find((s) => s.id === layer.shape)?.name}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeLayer(layer.id);
              }}
              className="brutal-border-thin brutal-shadow-xs px-3 py-1 font-bold hover:bg-red-600 hover:text-white bg-[#FF6B35] text-black"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
