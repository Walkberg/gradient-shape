import { useGradientStudio } from "../providers";
import { EditShapeSelector } from "./EditShapeSelector";
import { ColorsAlphaEditor } from "./ColorsAlphaEditor";
import { ShapeParams } from "./ShapeParams";
import { SettingsPanel } from "./SettingsPanel";

export function EditPanel() {
  const { editingLayer, layers } = useGradientStudio();

  if (editingLayer === null) {
    return (
      <div className="bg-[#FFFDE7] brutal-border brutal-shadow p-6 flex items-center justify-center h-full">
        <p className="text-gray-500 text-lg font-bold">
          Sélectionne un calque pour l'éditer
        </p>
      </div>
    );
  }

  const layer = layers.find((l) => l.id === editingLayer);
  if (!layer) return null;

  return (
    <div className="bg-[#FFFDE7] p-4 space-y-3 overflow-y-auto h-full">
      <EditShapeSelector />
      <ShapeParams />
      <ColorsAlphaEditor />
      <SettingsPanel />
    </div>
  );
}
