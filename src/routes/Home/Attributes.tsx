import { Divider, TextField } from "@mui/material";
import "./Home.scss";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "@/helper/firebase";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

export default function Attributes() {
  const [attributes, setAttributes] = useState<CharacterSheet["attributes"]>(
    {}
  );

  const changeAttributesValues = (key: string, value: string) => {
    const attributesCopy = { ...attributes };

    if (Number.isNaN(value) || value === "") {
      attributesCopy[key] = "";
    } else {
      attributesCopy[key] = Number(value);
    }

    setAttributes(attributesCopy);

    const user = auth.currentUser;
    if (!user) return;
    setDoc(doc(db, "sheets", user.uid, "character", "attributes"), attributesCopy);
  };

  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        return;
      }

      const docSnap = await getDoc(
        doc(db, "sheets", user.uid, "character", "attributes")
      );
      if (!docSnap.exists()) return;

      setAttributes(docSnap.data());
    });
  }, [auth, db]);

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
