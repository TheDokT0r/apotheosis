import { Divider, TextField } from "@mui/material";
import LoadingPage from "../LoadingPage/LoadingPage";
import { useCharacter } from "@/stores/characterStore";

export default function Characteristics() {
  const { characterData, setSpecificCharacterData } = useCharacter();

  const changeCharValues = (key: string, value: string) => {
    if (!characterData) return;

    const charsCopy = characterData.characteristics;

    if (Number.isNaN(value) || value === "") {
      charsCopy[key] = "";
    } else {
      charsCopy[key] = Number(value);
    }

    setSpecificCharacterData("characteristics", charsCopy);
  };

  if (!characterData) return <LoadingPage />;

  const characteristics = characterData.characteristics;

  return (
    <div className="stats-container">
      <h3>Characteristics</h3>
      <Divider sx={{ width: "80%" }} />
      <div className="stats">
        {Object.keys(characteristics)
          .sort()
          .map((key) => (
            <TextField
              sx={{ textTransform: "capitalize" }}
              key={key}
              value={characteristics[key] ?? ""}
              label={key}
              onChange={(e) => changeCharValues(key, e.target.value)}
              type="number"
            />
          ))}
      </div>
    </div>
  );
}
