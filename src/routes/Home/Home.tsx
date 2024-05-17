import "./Home.scss";
import Attributes from "../../components/Attributes/Attributes";
import Characteristics from "../../components/Characteristics/Characteristics";
import Status from "../../components/Status/Status";
import BasicInfo from "@/components/BasicInfo/BasicInfo";

export default function Home() {
  return (
    <div className="home-container">
      <BasicInfo />

      <Attributes />

      <Characteristics />

      <Status />
    </div>
  );
}
