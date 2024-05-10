import { getAuth } from "firebase/auth";
import { firebaseApp } from "./firebase";
import { getDoc, getFirestore, doc } from "firebase/firestore";

export const getBasicInfo = async () => {
  const auth = getAuth(firebaseApp);
  const user = auth.currentUser;

  if (!user) return null;

  const db = getFirestore(firebaseApp);
  const docSnap = await getDoc(
    doc(db, "sheets", user.uid, "character", "basic_info")
  );
  if (!docSnap.exists()) return null;

  const data = docSnap.data();
  return data as CharacterSheet["basic_info"];
};
