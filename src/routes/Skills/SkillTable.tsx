import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Rating,
  Collapse,
  Card,
  Typography,
  IconButton,
} from "@mui/material";
import { getAuth } from "firebase/auth";
import { Firestore, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDowIcon from "@mui/icons-material/KeyboardArrowDown";

interface SkillTableProps {
  tableKey: string;
  skills: CharacterSheet["skills"];
  setSkills: (newValue: CharacterSheet["skills"]) => void;
  db: Firestore;
}

export default function SkillTable({
  tableKey,
  skills,
  setSkills,
  db,
}: SkillTableProps) {
  const [isOpen, setIsOpen] = useState(false);
  const onSkillChange = async (
    table: string,
    skillKey: string,
    newState: number
  ) => {
    const user = getAuth().currentUser;
    if (!user) return;

    const skillsCopy = { ...skills };
    skillsCopy[table][skillKey].skill_level = newState;
    setSkills(skillsCopy);

    await setDoc(
      doc(db, "sheets", user.uid, "character", "skills"),
      skillsCopy
    );
  };

  const onProChange = async (
    table: string,
    skillKey: string,
    newState: boolean
  ) => {
    const user = getAuth().currentUser;
    if (!user) return;

    const skillsCopy = { ...skills };
    skillsCopy[table][skillKey].pro = newState;
    setSkills(skillsCopy);

    await setDoc(
      doc(db, "sheets", user.uid, "character", "skills"),
      skillsCopy
    );
  };

  return (
    <div>
      <Card sx={{ "& > *": { borderBottom: "unset" } }}>
        <IconButton size="large" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <KeyboardArrowUpIcon fontSize="inherit" />
          ) : (
            <KeyboardArrowDowIcon fontSize="inherit" />
          )}
        </IconButton>

        <Typography marginBottom='2rem' variant="h6" fontFamily="Brush-King" textAlign="center">
          {tableKey}
        </Typography>
      </Card>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <TableContainer component={Paper}>
          <Table aria-label="skill-table">
            <TableHead>
              <TableCell sx={{ fontFamily: "Creepshow", fontSize: "1.6rem" }}>
                Skill Name
              </TableCell>
              <TableCell sx={{ fontFamily: "Creepshow", fontSize: "1.6rem" }}>
                Pro
              </TableCell>
              <TableCell sx={{ fontFamily: "Creepshow", fontSize: "1.6rem" }}>
                Skill Level
              </TableCell>
            </TableHead>

            <TableBody>
              {Object.keys(skills[tableKey])
                .sort()
                .map((skillKey) => (
                  <TableRow sx={{ textTransform: "capitalize" }} key={skillKey}>
                    <TableCell
                      sx={{ fontSize: "1.5rem", fontFamily: "Creepshow" }}
                      component="th"
                      scope="row"
                    >
                      {skillKey}
                    </TableCell>

                    <TableCell>
                      <Checkbox
                        checked={skills[tableKey][skillKey].pro}
                        onChange={() =>
                          onProChange(
                            tableKey,
                            skillKey,
                            !skills[tableKey][skillKey].pro
                          )
                        }
                      />
                    </TableCell>

                    <TableCell>
                      <Rating
                        value={skills[tableKey][skillKey].skill_level}
                        onChange={(_, value) =>
                          onSkillChange(tableKey, skillKey, value ?? 0)
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Collapse>
    </div>
  );
}
