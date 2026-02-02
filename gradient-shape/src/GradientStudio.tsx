import type { JSX } from "react";
import { useEffect } from "react";
import {
  Header,
  ShapesSelector,
  ColorsAlphaEditor,
  SettingsPanel,
  ShapeParams,
  ActionButtons,
  LayersList,
  CanvasDisplay,
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
      <div className="grid grid-cols-[380px_1fr] gap-4 h-full">
        <div className="space-y-3 overflow-y-auto">
          <Header />
          <ShapesSelector />
          <ShapeParams />
          <ColorsAlphaEditor />
          <SettingsPanel />
          <ActionButtons />
          <LayersList />
        </div>
        <div className="flex flex-col">
          <ActionHeader />
          <CanvasDisplay />
        </div>
      </div>
    </div>
  );
}
