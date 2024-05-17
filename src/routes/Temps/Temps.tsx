import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import "./Temps.scss";

const temps = ["spells", "abilities", "equipment"];

export default function Temps() {
  const [tempData, setTempData] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const data = localStorage.getItem("tempt");
    if (!data || data === "") return;

    setTempData(JSON.parse(data));
  }, []);

  return (
    <div className="tempt-container">
      <span>
        Everything in this page is temporary, it will be saved to your local
        storage, but not to the database (for now!)
      </span>
      {temps.sort().map((key) => (
        <div key={key}>
          <h2>{key}</h2>

          <TextField
            sx={{ width: "80%" }}
            multiline
            value={tempData[key]}
            onChange={(e) => {
              const temptCopy = { ...tempData };
              temptCopy[key] = e.target.value;
              setTempData(temptCopy);
              localStorage.setItem("tempt", JSON.stringify(temptCopy));
            }}
          />
        </div>
      ))}
    </div>
  );
}
