export const RandomButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="brutal-border-thin brutal-shadow-xs p-1 bg-white hover:bg-[#FFFDE7] text-lg"
      title="Randomiser réglages"
    >
      🎲
    </button>
  );
};
