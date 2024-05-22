import { useState, useEffect } from "react";
import { TextField, Divider, Autocomplete } from "@mui/material";
import LoadingPage from "../LoadingPage/LoadingPage";
import { getCharacterData, updateCharacterData } from "@/helper/character";
import { toast } from "react-toastify";

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
  const [loading, setLoading] = useState(true);
  const [basicInfo, setBasicInfo] = useState<CharacterSheet["basic_info"]>();

  const changeBasicInfoValue = (key: string, value: string) => {
    const basicInfoCopy = { ...basicInfo };
    basicInfoCopy[key] = value;

    setBasicInfo(basicInfoCopy);

    if (basicInfo) {
      updateCharacterData(basicInfoCopy, "basic_info");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await getCharacterData("basic_info");

        if (res) {
          setBasicInfo(res);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error in fetchData:", error);
        toast.error("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || !basicInfo) return <LoadingPage />;

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
          label="Player Name"
          key="player_name"
          value={basicInfo.player_name}
          onChange={(e) => changeBasicInfoValue("player_name", e.target.value)}
        />

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
