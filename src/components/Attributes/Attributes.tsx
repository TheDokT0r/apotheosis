import { Divider, TextField } from "@mui/material";
import LoadingPage from "../LoadingPage/LoadingPage";
import { useCharacter } from "@/stores/characterStore";

export default function Attributes() {
  const { characterData, setSpecificCharacterData } = useCharacter();

  const changeAttributesValues = (key: string, value: string) => {
    if (!characterData) return;

    const attributesCopy = characterData.attributes;

    if (Number.isNaN(value) || value === "") {
      attributesCopy[key] = "";
    } else {
      attributesCopy[key] = Number(value);
    }

    setSpecificCharacterData("attributes", attributesCopy);
  };

  if (!characterData) return <LoadingPage />;

  const { attributes } = characterData;

  return (
    <div className="stats-container">
      <h3>Attributes</h3>
      <Divider sx={{ width: "80%" }} />
      <div className="stats">
        {Object.keys(attributes)
          .sort()
          .map((key) => (
            <TextField
              sx={{ textTransform: "capitalize" }}
              key={key}
              value={attributes[key] ?? ""}
              label={key}
              onChange={(e) => changeAttributesValues(key, e.target.value)}
              type="number"
            />
          ))}
      </div>
    </div>
  );
}
