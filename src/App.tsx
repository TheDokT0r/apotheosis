import { lazy, Suspense, useEffect } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingPage from "./components/LoadingPage/LoadingPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import socketStore from "./stores/socketStore";
import { BACKEND_URL } from "./helper/consts";
import { io } from "socket.io-client";
import TopMenu from "./components/TopMenu/TopMenu";
import { useCharacter } from "./stores/characterStore";
import axios from "axios";
import { getAllCharacterData } from "./helper/character";
import Quirks from "./routes/Quirks/Quirks";

const Home = lazy(() => import("@/routes/Home/Home"));
const Login = lazy(() => import("@/routes/Login/Login"));
const Signup = lazy(() => import("@/routes/Login/Signup"));
const Skills = lazy(() => import("@/routes/Skills/Skills"));
const Wounds = lazy(() => import("@/routes/Wounds/Wounds"));
const Notes = lazy(() => import("@/routes/Notes/Notes"));
const Temps = lazy(() => import("@/routes/Temps/Temps"));
const Abilities = lazy(() => import("@/routes/Abilities/Abilities"));
const Game = lazy(() => import("@/routes/Game/Game"));

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: "JetBrains Mono, monospace",
  },
});

export default function App() {
  const socketIO = socketStore((state) => state.socket);
  const setSocket = socketStore((state) => state.setSocket);
  const token = localStorage.getItem("token");
  const { setCharacterData } = useCharacter();

  useEffect(() => {
    const fetch = async () => {
      const token = localStorage.getItem("token");
      const response = await axios
        .get(`${BACKEND_URL}/usr/check-login`, {
          headers: { Authorization: `Bearer ${token}` },
        })

      if (!response || response.status !== 200) {
        return;
      }

      const newCharData = await getAllCharacterData();
      if (!newCharData) return;

      setCharacterData(newCharData);
    };
    fetch();
  }, [setCharacterData]);

  useEffect(() => {
    const socket = io(BACKEND_URL, { query: { token } });
    setSocket(socket);
  }, [setSocket, token]);

  useEffect(() => {
    socketIO.on("connect", () => {
      console.log("Connected to socket.io server");
    });

    socketIO.on("disconnect", () => {
      console.log("Disconnected from socket io server");
    });

    return () => {
      socketIO.close();
    };
  }, [socketIO]);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <TopMenu />
          <Suspense fallback={<LoadingPage />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/wounds" element={<Wounds />} />
              <Route path="/quirks" element={<Quirks />} />
              <Route path="/abilities" element={<Abilities />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/game" element={<Game />} />
              <Route path="/temps" element={<Temps />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
      <ToastContainer theme="colored" pauseOnHover position="bottom-right" />
    </>
  );
}
