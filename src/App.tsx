import { lazy, Suspense } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingPage from "./components/LoadingPage/LoadingPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
const Home = lazy(() => import("@/routes/Home/Home"));
const Login = lazy(() => import("@/routes/Login/Login"));
const Signup = lazy(() => import("@/routes/Login/Signup"));
const Skills = lazy(() => import("@/routes/Skills/Skills"));
const Wounds = lazy(() => import("@/routes/Wounds/Wounds"));
const Notes = lazy(() => import("@/routes/Notes/Notes"));
const Temps = lazy(() => import("@/routes/Temps/Temps"));
const Abilities = lazy(() => import("@/routes/Abilities/Abilities"));
const Game = lazy(() => import("@/routes/Game/Game"));
const TopMenu = lazy(() => import("@/components/TopMenu/TopMenu"));

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
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
