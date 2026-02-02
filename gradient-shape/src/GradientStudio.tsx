import type { JSX } from "react";
import { useEffect } from "react";
import {
  AddShapeSelector,
  LayersList,
  CanvasDisplay,
  EditPanel,
  Header,
} from "./components";
import "./GradientStudio.css";
import { ActionHeader } from "./components/ActionHeader";
import { useGradientStudio } from "./providers";

export function GradientShapeStudio(): JSX.Element {
  const { randomize } = useGradientStudio();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space" && e.target === document.body) {
        e.preventDefault();
        randomize();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [randomize]);

  return (
    <div
      className="h-screen bg-[#FFFDE7] p-3 overflow-hidden"
      style={{ fontFamily: "monospace" }}
    >
      <div className="grid grid-cols-[380px_1fr_380px] gap-4 h-full">
        <div className="space-y-3 overflow-y-auto">
          <Header />
          <AddShapeSelector />
          <LayersList />
        </div>
        <div className="flex flex-col gap-3">
          <ActionHeader />
          <CanvasDisplay />
          <span className="text-s text-gray-500 text-center">
            Appuyez sur <strong>espace</strong> pour générer un nouveau dégradé
            aléatoire
          </span>
        </div>
        <EditPanel />
      </div>
    </div>
  );
}
