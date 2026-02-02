import { useGradientStudio } from "../providers";
import { RandomButton } from "./RandomButton";

export function ColorsAlphaEditor() {
  const { colors, setColors, alphas, setAlphas } = useGradientStudio();

  const randomizeColors = () => {
    const randomColor = () => {
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
    setColors([randomColor(), randomColor(), randomColor(), randomColor()]);
    setAlphas([
      Math.floor(Math.random() * 40) + 60,
      Math.floor(Math.random() * 40) + 60,
      Math.floor(Math.random() * 40) + 60,
      Math.floor(Math.random() * 40) + 60,
    ]);
  };

  return (
    <div className="bg-[#F7931E] brutal-border brutal-shadow p-3">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold uppercase text-black">
          Couleurs + Alpha
        </h2>
        <RandomButton onClick={randomizeColors} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {colors.map((color, index) => (
          <div key={index} className="flex items-center gap-1">
            <input
              type="color"
              value={color}
              onChange={(e) => {
                const newColors = [...colors];
                newColors[index] = e.target.value;
                setColors(newColors);
              }}
              className="w-12 h-8"
            />
            <div className="bg-white brutal-border-thin px-2 flex items-center justify-center font-bold text-xs flex-1">
              <input
                type="number"
                min="0"
                max="100"
                value={alphas[index]}
                onChange={(e) => {
                  const newAlphas = [...alphas];
                  newAlphas[index] = parseInt(e.target.value) || 0;
                  setAlphas(newAlphas);
                }}
                className="w-full text-center border-0 bg-transparent"
                style={{ outline: "none" }}
              />
              <span>%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
