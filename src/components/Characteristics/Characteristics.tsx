import { Divider, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import LoadingPage from "../LoadingPage/LoadingPage";
import { getCharacterData, updateCharacterData } from "@/helper/character";
import errorHandler from "@/helper/errorHandler";

export default function Characteristics() {
  const [characteristics, setCharacteristics] = useState<
    CharacterSheet["characteristics"]
  >({});

  const [loading, setLoading] = useState(true);

  const changeCharValues = (key: string, value: string) => {
    const charsCopy = { ...characteristics };

    if (Number.isNaN(value) || value === "") {
      charsCopy[key] = "";
    } else {
      charsCopy[key] = Number(value);
    }

    setCharacteristics(charsCopy);

    updateCharacterData(charsCopy, 'characteristics');
  };

  useEffect(() => {
    setLoading(true);
    getCharacterData("characteristics")
      .then((response) => {
        if (response) setCharacteristics(response);
        setLoading(false);
      })
      .catch((e) => {
        errorHandler(e);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingPage />;

  return (
    <div className="stats-container">
      <h3>Characteristics</h3>
      <Divider sx={{ width: "80%" }} />
      <div className="stats">
        {Object.keys(characteristics)
          .sort()
          .map((key) => (
            <TextField
              sx={{ textTransform: "capitalize" }}
              key={key}
              value={characteristics[key] ?? ""}
              label={key}
              onChange={(e) => changeCharValues(key, e.target.value)}
              type="number"
            />
          ))}
      </div>
    </div>
  );
}
