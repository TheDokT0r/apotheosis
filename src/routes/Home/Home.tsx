import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "@/helper/firebase";
import { useNavigate } from "react-router-dom";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import { TextField } from "@mui/material";
import { getBasicInfo } from "@/helper/getUserProfile";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [basicInfo, setBasicInfo] = useState<CharacterSheet["basic_info"]>();
  const navigate = useNavigate();

  const changeBasicInfoValue = (key: string, value: string) => {
    const basicInfoCopy = { ...basicInfo };
    basicInfoCopy[key] = value;

    setBasicInfo(basicInfoCopy);
  };

  useEffect(() => {
    setLoading(true);
    const auth = getAuth(firebaseApp);
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login");
      }
    });

    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    getBasicInfo().then((response) => {
      setBasicInfo(response ?? undefined);
    });
  }, []);

  if (loading || !basicInfo) return <LoadingPage />;

  return (
    <div>
      <TextField
        label="Player Name"
        key={"player_name"}
        value={basicInfo.player_name}
        onChange={(e) => changeBasicInfoValue("player_name", e.target.value)}
      />

      <TextField
        label="Character Name"
        key={"character_name"}
        value={basicInfo.character_name}
        onChange={(e) => changeBasicInfoValue("character_name", e.target.value)}
      />
    </div>
  );
}
