import { useState, useEffect } from "react";
import "./Skills.scss";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import { Card, Divider } from "@mui/material";
import SkillTable from "./SkillTable";
import { getCharacterData } from "@/helper/character";

export default function Skills() {
  const [skills, setSkills] = useState<CharacterSheet["skills"]>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCharacterData("skills").then((response) => {
      setLoading(false);
      if (response) setSkills(response);
    });
  }, []);

  if (loading) return <LoadingPage />;

  return (
    <Card variant="outlined" sx={{ userSelect: "none" }}>
      {Object.keys(skills)
        .sort()
        .map((tableKey) => (
          <>
            <SkillTable
              key={tableKey}
              tableKey={tableKey}
              skills={skills}
              setSkills={setSkills}
            />
            <Divider />
          </>
        ))}
    </Card>
  );
}
