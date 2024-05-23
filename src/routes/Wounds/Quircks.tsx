import LoadingPage from "@/components/LoadingPage/LoadingPage";
import { getCharacterData, updateCharacterData } from "@/helper/character";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uuid } from "uuid";
import "./Wounds.scss";

import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Quircks() {
  const [quirks, setQuirks] = useState<CharacterSheet["quirks"]>([]);
  const [newQuirk, setNewQuirk] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getCharacterData("quirks")
      .then((response) => {
        setLoading(true);
        if (!response) return;

        setQuirks(response);
      })
      .finally(() => setLoading(false));
  }, []);

  const changeValue = (
    id: string,
    key: keyof CharacterSheet["quirks"][0],
    value: string
  ) => {
    const quirksCopy = [...quirks];
    const index = quirksCopy.findIndex((quirk) => quirk.id === id);
    quirksCopy[index][key] = value;
    setQuirks(quirksCopy);

    updateCharacterData(quirksCopy, "quirks");
  };

  if (loading) return <LoadingPage />;

  const addQuirk = () => {
    const quirksCopy = [...quirks];
    quirksCopy.push({ name: newQuirk, description: "", id: uuid() });
    setQuirks(quirksCopy);

    updateCharacterData(quirksCopy, "quirks");
    setNewQuirk("");
  };

  const deleteQuirk = (id: string) => {
    const quirksCopy = [...quirks];
    const index = quirksCopy.findIndex((quirk) => quirk.id === id);

    quirksCopy.splice(index, 1);
    setQuirks(quirksCopy);

    updateCharacterData(quirksCopy, "quirks");
    toast.success("Item deleted!");
  };

  return (
    <div className="quirks-container">
      <Typography
        marginTop="2rem"
        variant="h4"
        textAlign="center"
        fontFamily="Brush-King"
      >
        Quircks
      </Typography>
      <TableContainer sx={{ marginTop: "2rem" }}>
        <Toolbar component={Paper}>
          <IconButton onClick={addQuirk}>
            <AddIcon />
          </IconButton>

          <TextField
            value={newQuirk}
            onChange={(e) => setNewQuirk(e.target.value)}
            label="Add Quirk"
          />
        </Toolbar>
        <Table>
          <TableHead>
            <TableCell>
              <Typography
                textAlign="center"
                variant="h5"
                fontFamily="Creepshow"
                gutterBottom
                component="div"
              >
                Quirk
              </Typography>
            </TableCell>

            <TableCell>
              <Typography
                textAlign="center"
                variant="h5"
                fontFamily="Creepshow"
                gutterBottom
                component="div"
              >
                Description
              </Typography>
            </TableCell>
          </TableHead>

          {quirks.sort().map((quirk) => (
            <TableBody key={quirk.id}>
              <TableCell>
                <TextField
                  value={quirk.name}
                  onChange={(e) => {
                    changeValue(quirk.id, "name", e.target.value);
                  }}
                />
              </TableCell>

              <TableCell>
                <TextField
                  value={quirk.description}
                  onChange={(e) => {
                    changeValue(quirk.id, "description", e.target.value);
                  }}
                />
              </TableCell>

              <TableCell>
                <IconButton onClick={() => deleteQuirk(quirk.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableBody>
          ))}
        </Table>
      </TableContainer>
    </div>
  );
}
