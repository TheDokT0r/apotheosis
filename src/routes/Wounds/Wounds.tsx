import Human from "@/assets/images/Human.png";
import "./Wounds.scss";
import { Button, Card, TextField } from "@mui/material";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import DeleteIcon from "@mui/icons-material/Delete";
import XSymbol from "./XSymbol";
import { useState, MouseEvent, useRef } from "react";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import Quirks from "./Quirks";
import { useCharacter } from "@/stores/characterStore";

export default function Wounds() {
  const [isAddingNewWound, setIsAddingNewWound] = useState(false);
  const [pressedX, setPressedX] = useState<string | null>(null);
  const { characterData, setSpecificCharacterData } = useCharacter();

  const bodyRef = useRef<HTMLDivElement>(null);

  const onBodyClick = (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    if (!isAddingNewWound || !bodyRef.current) return;

    const bounds = bodyRef.current.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    if (!characterData) return;

    const woundsCopy = characterData.wounds;
    woundsCopy.push({ x, y, description: "", name: "", id: uuid() });
    setSpecificCharacterData("wounds", woundsCopy);
    setIsAddingNewWound(false);
  };

  const onWoundDescriptionChange = (id: string, newDescription: string) => {
    if (!characterData) return;
    const { wounds } = characterData;

    const index = wounds.findIndex((wound) => wound.id === id);

    const woundsCopy = [...wounds];
    woundsCopy[index].description = newDescription;
    setSpecificCharacterData("wounds", woundsCopy);
  };

  const onNameChange = (id: string, newName: string) => {
    if (!characterData) return;
    const { wounds } = characterData;

    const index = wounds.findIndex((wound) => wound.id === id);

    const woundsCopy = [...wounds];
    woundsCopy[index].name = newName;
    setSpecificCharacterData("wounds", woundsCopy);
  };

  const deleteWound = (id: string) => {
    if (!characterData) return;
    const { wounds } = characterData;

    const index = wounds.findIndex((wound) => wound.id === id);

    const woundsCopy = [...wounds];
    woundsCopy.splice(index, 1);
    setSpecificCharacterData("wounds", woundsCopy);
    setPressedX(null);
  };

  if (!characterData) return <LoadingPage />;
  const { wounds } = characterData;

  return (
    <div className="wounds-page">
      <div ref={bodyRef} className="body-map" onClick={onBodyClick}>
        {wounds.sort().map(({ x, y, id }) => (
          <XSymbol
            key={id}
            left={x + "%"}
            top={y + "%"}
            pressedX={pressedX}
            setPressedX={setPressedX}
            uid={id}
          />
        ))}

        <img src={Human} alt="human_img" />
      </div>

      <Card>
        <Button
          onClick={() => {
            if (pressedX !== null) {
              toast.warn("Can't create a new wound while selecting another");
              return;
            }
            setIsAddingNewWound(!isAddingNewWound);
          }}
          variant="contained"
          startIcon={<HeartBrokenIcon />}
          color={isAddingNewWound ? "primary" : "error"}
        >
          {isAddingNewWound ? "Cancel" : "Add Wound"}
        </Button>
        {/* {isAddingNewWound && (
          <span>Press where would you like to add the wound</span>
        )} */}

        {pressedX !== null && (
          <div className="wound-details">
            <TextField
              value={
                wounds[wounds.findIndex((wound) => wound.id === pressedX)].name
              }
              onChange={(e) => onNameChange(pressedX, e.target.value)}
              sx={{ marginTop: "1rem" }}
              label="Name"
            />

            <TextField
              value={
                wounds[wounds.findIndex((wound) => wound.id === pressedX)]
                  .description
              }
              onChange={(e) =>
                onWoundDescriptionChange(pressedX, e.target.value)
              }
              sx={{ marginTop: "1rem" }}
              label="Description"
              multiline
            />

            <Button
              onClick={() => deleteWound(pressedX)}
              sx={{ position: "absolute", bottom: 0, width: "100%" }}
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
            >
              Delete Wound
            </Button>
          </div>
        )}
      </Card>

      <Quirks />
    </div>
  );
}
