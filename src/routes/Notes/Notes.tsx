import "./Notes.scss";
import { Button, Divider, TextField } from "@mui/material";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import { useCharacter } from "@/stores/characterStore";

export default function Notes() {
  const { characterData, setSpecificCharacterData } = useCharacter();

  if (!characterData) return <LoadingPage />;
  const { notes } = characterData;

  const saveNotes = async () => {
    setSpecificCharacterData("notes", notes);
  };

  if (!characterData) return <LoadingPage />;

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
          setSpecificCharacterData("notes", e.target.value);
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
