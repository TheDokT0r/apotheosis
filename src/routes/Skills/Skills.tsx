import { firebaseApp } from "@/helper/firebase";
import {
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Skills.scss";
import { CheckBox } from "@mui/icons-material";

export default function Skills() {
  const [skills, setSkills] = useState<CharacterSheet["skills"]>({});

  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/");
        return;
      }

      const docSnap = await getDoc(
        doc(db, "sheets", user.uid, "character", "skills")
      );

      if (!docSnap.exists()) return;

      setSkills(docSnap.data());
    });
  }, []);

  return (
    <Card variant="outlined">
      {Object.keys(skills)
        .sort()
        .map((key) => (
          <div>
            <h2 style={{ textTransform: "capitalize" }}></h2>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableCell sx={{ fontFamily: "Creepshow" }}>
                    Skill Name
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Creepshow" }}>Pro</TableCell>
                  <TableCell sx={{ fontFamily: "Creepshow" }}>
                    Skill Level
                  </TableCell>
                </TableHead>

                <TableBody>
                  {Object.keys(skills[key])
                    .sort()
                    .map((skillKey) => (
                      <>
                        <TableRow
                          sx={{ textTransform: "capitalize" }}
                          key={skillKey}
                        />

                        <TableCell component="th" scope="row">
                          {skillKey}
                        </TableCell>

                        <TableCell align="right">
                          <CheckBox />
                        </TableCell>
                      </>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ))}
    </Card>
  );
}
