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
import { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDowIcon from "@mui/icons-material/KeyboardArrowDown";
import { useCharacter } from "@/stores/characterStore";

interface SkillTableProps {
  tableKey: string;
  skills: CharacterSheet["skills"];
}

export default function SkillTable({ tableKey, skills }: SkillTableProps) {
  const { setSpecificCharacterData } = useCharacter();
  const [isOpen, setIsOpen] = useState(false);
  const onSkillChange = async (
    table: string,
    skillKey: string,
    newState: number
  ) => {
    const skillsCopy = { ...skills };
    skillsCopy[table][skillKey].skill_level = newState;
    setSpecificCharacterData("skills", skillsCopy);
  };

  const onProChange = async (
    table: string,
    skillKey: string,
    newState: boolean
  ) => {
    const skillsCopy = { ...skills };
    skillsCopy[table][skillKey].pro = newState;
    setSpecificCharacterData("skills", skillsCopy);
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

        <Typography
          marginBottom="2rem"
          variant="h6"
          fontFamily="Brush-King"
          textAlign="center"
        >
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
                Proficiency
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
