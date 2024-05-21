import { FormControl, TextField, Button, Typography } from "@mui/material";
import "./Login.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "@/helper/consts";
import errorHandler from "@/helper/errorHandler";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const onSignupPress = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!email || !username || !password || !confirmPassword) {
      toast.error("Please fill up all data!");
      return;
    }

    if (password !== password) {
      toast.warning("Make sure your passwords much");
      return;
    }

    try {
      const response = await axios.post(BACKEND_URL + "/usr/create", {
        email,
        username,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        toast.success(`Welcome, ${username}`!);
        navigate("/");
        return;
      }
      toast.error(response.data);
    } catch (e) {
      errorHandler(e);
    }
  };

  return (
    <FormControl variant="outlined" className="login-form">
      <h1>Start Your Adventure Today!</h1>

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

      <Typography variant="body1" marginTop="1rem">
        Already have an account?{" "}
        <a onClick={() => navigate("/login")}>Log In!</a>
      </Typography>
    </FormControl>
  );
}
