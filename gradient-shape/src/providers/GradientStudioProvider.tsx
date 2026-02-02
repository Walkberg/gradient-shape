import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  type ReactNode,
  type RefObject,
  type DragEvent,
  type JSX,
} from "react";

export type RGB = { r: number; g: number; b: number };

export interface Layer {
  id: number;
  shape: string;
  colors: string[];
  alphas: number[];
  noiseIntensity: number;
  noiseScale: number;
  rotation: number;
  blur: number;
}

export interface Shape {
  id: string;
  name: string;
  icon: string;
}

interface GradientStudioContextType {
  canvasRef: RefObject<HTMLCanvasElement>;
  canvasSize: number;
  setCanvasSize: (size: number) => void;
  currentShape: string | null;
  setCurrentShape: (shape: string | null) => void;
  layers: Layer[];
  colors: string[];
  setColors: (colors: string[]) => void;
  alphas: number[];
  setAlphas: (alphas: number[]) => void;
  noiseIntensity: number;
  setNoiseIntensity: (intensity: number) => void;
  noiseScale: number;
  setNoiseScale: (scale: number) => void;
  rotation: number;
  setRotation: (rotation: number) => void;
  blur: number;
  setBlur: (blur: number) => void;
  editingLayer: number | null;
  draggedLayer: number | null;
  shapes: Shape[];
  addLayer: () => void;
  editLayer: (layer: Layer) => void;
  updateLayer: () => void;
  cancelEdit: () => void;
  removeLayer: (id: number) => void;
  clearAll: () => void;
  handleDragStart: (e: DragEvent<HTMLDivElement>, index: number) => void;
  handleDragOver: (e: DragEvent<HTMLDivElement>, index: number) => void;
  handleDragEnd: () => void;
  randomize: () => void;
  download: () => void;
}

const GradientStudioContext = createContext<GradientStudioContextType | null>(
  null,
);

export function useGradientStudio(): GradientStudioContextType {
  const context = useContext(GradientStudioContext);
  if (!context) {
    throw new Error(
      "useGradientStudio must be used within GradientStudioProvider",
    );
  }
  return context;
}

interface GradientStudioProviderProps {
  children: ReactNode;
}

export function GradientStudioProvider({
  children,
}: GradientStudioProviderProps): JSX.Element {
  const canvasRef: RefObject<HTMLCanvasElement> =
    useRef<HTMLCanvasElement | null>(null);

  const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const [canvasSize, setCanvasSize] = useState<number>(() =>
    loadFromStorage("gradientStudio.canvasSize", 800),
  );
  const [currentShape, setCurrentShape] = useState<string | null>(() =>
    loadFromStorage("gradientStudio.currentShape", null),
  );
  const [layers, setLayers] = useState<Layer[]>(() =>
    loadFromStorage("gradientStudio.layers", []),
  );
  const [colors, setColors] = useState<string[]>(() =>
    loadFromStorage("gradientStudio.colors", [
      "#FFD700",
      "#00FFD9",
      "#FF6B9D",
      "#9D4EDD",
    ]),
  );
  const [alphas, setAlphas] = useState<number[]>(() =>
    loadFromStorage("gradientStudio.alphas", [100, 100, 100, 100]),
  );
  const [noiseIntensity, setNoiseIntensity] = useState<number>(() =>
    loadFromStorage("gradientStudio.noiseIntensity", 25),
  );
  const [noiseScale, setNoiseScale] = useState<number>(() =>
    loadFromStorage("gradientStudio.noiseScale", 80),
  );
  const [rotation, setRotation] = useState<number>(() =>
    loadFromStorage("gradientStudio.rotation", 0),
  );
  const [blur, setBlur] = useState<number>(() =>
    loadFromStorage("gradientStudio.blur", 40),
  );
  const [editingLayer, setEditingLayer] = useState<number | null>(null);
  const [draggedLayer, setDraggedLayer] = useState<number | null>(null);

  const shapes: Shape[] = [
    { id: "circle", name: "Cercle", icon: "●" },
    { id: "heart", name: "Cœur", icon: "♥" },
    { id: "halfmoon", name: "Demi-lune", icon: "◐" },
    { id: "ellipse", name: "Ellipse", icon: "⬭" },
    { id: "blob", name: "Blob", icon: "◉" },
    { id: "star", name: "Étoile", icon: "★" },
    { id: "drop", name: "Goutte", icon: "💧" },
  ];

  useEffect(() => {
    updateCanvas();
  }, [layers, canvasSize]);

  useEffect(() => {
    localStorage.setItem(
      "gradientStudio.canvasSize",
      JSON.stringify(canvasSize),
    );
  }, [canvasSize]);

  useEffect(() => {
    localStorage.setItem(
      "gradientStudio.currentShape",
      JSON.stringify(currentShape),
    );
  }, [currentShape]);

  useEffect(() => {
    localStorage.setItem("gradientStudio.layers", JSON.stringify(layers));
  }, [layers]);

  useEffect(() => {
    localStorage.setItem("gradientStudio.colors", JSON.stringify(colors));
  }, [colors]);

  useEffect(() => {
    localStorage.setItem("gradientStudio.alphas", JSON.stringify(alphas));
  }, [alphas]);

  useEffect(() => {
    localStorage.setItem(
      "gradientStudio.noiseIntensity",
      JSON.stringify(noiseIntensity),
    );
  }, [noiseIntensity]);

  useEffect(() => {
    localStorage.setItem(
      "gradientStudio.noiseScale",
      JSON.stringify(noiseScale),
    );
  }, [noiseScale]);

  useEffect(() => {
    localStorage.setItem("gradientStudio.rotation", JSON.stringify(rotation));
  }, [rotation]);

  useEffect(() => {
    localStorage.setItem("gradientStudio.blur", JSON.stringify(blur));
  }, [blur]);

  const updateCanvas = (): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
      willReadFrequently: true,
    });
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    layers.forEach((layer) => {
      drawLayer(ctx, layer);
    });
  };

  const hexToRgb = (hex: string): RGB | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const perlinNoise = (x: number, y: number): number => {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;

    x -= Math.floor(x);
    y -= Math.floor(y);

    const u = fade(x);
    const v = fade(y);

    const p = new Array(512);
    const permutation = [
      151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225,
      140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247,
      120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177,
      33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165,
      71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211,
      133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25,
      63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196,
      135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217,
      226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206,
      59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248,
      152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22,
      39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218,
      246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241,
      81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157,
      184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93,
      222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180,
    ];

    for (let i = 0; i < 256; i++) {
      p[256 + i] = p[i] = permutation[i];
    }

    const A = p[X] + Y;
    const B = p[X + 1] + Y;

    return lerp(
      v,
      lerp(u, grad(p[A], x, y), grad(p[B], x - 1, y)),
      lerp(u, grad(p[A + 1], x, y - 1), grad(p[B + 1], x - 1, y - 1)),
    );
  };

  const fade = (t: number): number => t * t * t * (t * (t * 6 - 15) + 10);

  const lerp = (t: number, a: number, b: number): number => a + t * (b - a);

  const grad = (hash: number, x: number, y: number): number => {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : h === 12 || h === 14 ? x : 0;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  };

  const drawShape = (
    ctx: CanvasRenderingContext2D,
    shape: string,
    x: number,
    y: number,
    size: number,
  ): void => {
    ctx.beginPath();

    switch (shape) {
      case "circle":
        ctx.arc(x, y, size, 0, Math.PI * 2);
        break;

      case "heart":
        const topCurveHeight = size * 0.3;
        ctx.moveTo(x, y + topCurveHeight);
        ctx.bezierCurveTo(
          x,
          y,
          x - size / 2,
          y - size / 2,
          x - size,
          y + topCurveHeight,
        );
        ctx.bezierCurveTo(
          x - size,
          y + (size + topCurveHeight) / 2,
          x,
          y + size * 1.3,
          x,
          y + size * 1.7,
        );
        ctx.bezierCurveTo(
          x,
          y + size * 1.3,
          x + size,
          y + (size + topCurveHeight) / 2,
          x + size,
          y + topCurveHeight,
        );
        ctx.bezierCurveTo(
          x + size / 2,
          y - size / 2,
          x,
          y,
          x,
          y + topCurveHeight,
        );
        break;

      case "halfmoon":
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.arc(x + size * 0.3, y, size * 0.8, 0, Math.PI * 2, true);
        break;

      case "ellipse":
        ctx.ellipse(x, y, size * 1.3, size * 0.7, 0, 0, Math.PI * 2);
        break;

      case "drop":
        ctx.moveTo(x, y - size);
        ctx.bezierCurveTo(
          x + size * 0.6,
          y - size * 0.8,
          x + size,
          y - size * 0.3,
          x + size,
          y + size * 0.3,
        );
        ctx.bezierCurveTo(
          x + size,
          y + size * 0.8,
          x + size * 0.5,
          y + size * 1.2,
          x,
          y + size * 1.2,
        );
        ctx.bezierCurveTo(
          x - size * 0.5,
          y + size * 1.2,
          x - size,
          y + size * 0.8,
          x - size,
          y + size * 0.3,
        );
        ctx.bezierCurveTo(
          x - size,
          y - size * 0.3,
          x - size * 0.6,
          y - size * 0.8,
          x,
          y - size,
        );
        break;

      case "blob":
        const points = 8;
        const seed = 12345;
        let random = seed;
        const seededRandom = () => {
          random = (random * 9301 + 49297) % 233280;
          return random / 233280;
        };

        for (let i = 0; i <= points; i++) {
          const angle = (i / points) * Math.PI * 2;
          const radius = size * (0.8 + seededRandom() * 0.4);
          const px = x + Math.cos(angle) * radius;
          const py = y + Math.sin(angle) * radius;

          if (i === 0) {
            ctx.moveTo(px, py);
          } else {
            const prevAngle = ((i - 1) / points) * Math.PI * 2;
            const prevRadius = size * (0.8 + seededRandom() * 0.4);
            const cpx =
              x +
              ((Math.cos((angle + prevAngle) / 2) * (radius + prevRadius)) /
                2) *
                1.2;
            const cpy =
              y +
              ((Math.sin((angle + prevAngle) / 2) * (radius + prevRadius)) /
                2) *
                1.2;
            ctx.quadraticCurveTo(cpx, cpy, px, py);
          }
        }
        break;

      case "star":
        const spikes = 5;
        const outerRadius = size;
        const innerRadius = size * 0.5;

        for (let i = 0; i < spikes * 2; i++) {
          const angle = (i * Math.PI) / spikes - Math.PI / 2;
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const px = x + Math.cos(angle) * radius;
          const py = y + Math.sin(angle) * radius;

          if (i === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.closePath();
        break;
    }

    ctx.fill();
  };

  const drawLayer = (ctx: CanvasRenderingContext2D, layer: Layer): void => {
    const size = canvasSize;
    const centerX = size / 2;
    const centerY = size / 2;

    ctx.save();

    ctx.translate(centerX, centerY);
    ctx.rotate((layer.rotation * Math.PI) / 180);
    ctx.translate(-centerX, -centerY);

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = size;
    tempCanvas.height = size;
    const tempCtx = tempCanvas.getContext("2d", { alpha: true });

    if (tempCtx) {
      const gradient = tempCtx.createLinearGradient(0, 0, size, size);
      layer.colors.forEach((color, idx) => {
        const rgb = hexToRgb(color) || { r: 0, g: 0, b: 0 };
        const alpha = layer.alphas[idx] / 100;
        const stop = idx / Math.max(1, layer.colors.length - 1);
        gradient.addColorStop(
          stop,
          `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`,
        );
      });

      tempCtx.fillStyle = gradient;
      drawShape(tempCtx, layer.shape, centerX, centerY, size * 0.35);

      ctx.filter = `blur(${layer.blur}px)`;
      ctx.drawImage(tempCanvas, 0, 0);
      ctx.filter = "none";

      const imageData = ctx.getImageData(0, 0, size, size);
      const data = imageData.data;
      const intensity = layer.noiseIntensity / 100;
      const scale = layer.noiseScale;

      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const i = (y * size + x) * 4;

          const noise = perlinNoise(x / scale, y / scale) * intensity * 255;

          if (data[i + 3] > 0) {
            data[i] = Math.max(0, Math.min(255, data[i] + noise));
            data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
            data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
    }

    ctx.restore();
  };

  const addLayer = (): void => {
    if (!currentShape) {
      alert("Sélectionne une forme d'abord !");
      return;
    }

    const layer: Layer = {
      shape: currentShape,
      colors: [...colors],
      alphas: [...alphas],
      noiseIntensity,
      noiseScale,
      rotation,
      blur,
      id: Date.now(),
    };

    setLayers([...layers, layer]);
    setEditingLayer(null);
  };

  const editLayer = (layer: Layer): void => {
    setEditingLayer(layer.id);
    setCurrentShape(layer.shape);
    setColors([...layer.colors]);
    setAlphas([...layer.alphas]);
    setNoiseIntensity(layer.noiseIntensity);
    setNoiseScale(layer.noiseScale);
    setRotation(layer.rotation);
    setBlur(layer.blur);
  };

  const updateLayer = (): void => {
    if (editingLayer === null) return;

    const updatedLayers = layers.map((layer) => {
      if (layer.id === editingLayer) {
        return {
          ...layer,
          shape: currentShape || layer.shape,
          colors: [...colors],
          alphas: [...alphas],
          noiseIntensity,
          noiseScale,
          rotation,
          blur,
        };
      }
      return layer;
    });

    setLayers(updatedLayers);
    setEditingLayer(null);
  };

  const cancelEdit = (): void => {
    setEditingLayer(null);
    setCurrentShape(null);
  };

  const removeLayer = (id: number): void => {
    setLayers(layers.filter((l) => l.id !== id));
    if (editingLayer === id) {
      setEditingLayer(null);
    }
  };

  const clearAll = (): void => {
    setLayers([]);
    setEditingLayer(null);
  };

  const handleDragStart = (
    e: DragEvent<HTMLDivElement>,
    index: number,
  ): void => {
    setDraggedLayer(index);
    if (e.dataTransfer) e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (
    e: DragEvent<HTMLDivElement>,
    index: number,
  ): void => {
    e.preventDefault();
    if (draggedLayer === null || draggedLayer === index) return;

    const newLayers = [...layers];
    const draggedItem = newLayers[draggedLayer];
    newLayers.splice(draggedLayer, 1);
    newLayers.splice(index, 0, draggedItem);

    setLayers(newLayers);
    setDraggedLayer(index);
  };

  const handleDragEnd = (): void => {
    setDraggedLayer(null);
  };

  const randomize = (): void => {
    const shapeIds = shapes.map((s) => s.id);
    const numLayers = Math.floor(Math.random() * 3) + 2;

    const newLayers: Layer[] = [];
    for (let i = 0; i < numLayers; i++) {
      newLayers.push({
        shape: shapeIds[Math.floor(Math.random() * shapeIds.length)],
        colors: [randomColor(), randomColor(), randomColor(), randomColor()],
        alphas: [
          Math.floor(Math.random() * 40) + 60,
          Math.floor(Math.random() * 40) + 60,
          Math.floor(Math.random() * 40) + 60,
          Math.floor(Math.random() * 40) + 60,
        ],
        noiseIntensity: Math.floor(Math.random() * 30) + 15,
        noiseScale: Math.floor(Math.random() * 60) + 60,
        rotation: Math.floor(Math.random() * 360),
        blur: Math.floor(Math.random() * 30) + 30,
        id: Date.now() + i,
      });
    }

    setLayers(newLayers);
    setEditingLayer(null);
  };

  const randomColor = (): string => {
    const hue = Math.floor(Math.random() * 360);
    const sat = Math.floor(Math.random() * 50) + 50;
    const light = Math.floor(Math.random() * 30) + 40;

    const hslToHex = (h: number, s: number, l: number): string => {
      l /= 100;
      const a = (s * Math.min(l, 1 - l)) / 100;
      const f = (n: number): string => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color)
          .toString(16)
          .padStart(2, "0");
      };
      return `#${f(0)}${f(8)}${f(4)}`;
    };

    return hslToHex(hue, sat, light);
  };

  const download = (): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `gradient-shape-${Date.now()}.png`;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  const value: GradientStudioContextType = {
    canvasRef,
    canvasSize,
    setCanvasSize,
    currentShape,
    setCurrentShape,
    layers,
    colors,
    setColors,
    alphas,
    setAlphas,
    noiseIntensity,
    setNoiseIntensity,
    noiseScale,
    setNoiseScale,
    rotation,
    setRotation,
    blur,
    setBlur,
    editingLayer,
    draggedLayer,
    shapes,
    addLayer,
    editLayer,
    updateLayer,
    cancelEdit,
    removeLayer,
    clearAll,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    randomize,
    download,
  };

  return (
    <GradientStudioContext.Provider value={value}>
      {children}
    </GradientStudioContext.Provider>
  );
}
