import { Divider, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import LoadingPage from "../LoadingPage/LoadingPage";
import { getCharacterData, updateCharacterData } from "@/helper/character";

export default function Status() {
  const [status, setStatus] = useState<CharacterSheet["status"]>({});
  const [loading, setLoading] = useState(true);

  const changeStatusValues = (
    key: string,
    value: string,
    type: "total" | "current"
  ) => {
    const statusCopy = { ...status };

    if (Number.isNaN(value) || value === "") {
      statusCopy[key][type] = "";
    } else {
      statusCopy[key][type] = Number(value);
    }

    setStatus(statusCopy);
    updateCharacterData(statusCopy, "status");
  };

  useEffect(() => {
    setLoading(true);
    getCharacterData("status").then((response) => {
      if (response) setStatus(response);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingPage />;

  return (
    <div>
      <h3>Status</h3>
      <Divider />

      {Object.keys(status)
        .sort()
        .map((key) => (
          <div key={key}>
            <h4
              style={{
                textTransform: "capitalize",
                fontSize: "1.5rem",
                fontFamily: "Creepshow",
              }}
            >
              {key}
            </h4>
            <TextField
              label="Current"
              value={status[key].current}
              onChange={(e) =>
                changeStatusValues(key, e.target.value, "current")
              }
            />
            <TextField
              label="Total"
              value={status[key].total}
              onChange={(e) => changeStatusValues(key, e.target.value, "total")}
            />
          </div>
        ))}
    </div>
  );
}
