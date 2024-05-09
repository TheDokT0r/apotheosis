import { Button, FormControl, TextField } from "@mui/material";
import "./Login.scss";
import { useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onLoginPress = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log(email, password);
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
