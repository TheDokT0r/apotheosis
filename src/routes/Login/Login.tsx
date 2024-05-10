import { Button, FormControl, TextField } from "@mui/material";
import "./Login.scss";
import { useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "@/helper/firebase";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onLoginPress = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const auth = getAuth(firebaseApp);
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        toast(`Welcome back ${user.displayName}`);
        navigate('/');
      })
      .catch((error) => {
        toast(error.message);
        return;
      });
  };

  return (
    <FormControl variant="outlined" className="login-form">
      <h1>Login to start your adventure!</h1>
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

      <p>
        Don't have an account yet?{" "}
        <a onClick={() => navigate("/signup")}>Create one now!</a>
      </p>
    </FormControl>
  );
}
