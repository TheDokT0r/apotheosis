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
const Menu = lazy(() => import("@/components/SideMenu/SideMenu"));

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
          <Menu />
          <Suspense fallback={<LoadingPage />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/skills" element={<Skills />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
      <ToastContainer theme="colored" pauseOnHover position="bottom-right" />
    </>
  );
}
