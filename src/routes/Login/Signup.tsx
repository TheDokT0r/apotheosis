import { FormControl, TextField, Button } from "@mui/material";
import "./Login.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const onSignupPress = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <FormControl variant="outlined" className="login-form">
      <h1>Create Account</h1>

      <TextField
        sx={{ margin: "1rem" }}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
      />
      <TextField
        sx={{ margin: "1rem" }}
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        label="Username"
      />
      <TextField
        sx={{ margin: "1rem" }}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
      />

      <TextField
        sx={{ margin: "1rem" }}
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        label="Confirm Password"
      />

      <Button
        onClick={onSignupPress}
        variant="contained"
        sx={{ marginTop: "1rem" }}
      >
        <AccountCircleIcon />
        Signup
      </Button>

      <p>
        Already have an account?{" "}
        <a onClick={() => navigate("/login")}>Log In!</a>
      </p>
    </FormControl>
  );
}
