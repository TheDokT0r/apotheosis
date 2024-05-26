import { TextField, Divider, Autocomplete } from "@mui/material";
import LoadingPage from "../LoadingPage/LoadingPage";
import { useCharacter } from "@/stores/characterStore";

const archetypes = [
  "Fleshless",
  "Inventor",
  "Sharpshooter",
  "Alchemist",
  "Scavenger",
  "Brute",
  "Animator",
  "Infuser",
  "Evoker",
  "Predator",
  "",
];

export default function BasicInfo() {
  const { characterData, setSpecificCharacterData } = useCharacter();

  const changeBasicInfoValue = (key: string, value: string) => {
    if (!characterData) return;

    const basicInfoCopy = characterData["basic_info"];
    basicInfoCopy[key] = value;

    setSpecificCharacterData("basic_info", basicInfoCopy);
  };

  if (!characterData) return <LoadingPage />;

  const basicInfo = characterData.basic_info;

  return (
    <div className="basic-info-container">
      <h3>Basic Info</h3>
      <Divider
        sx={{
          width: "80%",
        }}
      />
      <div>
        <TextField
          label="Character Name"
          key="character_name"
          value={basicInfo.character_name}
          onChange={(e) =>
            changeBasicInfoValue("character_name", e.target.value)
          }
        />
      </div>

      <div
        style={{
          display: "flex",
        }}
      >
        <Autocomplete
          sx={{
            width: "13rem",
          }}
          options={archetypes}
          value={basicInfo.archetype} // onSelect={(e) => changeBasicInfoValue("archetype",)}
          onChange={(_, newValue) =>
            changeBasicInfoValue("archetype", newValue ?? "")
          }
          renderInput={(params) => <TextField {...params} label="Archetype" />}
        />
        <TextField
          label="Affiliation"
          key="affiliation"
          value={basicInfo.affiliation}
          onChange={(e) => changeBasicInfoValue("affiliation", e.target.value)}
        />
        <TextField
          label="Species"
          key="species"
          value={basicInfo.species}
          onChange={(e) => changeBasicInfoValue("species", e.target.value)}
        />
      </div>
    </div>
  );
}
