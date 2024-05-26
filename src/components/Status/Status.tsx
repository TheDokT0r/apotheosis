import { Divider, TextField } from "@mui/material";
import LoadingPage from "../LoadingPage/LoadingPage";
import { useCharacter } from "@/stores/characterStore";

export default function Status() {
  const { characterData, setSpecificCharacterData } = useCharacter();

  const changeStatusValues = (
    key: string,
    value: string,
    type: "total" | "current"
  ) => {
    if (!characterData) return;

    const statusCopy = characterData.status;

    if (Number.isNaN(value) || value === "") {
      statusCopy[key][type] = "";
    } else {
      statusCopy[key][type] = Number(value);
    }

    setSpecificCharacterData("status", statusCopy);
  };

  if (!characterData) return <LoadingPage />;

  const status = characterData.status;

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
              type="number"
              label="Current"
              value={status[key].current}
              onChange={(e) =>
                changeStatusValues(key, e.target.value, "current")
              }
            />
            <TextField
              type="number"
              label="Total"
              value={status[key].total}
              onChange={(e) => changeStatusValues(key, e.target.value, "total")}
            />
          </div>
        ))}
    </div>
  );
}
