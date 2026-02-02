import { useGradientStudio } from "../providers";

export function ShapeParams() {
  const { currentShape, shapeParams, setShapeParams } = useGradientStudio();

  if (!currentShape) return null;

  if (
    currentShape === "star" ||
    currentShape === "star6" ||
    currentShape === "star8"
  ) {
    return (
      <div className="bg-[#FF6B35] brutal-border brutal-shadow p-3">
        <h2 className="text-lg font-bold mb-2 uppercase text-black">
          Paramètres Étoile
        </h2>
        <div className="mb-2">
          <label className="block mb-1 font-bold text-sm flex justify-between text-black">
            <span>BRANCHES</span>
            <span>{shapeParams.starSpikes || 5}</span>
          </label>
          <input
            type="range"
            min="3"
            max="12"
            value={shapeParams.starSpikes || 5}
            onChange={(e) =>
              setShapeParams({
                ...shapeParams,
                starSpikes: parseInt(e.target.value),
              })
            }
            className="w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-bold text-sm flex justify-between text-black">
            <span>PROFONDEUR</span>
            <span>{shapeParams.starInnerRadius || 50}%</span>
          </label>
          <input
            type="range"
            min="20"
            max="80"
            value={shapeParams.starInnerRadius || 50}
            onChange={(e) =>
              setShapeParams({
                ...shapeParams,
                starInnerRadius: parseInt(e.target.value),
              })
            }
            className="w-full"
          />
        </div>
      </div>
    );
  }

  if (currentShape === "blob") {
    return (
      <div className="bg-[#FF6B35] brutal-border brutal-shadow p-3">
        <h2 className="text-lg font-bold mb-2 uppercase text-black">
          Paramètres Blob
        </h2>
        <div className="mb-2">
          <label className="block mb-1 font-bold text-sm flex justify-between text-black">
            <span>POINTS</span>
            <span>{shapeParams.blobPoints || 8}</span>
          </label>
          <input
            type="range"
            min="4"
            max="16"
            value={shapeParams.blobPoints || 8}
            onChange={(e) =>
              setShapeParams({
                ...shapeParams,
                blobPoints: parseInt(e.target.value),
              })
            }
            className="w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-bold text-sm flex justify-between text-black">
            <span>VARIATION</span>
            <span>{shapeParams.blobVariation || 40}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="80"
            value={shapeParams.blobVariation || 40}
            onChange={(e) =>
              setShapeParams({
                ...shapeParams,
                blobVariation: parseInt(e.target.value),
              })
            }
            className="w-full"
          />
        </div>
      </div>
    );
  }

  if (currentShape === "arrow-up" || currentShape === "arrow-right") {
    return (
      <div className="bg-[#FF6B35] brutal-border brutal-shadow p-3">
        <h2 className="text-lg font-bold mb-2 uppercase text-black">
          Paramètres Flèche
        </h2>
        <div className="mb-2">
          <label className="block mb-1 font-bold text-sm flex justify-between text-black">
            <span>LARGEUR CORPS</span>
            <span>{shapeParams.arrowBodyWidth || 30}%</span>
          </label>
          <input
            type="range"
            min="10"
            max="60"
            value={shapeParams.arrowBodyWidth || 30}
            onChange={(e) =>
              setShapeParams({
                ...shapeParams,
                arrowBodyWidth: parseInt(e.target.value),
              })
            }
            className="w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-bold text-sm flex justify-between text-black">
            <span>LARGEUR TÊTE</span>
            <span>{shapeParams.arrowHeadWidth || 70}%</span>
          </label>
          <input
            type="range"
            min="40"
            max="100"
            value={shapeParams.arrowHeadWidth || 70}
            onChange={(e) =>
              setShapeParams({
                ...shapeParams,
                arrowHeadWidth: parseInt(e.target.value),
              })
            }
            className="w-full"
          />
        </div>
      </div>
    );
  }

  return null;
}
