import { useEffect, useState } from "react";
import "./Notes.scss";
import { Button, Divider, TextField } from "@mui/material";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import { getCharacterData, updateCharacterData } from "@/helper/character";

export default function Notes() {
  const [notes, setNotes] = useState<CharacterSheet["notes"]>("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCharacterData("notes").then((response) => {
      if (response) setNotes(response);
      setLoading(false);
    });
  }, []);

  const saveNotes = async () => {
    updateCharacterData(notes, "notes");
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
        value={notes}
        onChange={(e) => {
          setNotes(e.target.value);
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
