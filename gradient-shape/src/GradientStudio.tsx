import type { JSX } from "react";
import {
  Header,
  ShapesSelector,
  ColorsAlphaEditor,
  SettingsPanel,
  ActionButtons,
  LayersList,
  CanvasDisplay,
} from "./components";
import "./GradientStudio.css";
import { ActionHeader } from "./components/ActionHeader";

export function GradientShapeStudio(): JSX.Element {
  return (
    <div
      className="h-screen bg-[#FFFDE7] p-3 overflow-hidden"
      style={{ fontFamily: "monospace" }}
    >
      <div className="grid grid-cols-[380px_1fr] gap-4 h-full">
        <div className="space-y-3 overflow-y-auto">
          <Header />
          <ShapesSelector />
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
