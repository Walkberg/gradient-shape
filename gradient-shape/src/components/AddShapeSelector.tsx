import { useGradientStudio } from "../providers";
import { ShapePicker } from "./ShapePicker";

export function AddShapeSelector() {
  const { shapes, addLayerWithShape } = useGradientStudio();

  return (
    <div className="bg-[#00D9FF] brutal-border brutal-shadow p-3">
      <h2 className="text-lg font-bold mb-2 uppercase text-black">Formes</h2>
      <ShapePicker shapes={shapes} onSelect={addLayerWithShape} />
    </div>
  );
}
