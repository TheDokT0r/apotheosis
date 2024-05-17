import "./Wounds.scss";

interface XSymbolProps {
  left: string;
  top: string;
  pressedX: string | null;
  setPressedX: (newX: string | null) => void;
  uid: string;
}

export default function XSymbol({
  left,
  top,
  pressedX,
  setPressedX,
  uid,
}: XSymbolProps) {
  const onXClick = () => {
    if (pressedX === uid) {
      setPressedX(null);
      return;
    }

    setPressedX(uid);
  };

  const getColor = () => {
    if (pressedX === uid) return "white";
    return "";
  };

  return (
    <span
      onClick={onXClick}
      style={{ left, top, color: getColor() }}
      className="x-symbol"
    >
      X
    </span>
  );
}
