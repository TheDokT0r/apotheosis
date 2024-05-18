import { useState, useEffect } from "react";
import "./Skills.scss";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { firebaseApp } from "@/helper/firebase";
import { getAuth } from "firebase/auth";
import { Card, Divider } from "@mui/material";
import SkillTable from "./SkillTable";

export default function Skills() {
  const [skills, setSkills] = useState<CharacterSheet["skills"]>({});
  const [loading, setLoading] = useState(true);

  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setLoading(true);
      if (!user) {
        navigate("/");
        return;
      }

      const docSnap = await getDoc(
        doc(db, "sheets", user.uid, "character", "skills")
      );

      if (!docSnap.exists()) return;

      setSkills(docSnap.data());
      setLoading(false);
    });
  }, [auth, db, navigate, setLoading, setSkills]);

  if (loading) return <LoadingPage />;

  return (
    <Card variant="outlined" sx={{ userSelect: "none" }}>
      {Object.keys(skills)
        .sort()
        .map((tableKey) => (
          <>
            <SkillTable
              tableKey={tableKey}
              skills={skills}
              setSkills={setSkills}
              db={db}
            />
            <Divider />
          </>
        ))}
    </Card>
  );
}
