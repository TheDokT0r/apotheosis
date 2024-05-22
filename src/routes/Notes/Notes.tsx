import { useEffect, useState } from "react";
import "./Notes.scss";
import { Button, Divider, TextField } from "@mui/material";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import { getCharacterData, updateCharacterData } from "@/helper/character";

export default function Notes() {
  const [extras, setExtras] = useState<CharacterSheet["extras"]>({
    wounds: [],
    notes: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCharacterData("extras").then((response) => {
      if (response) setExtras(response);
      setLoading(false);
    });
  }, []);

  const saveNotes = async () => {
    updateCharacterData(extras, "extras");
  };

  if (loading) return <LoadingPage />;

  return (
    <div className="notes-page">
      <h1 style={{ textTransform: "capitalize", fontFamily: "Brush-King" }}>
        Notes
      </h1>

      <Divider sx={{ width: "60%" }} />
      <br />
      <TextField
        sx={{ width: "60%" }}
        placeholder="Your Notes Here"
        value={extras.notes}
        onChange={(e) => {
          const extrasCopy = { ...extras };
          extrasCopy.notes = e.target.value;
          setExtras(extrasCopy);
        }}
        multiline
      />

      <Button
        sx={{ marginTop: "10px" }}
        variant="contained"
        onClick={saveNotes}
      >
        Save
      </Button>
    </div>
  );
}
