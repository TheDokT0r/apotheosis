import { Divider, TextField } from "@mui/material";
import "./Home.scss";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "@/helper/firebase";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

export default function Status() {
  const [status, setStatus] = useState<CharacterSheet["status"]>({});

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

    const user = auth.currentUser;
    if (!user) return;
    setDoc(doc(db, "sheets", user.uid, "character", "status"), status);
  };

  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        return;
      }

      const docSnap = await getDoc(
        doc(db, "sheets", user.uid, "character", "status")
      );
      if (!docSnap.exists()) return;

      setStatus(docSnap.data());
    });
  }, [auth, db]);

  return (
    <div>
      <h3>Status</h3>
      <Divider />

      {Object.keys(status)
        .sort()
        .map((key) => (
          <div>
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
              label="Total"
              value={status[key].total}
              onChange={(e) => changeStatusValues(key, e.target.value, "total")}
            />
            <TextField
              label="Current"
              value={status[key].current}
              onChange={(e) =>
                changeStatusValues(key, e.target.value, "current")
              }
            />
          </div>
        ))}
    </div>
  );
}
