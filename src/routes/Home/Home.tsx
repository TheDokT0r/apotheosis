import "./Home.scss";
import Attributes from "../../components/Attributes/Attributes";
import Characteristics from "../../components/Characteristics/Characteristics";
import Status from "../../components/Status/Status";
import BasicInfo from "@/components/BasicInfo/BasicInfo";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "@/helper/consts";

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(BACKEND_URL + "/usr/check-login", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch(() => {
        navigate("/login");
      });
  }, [navigate]);

  return (
    <div className="home-container">
      <BasicInfo />

      <Attributes />

      <Characteristics />

      <Status />
    </div>
  );
}
