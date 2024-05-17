import { useState } from "react";
import "./Abilities.scss";
import abilities, { AbilityData } from "./abilitiesHelper";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  Typography,
  TableBody,
  Toolbar,
  IconButton,
  Autocomplete,
  TextField,
} from "@mui/material";
import Row from "./Row";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";

export default function Abilities() {
  const [userAbilities, setUserAbilities] = useState<AbilityData[]>([]);
  const [newAbility, setNewAbility] = useState("");

  const addAbility = () => {
    const newAbilityData = abilities.find(
      (ability) => ability.name === newAbility
    );

    if (!newAbilityData) return;

    if (userAbilities.includes(newAbilityData)) {
      toast.error("Can't choose the same ability twice");
      return;
    }

    const abilitiesCopy = [...userAbilities];
    abilitiesCopy.push(newAbilityData);
    setUserAbilities(abilitiesCopy);
    setNewAbility("");
  };

  return (
    <div style={{ margin: "1rem" }}>
      <Typography
        variant="h4"
        textAlign="center"
        fontFamily="Brush-King"
        margin="2rem"
      >
        Abilities
      </Typography>
      <TableContainer sx={{ borderRadius: '5px' }} component={Paper}>
        <Toolbar component={Paper}>
          <IconButton onClick={addAbility}>
            <AddIcon />
          </IconButton>

          <Autocomplete
            sx={{
              width: "13rem",
            }}
            value={newAbility}
            options={abilities.map((ability) => ability.name)}
            onChange={(_, newValue) => {
              setNewAbility(newValue ?? "");
            }}
            renderInput={(params) => (
              <TextField {...params} label="New Ability" />
            )}
          />
        </Toolbar>
        <Table aria-table="abilities-table">
          <TableHead>
            <TableCell></TableCell>
            <TableCell>
              <Typography
                variant="h5"
                fontFamily="Creepshow"
                gutterBottom
                component="div"
              >
                Name
              </Typography>
            </TableCell>

            <TableCell>
              <Typography
                variant="h5"
                fontFamily="Creepshow"
                gutterBottom
                component="div"
              >
                Rank
              </Typography>
            </TableCell>

            <TableCell>
              <Typography
                fontFamily="Creepshow"
                variant="h5"
                gutterBottom
                component="div"
              >
                Skill
              </Typography>
            </TableCell>
          </TableHead>
          <TableBody>
            {userAbilities.sort().map((ability) => (
              <Row ability={ability} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
