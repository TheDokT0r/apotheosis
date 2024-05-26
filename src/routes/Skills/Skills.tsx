import "./Skills.scss";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import { Card, Divider } from "@mui/material";
import SkillTable from "./SkillTable";
import { useCharacter } from "@/stores/characterStore";

export default function Skills() {
  const { characterData } = useCharacter();

  if (!characterData) return <LoadingPage />;
  const { skills } = characterData;

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
            />
            <Divider />
          </>
        ))}
    </Card>
  );
}
