import { useState } from "react";

export const RandomButton = ({ onClick }: { onClick: () => void }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    onClick();
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <button
      onClick={handleClick}
      className={`brutal-border-thin brutal-shadow-xs p-1 bg-white hover:bg-[#FFFDE7] text-lg transition-transform `}
      title="Randomiser réglages"
    >
      <div className={isAnimating ? "animate-spin-fast" : ""}>🎲</div>
    </button>
  );
};
