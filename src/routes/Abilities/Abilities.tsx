import { useEffect, useState } from "react";
import "./Abilities.scss";
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
import { getCharacterData, updateCharacterData } from "@/helper/character";
import axios from "axios";
import { BACKEND_URL } from "@/helper/consts";
import errorHandler from "@/helper/errorHandler";
import LoadingPage from "@/components/LoadingPage/LoadingPage";

export default function Abilities() {
  const [userAbilities, setUserAbilities] = useState<
    CharacterSheet["abilities"]
  >([]);
  const [newAbility, setNewAbility] = useState("");
  const [allAbilities, setAllAbilities] = useState<AbilityData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BACKEND_URL}/info/abilities`)
      .then((response) => {
        if (response.status !== 200) {
          errorHandler(response);
          return;
        }
        setAllAbilities(response.data as AbilityData[]);
      })
      .catch((e) => errorHandler(e))
      .finally(() => setLoading(false));

    getCharacterData("abilities").then((response) => {
      if (response) setUserAbilities(response);
      setLoading(false);
    });
  }, []);

  const addAbility = () => {
    const newAbilityData = allAbilities.find(
      (ability) => ability.name === newAbility
    );

    if (!newAbilityData) return;

    if (userAbilities.includes(newAbilityData.name)) {
      toast.error("Can't choose the same ability twice");
      return;
    }

    const abilitiesCopy = [...userAbilities];
    abilitiesCopy.push(newAbilityData.name);
    setUserAbilities(abilitiesCopy);
    setNewAbility("");

    updateCharacterData(abilitiesCopy, "abilities");
  };

  if (loading) {
    return <LoadingPage />;
  }

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
      <TableContainer sx={{ borderRadius: "5px" }} component={Paper}>
        <Toolbar component={Paper}>
          <IconButton onClick={addAbility}>
            <AddIcon />
          </IconButton>

          <Autocomplete
            sx={{
              width: "13rem",
            }}
            value={newAbility}
            options={allAbilities.map((ability) => ability.name)}
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
              <Row
                ability={allAbilities.find((ab) => ab.name === ability)}
                abilities={userAbilities}
                setAbilities={setUserAbilities}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
