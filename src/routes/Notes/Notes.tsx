import { useEffect, useState } from "react";
import "./Notes.scss";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "@/helper/firebase";
import { getDoc, getFirestore, doc, setDoc } from "firebase/firestore";
import { Button, Divider, TextField } from "@mui/material";
import { toast } from "react-toastify";
import LoadingPage from "@/components/LoadingPage/LoadingPage";

export default function Notes() {
  const [extras, setExtras] = useState<CharacterSheet["extras"]>({
    wounds: [],
    notes: "",
  });
  const [loading, setLoading] = useState(true);

  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setLoading(true);
      if (!user) return;

      const docSnap = await getDoc(
        doc(db, "sheets", user.uid, "character", "extras")
      );

      if (docSnap.exists()) {
        setExtras(docSnap.data() as CharacterSheet["extras"]);
      }

      setLoading(false);
    });
  }, [auth, db]);

  const saveNotes = async () => {
    const user = getAuth().currentUser;
    if (!user) {
      toast.error("Something went wrong while saving. Please try again!");
      return;
    }
    setDoc(doc(db, "sheets", user.uid, "character", "extras"), extras)
      .then(() => {
        toast.success("Data saved!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  if (loading) return <LoadingPage />;

  return (
    <div className="notes-page">
      <h1 style={{ textTransform: "capitalize", fontFamily: "Brush-King" }}>
        Notes
      </h1>

      <Divider sx={{ width: "60%" }} />
      <br />
      <TextField
        sx={{ width: "60%" }}
        placeholder="Your Notes Here"
        value={extras.notes}
        onChange={(e) => {
          const extrasCopy = { ...extras };
          extrasCopy.notes = e.target.value;
          setExtras(extrasCopy);
        }}
        multiline
      />

      <Button
        sx={{ marginTop: "10px" }}
        variant="contained"
        onClick={saveNotes}
      >
        Save
      </Button>
    </div>
  );
}
