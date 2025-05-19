import FooterBar from "../../components/navbars/FooterBar";
import SideBar from "../../components/navbars/SideBar";
import Start from "./Start";

export default function Begin() {
  return (
    <>
      <div className="h-screen w-screen flex flex-row">
        <SideBar></SideBar>
        <Start></Start>
        <FooterBar></FooterBar>
      </div>
    </>
  );
}