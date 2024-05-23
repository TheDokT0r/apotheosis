import Human from "@/assets/images/Human.png";
import "./Wounds.scss";
import { Button, Card, TextField } from "@mui/material";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import XSymbol from "./XSymbol";
import { useState, MouseEvent, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import { getCharacterData, updateCharacterData } from "@/helper/character";
import errorHandler from "@/helper/errorHandler";
import Quirks from "./Quirks";

export default function Wounds() {
  const [isAddingNewWound, setIsAddingNewWound] = useState(false);
  const [pressedX, setPressedX] = useState<string | null>(null);
  const [wounds, setWounds] = useState<CharacterSheet["wounds"]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    getCharacterData("wounds").then((response) => {
      if (response) setWounds(response);
      setLoading(false);
    });
  }, []);

  const onSaveClick = () => {
    setSaving(true);

    try {
      updateCharacterData(wounds, "wounds");
      toast.success("Data saved!");
    } catch (e) {
      errorHandler(e);
    }

    setSaving(false);
  };

  const onBodyClick = (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    if (!isAddingNewWound || !bodyRef.current) return;

    const bounds = bodyRef.current.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    const woundsCopy = [...wounds];
    woundsCopy.push({ x, y, description: "", name: "", id: uuid() });
    setWounds(woundsCopy);
    setIsAddingNewWound(false);
  };

  const onWoundDescriptionChange = (id: string, newDescription: string) => {
    const index = wounds.findIndex((wound) => wound.id === id);

    const woundsCopy = [...wounds];
    woundsCopy[index].description = newDescription;
    setWounds(woundsCopy);
  };

  const onNameChange = (id: string, newName: string) => {
    const index = wounds.findIndex((wound) => wound.id === id);

    const woundsCopy = [...wounds];
    woundsCopy[index].name = newName;
    setWounds(woundsCopy);
  };

  const deleteWound = (id: string) => {
    const index = wounds.findIndex((wound) => wound.id === id);

    const woundsCopy = [...wounds];
    woundsCopy.splice(index, 1);
    setWounds(woundsCopy);
    setPressedX(null);

    updateCharacterData(woundsCopy, "wounds");
  };

  if (loading) return <LoadingPage />;

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
        {isAddingNewWound && (
          <span>Press where would you like to add the wound</span>
        )}

        <Button
          disabled={saving}
          onClick={onSaveClick}
          startIcon={<SaveIcon />}
          variant="contained"
          color="success"
        >
          Save
        </Button>

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
