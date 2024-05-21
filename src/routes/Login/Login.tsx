import { Button, FormControl, TextField, Typography } from "@mui/material";
import "./Login.scss";
import { useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onLoginPress = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    // const auth = getAuth(firebaseApp);
    // signInWithEmailAndPassword(auth, email, password)
    //   .then(async () => {
    //     // const db = getFirestore(firebaseApp);
    //     // const basicInfo = await getDoc(doc(db, 'sheets', user.uid, 'character', 'basic_info'));
    //     // if(!basicInfo.exists()) {
    //     //   toast.success(`Welcome back ${basicInfo.data()!.player_name}`);
    //     // }
    //     navigate("/");
    //   })
    //   .catch((error) => {
    //     toast.error(error.message);
    //     return;
    //   });

    axios.get("/login", { data: { email, password } }).then((res) => {
      if (res.status !== 200) {
        toast.error(res.data);
        return;
      }

      toast.success("Welcome back!");
      navigate("/");
    });
  };

  return (
    <FormControl variant="outlined" className="login-form">
      <Typography variant="h6" fontFamily="Brush-King" textAlign="center">
        Login To Start Your Adventure!
      </Typography>
      <TextField
        sx={{ margin: "2rem" }}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
      />
      <TextField
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
      />

      <Button
        onClick={onLoginPress}
        variant="contained"
        sx={{ marginTop: "2rem" }}
      >
        <LoginIcon />
        Login
      </Button>

      <Typography variant="body1" marginTop="1rem">
        Don't have an account yet?{" "}
        <a onClick={() => navigate("/signup")}>Create one now!</a>
      </Typography>
    </FormControl>
  );
}
