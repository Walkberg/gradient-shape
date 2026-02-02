import { useGradientStudio } from "../providers";

export function ActionButtons() {
  const { editingLayer, addLayer, updateLayer, cancelEdit } =
    useGradientStudio();

  return (
    <div className="space-y-2">
      {editingLayer === null ? (
        <button
          className="w-full brutal-button brutal-border brutal-shadow p-2 bg-[#FF6B35] text-black hover:bg-[#E55A24] uppercase font-bold text-lg"
          onClick={addLayer}
        >
          + AJOUTER FORME
        </button>
      ) : (
        <>
          <button
            className="w-full brutal-button brutal-border brutal-shadow p-2 bg-[#00D9FF] text-black hover:bg-[#00B8D9] uppercase font-bold text-lg"
            onClick={updateLayer}
          >
            ✓ SAUVEGARDER
          </button>
          <button
            className="w-full brutal-button brutal-border brutal-shadow p-2 bg-white text-black hover:bg-[#FFFDE7] uppercase font-bold text-lg"
            onClick={cancelEdit}
          >
            ✕ ANNULER
          </button>
        </>
      )}
    </div>
  );
}
