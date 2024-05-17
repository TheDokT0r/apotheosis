import { useState, useEffect } from "react";
import { TextField, Divider, Autocomplete } from "@mui/material";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { firebaseApp } from "@/helper/firebase";
import LoadingPage from "../LoadingPage/LoadingPage";

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
  const navigate = useNavigate();
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  const changeBasicInfoValue = (key: string, value: string) => {
    const basicInfoCopy = { ...basicInfo };
    basicInfoCopy[key] = value;

    setBasicInfo(basicInfoCopy);

    console.log({ value });
    const user = auth.currentUser;
    if (!user) return;
    setDoc(
      doc(db, "sheets", user.uid, "character", "basic_info"),
      basicInfoCopy
    );
  };

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/login");
        return;
      }

      const docSnap = await getDoc(
        doc(db, "sheets", user.uid, "character", "basic_info")
      );
      if (!docSnap.exists()) return;

      setBasicInfo(docSnap.data());
      setLoading(false);
    });
  }, [auth, db, navigate]);

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
