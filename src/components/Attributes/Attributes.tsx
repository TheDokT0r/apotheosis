import { Divider, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import LoadingPage from "../LoadingPage/LoadingPage";
import { getCharacterData, updateCharacterData } from "@/helper/character";
import errorHandler from "@/helper/errorHandler";

export default function Attributes() {
  const [attributes, setAttributes] = useState<CharacterSheet["attributes"]>(
    {}
  );

  const [loading, setLoading] = useState(true);

  const changeAttributesValues = (key: string, value: string) => {
    const attributesCopy = { ...attributes };

    if (Number.isNaN(value) || value === "") {
      attributesCopy[key] = "";
    } else {
      attributesCopy[key] = Number(value);
    }

    setAttributes(attributesCopy);

    updateCharacterData(attributesCopy, 'attributes');
  };

  useEffect(() => {
    setLoading(true);
    getCharacterData("attributes")
      .then((response) => {
        if (response) setAttributes(response);
        setLoading(false);
      })
      .catch((e) => errorHandler(e));
  }, []);

  if (loading) return <LoadingPage />;

  return (
    <div className="stats-container">
      <h3>Attributes</h3>
      <Divider sx={{ width: "80%" }} />
      <div className="stats">
        {Object.keys(attributes)
          .sort()
          .map((key) => (
            <TextField
              sx={{ textTransform: "capitalize" }}
              key={key}
              value={attributes[key] ?? ""}
              label={key}
              onChange={(e) => changeAttributesValues(key, e.target.value)}
              type="number"
            />
          ))}
      </div>
    </div>
  );
}
