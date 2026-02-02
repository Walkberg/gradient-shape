import { useGradientStudio } from "../providers";
import { ShapeParamsFactory } from "../utils/ShapeParamsFactory";
import { ShapeParamsUIFactory } from "../utils/ShapeParamsUIFactory";

export function ShapeParams() {
  const { currentShape, shapeParams, setShapeParams } = useGradientStudio();

  if (!currentShape) return null;

  const config = ShapeParamsUIFactory.getConfig(currentShape);
  if (!config) return null;

  const defaultParams = ShapeParamsFactory.getDefaultParams(currentShape);

  return (
    <div className="bg-[#FF6B35] brutal-border brutal-shadow p-3">
      <h2 className="text-lg font-bold mb-2 uppercase text-black">
        {config.title}
      </h2>
      {config.params.map((param) => {
        const value = shapeParams[param.key] ?? defaultParams[param.key];
        return (
          <div key={param.key} className="mb-2">
            <label className="block mb-1 font-bold text-sm flex justify-between text-black">
              <span>{param.label}</span>
              <span>
                {value}
                {param.unit || ""}
              </span>
            </label>
            <input
              type="range"
              min={param.min}
              max={param.max}
              value={value}
              onChange={(e) =>
                setShapeParams({
                  ...shapeParams,
                  [param.key]: parseInt(e.target.value),
                })
              }
              className="w-full"
            />
          </div>
        );
      })}
    </div>
  );
}
