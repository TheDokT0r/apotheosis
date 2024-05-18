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
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { firebaseApp } from "@/helper/firebase";
import LoadingPage from "@/components/LoadingPage/LoadingPage";

export default function Wounds() {
  const [isAddingNewWound, setIsAddingNewWound] = useState(false);
  const [pressedX, setPressedX] = useState<string | null>(null);
  const [extras, setExtras] = useState<CharacterSheet["extras"]>({
    wounds: [],
    notes: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const bodyRef = useRef<HTMLDivElement>(null);
  const auth = getAuth();
  const db = getFirestore(firebaseApp);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setLoading(true);
      if (!user) return;

      getDoc(doc(db, "sheets", user.uid, "character", "extras")).then(
        (snap) => {
          if (snap.exists()) {
            setExtras(snap.data() as CharacterSheet["extras"]);
            setLoading(false);
          }
        }
      );
    });
  }, [auth, db]);

  const onSaveClick = () => {
    setSaving(true);
    const user = auth.currentUser;

    if (!user) {
      toast.error("Something went wrong while saving. Please try again!");
      return;
    }

    setDoc(doc(db, "sheets", user.uid, "character", "extras"), extras)
      .then(() => {
        toast.success("Data saved!");
      })
      .catch((error) => {
        toast.error(error.message);
      });

    setSaving(false);
  };

  const onBodyClick = (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    if (!isAddingNewWound || !bodyRef.current) return;

    const bounds = bodyRef.current.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    const extrasCopy = { ...extras };
    extrasCopy.wounds.push({ x, y, description: "", id: uuid() });
    setExtras(extrasCopy);
    setIsAddingNewWound(false);
  };

  const onWoundDescriptionChange = (id: string, newDescription: string) => {
    const index = extras.wounds.findIndex((wound) => wound.id === id);

    const extrasCopy = { ...extras };
    extrasCopy.wounds[index].description = newDescription;
    setExtras(extrasCopy);
  };

  const deleteWound = (id: string) => {
    const index = extras.wounds.findIndex((wound) => wound.id === id);

    const extrasCopy = { ...extras };
    extrasCopy.wounds.splice(index, 1);
    setExtras(extrasCopy);
    setPressedX(null);
  };

  if (loading) return <LoadingPage />;

  return (
    <div className="wounds-page">
      <div ref={bodyRef} className="body-map" onClick={onBodyClick}>
        {extras.wounds.sort().map(({ x, y, id }) => (
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
                extras.wounds[
                  extras.wounds.findIndex((wound) => wound.id === pressedX)
                ].description
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
    </div>
  );
}
