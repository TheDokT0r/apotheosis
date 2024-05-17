import "./Wounds.scss";

interface XSymbolProps {
  left: number;
  top: number;
}

export default function XSymbol({ left, top }: XSymbolProps) {
  return (
    <span style={{ left: left + "%", top: top + "%" }} className="x-symbol">
      X
    </span>
  );
}
