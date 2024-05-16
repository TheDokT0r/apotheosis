import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "@/helper/firebase";
import { useNavigate } from "react-router-dom";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import { TextField } from "@mui/material";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import "./Home.scss";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [basicInfo, setBasicInfo] = useState<CharacterSheet["basic_info"]>();
  const navigate = useNavigate();
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  const changeBasicInfoValue = (key: string, value: string) => {
    const basicInfoCopy = { ...basicInfo };
    basicInfoCopy[key] = value;

    setBasicInfo(basicInfoCopy);

    const user = auth.currentUser;
    if (!user) return;
    setDoc(doc(db, "sheets", user.uid, "character", "basic_info"), basicInfo);
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

      <div>
        <TextField
          label="Archetype"
          key="archetype"
          value={basicInfo.archetype}
          onChange={(e) => changeBasicInfoValue("archetype", e.target.value)}
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
