import { Divider, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "@/helper/firebase";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

export default function Characteristics() {
  const [characteristics, setCharacteristics] = useState<
    CharacterSheet["characteristics"]
  >({});

  const changeCharValues = (key: string, value: string) => {
    const charsCopy = { ...characteristics };

    if (Number.isNaN(value) || value === "") {
      charsCopy[key] = "";
    } else {
      charsCopy[key] = Number(value);
    }

    setCharacteristics(charsCopy);

    const user = auth.currentUser;
    if (!user) return;
    setDoc(
      doc(db, "sheets", user.uid, "character", "characteristics"),
      charsCopy
    );
  };

  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        return;
      }

      const docSnap = await getDoc(
        doc(db, "sheets", user.uid, "character", "characteristics")
      );
      if (!docSnap.exists()) return;

      setCharacteristics(docSnap.data());
    });
  }, [auth, db]);

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
