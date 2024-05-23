import {
  Box,
  Collapse,
  Divider,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDowIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteIcon from "@mui/icons-material/Delete";
import { updateCharacterData } from "@/helper/character";

interface RowProps {
  ability?: AbilityData;
  abilities: CharacterSheet["abilities"];
  setAbilities: (newValue: CharacterSheet["abilities"]) => void;
}

export default function Row({ ability, abilities, setAbilities }: RowProps) {
  const [open, setOpen] = useState(false);

  const deleteAbility = () => {
    if (!ability) return;
    const abilitiesCopy = [...abilities];
    const index = abilitiesCopy.findIndex((ab) => ab === ability.name);
    abilitiesCopy.splice(index, 1);
    setAbilities(abilitiesCopy);

    updateCharacterData(abilitiesCopy, "abilities");
  };

  if (!ability) return null;

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expend row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDowIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" sx={{ fontSize: "1.2rem" }}>
          {ability.name}
        </TableCell>
        <TableCell align="justify" sx={{ fontSize: "1.2rem" }}>
          {ability.rank}
        </TableCell>
        <TableCell align="justify" sx={{ fontSize: "1.2rem" }}>
          {ability.skill}
        </TableCell>

        <TableCell>
          <IconButton onClick={deleteAbility}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Description
              </Typography>
              <Divider variant="middle" />
              <Typography variant="body1" gutterBottom>
                {ability.description}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Prerequisites
              </Typography>
              <Divider variant="middle" />
              <Typography variant="body1" gutterBottom>
                {ability.prerequisites ? ability.prerequisites : "None"}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
