import Human from "@/assets/images/Human.png";
import "./Wounds.scss";
import { Button } from "@mui/material";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import SaveIcon from "@mui/icons-material/Save";
import XSymbol from "./XSymbol";
import { useState, MouseEvent, useRef } from "react";

export default function Wounds() {
  const [isAddingNewWound, setIsAddingNewWound] = useState(false);
  const [wounds, setWounds] = useState<CharacterSheet["extras"]["wounds"]>([]);
  const bodyRef = useRef<HTMLDivElement>(null);

  const onBodyClick = (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    if (!isAddingNewWound || !bodyRef.current) return;

    const bounds = bodyRef.current.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    const woundsCopy = [...wounds];
    woundsCopy.push({ position: { x, y }, description: "" });
    setWounds(woundsCopy);
    setIsAddingNewWound(false);
  };

  return (
    <div className="wounds-page">
      <div ref={bodyRef} className="body-map" onClick={onBodyClick}>
        {wounds.sort().map(({ position }, i) => (
          <XSymbol key={i} left={position.x} top={position.y} />
        ))}

        <img src={Human} alt="human_img" />
      </div>

      <div className="wounds-side-elements">
        <Button
          onClick={() => setIsAddingNewWound(!isAddingNewWound)}
          variant="contained"
          startIcon={<HeartBrokenIcon />}
          color={isAddingNewWound ? "primary" : "error"}
        >
          {isAddingNewWound ? "Cancel" : "Add Wound"}
        </Button>
        {isAddingNewWound && (
          <span>Press where would you like to add the wound</span>
        )}

        <Button startIcon={<SaveIcon />} variant="contained" color="success">
          Save
        </Button>
      </div>
    </div>
  );
}
