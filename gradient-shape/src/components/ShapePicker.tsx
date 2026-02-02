import type { Shape } from "../providers";

interface ShapePickerProps {
  shapes: Shape[];
  onSelect: (shapeId: string) => void;
}
export const ShapePicker = ({ shapes, onSelect }: ShapePickerProps) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {shapes.map((shape: Shape) => (
        <button
          key={shape.id}
          onClick={() => onSelect(shape.id)}
          className="shape-btn brutal-border-thin brutal-shadow-xs p-2 bg-white font-bold text-2xl hover:bg-[#FFFDE7] transition-colors"
        >
          {shape.icon}
        </button>
      ))}
    </div>
  );
};
