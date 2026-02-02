import { useGradientStudio } from "../providers";

export function CanvasDisplay() {
  const { canvasRef, canvasSize } = useGradientStudio();

  return (
    <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
      <div
        className="brutal-border brutal-shadow checker-bg"
        style={{ width: canvasSize, height: canvasSize }}
      >
        <canvas
          ref={canvasRef}
          width={canvasSize}
          height={canvasSize}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
