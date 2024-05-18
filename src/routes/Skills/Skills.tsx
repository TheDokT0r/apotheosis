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
  Checkbox,
  Rating,
} from "@mui/material";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Skills.scss";
import LoadingPage from "@/components/LoadingPage/LoadingPage";

export default function Skills() {
  const [skills, setSkills] = useState<CharacterSheet["skills"]>({});
  const [loading, setLoading] = useState(true);

  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setLoading(true);
      if (!user) {
        navigate("/");
        return;
      }

      const docSnap = await getDoc(
        doc(db, "sheets", user.uid, "character", "skills")
      );

      if (!docSnap.exists()) return;

      setSkills(docSnap.data());
      setLoading(false);
    });
  }, [auth, db, navigate]);

  const onProChange = async (
    table: string,
    skillKey: string,
    newState: boolean
  ) => {
    const user = getAuth().currentUser;
    if (!user) return;

    const skillsCopy = { ...skills };
    skillsCopy[table][skillKey].pro = newState;
    setSkills(skillsCopy);

    await setDoc(
      doc(db, "sheets", user.uid, "character", "skills"),
      skillsCopy
    );
  };

  const onSkillChange = async (
    table: string,
    skillKey: string,
    newState: number
  ) => {
    const user = getAuth().currentUser;
    if (!user) return;

    const skillsCopy = { ...skills };
    skillsCopy[table][skillKey].skill_level = newState;
    setSkills(skillsCopy);

    await setDoc(
      doc(db, "sheets", user.uid, "character", "skills"),
      skillsCopy
    );
  };

  if (loading) return <LoadingPage />;

  return (
    <Card variant="outlined">
      {Object.keys(skills)
        .sort()
        .map((tableKey) => (
          <div>
            <h2 style={{ textTransform: "capitalize", textAlign: "center" }}>
              {tableKey}
            </h2>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="skill-table">
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
                  {Object.keys(skills[tableKey])
                    .sort()
                    .map((skillKey) => (
                      <TableRow
                        sx={{ textTransform: "capitalize" }}
                        key={skillKey}
                      >
                        <TableCell
                          sx={{ fontSize: "1.5rem", fontFamily: "Creepshow" }}
                          component="th"
                          scope="row"
                        >
                          {skillKey}
                        </TableCell>

                        <TableCell>
                          <Checkbox
                            checked={skills[tableKey][skillKey].pro}
                            onChange={() =>
                              onProChange(
                                tableKey,
                                skillKey,
                                !skills[tableKey][skillKey].pro
                              )
                            }
                          />
                        </TableCell>

                        <TableCell>
                          <Rating
                            value={skills[tableKey][skillKey].skill_level}
                            onChange={(_, value) =>
                              onSkillChange(tableKey, skillKey, value ?? 0)
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ))}
    </Card>
  );
}
