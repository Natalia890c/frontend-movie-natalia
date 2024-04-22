import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./Navbar";

export default function Layout() {
  return (
    <div className="w-full h-screen overflow-hidden flex flex-col bg-[#101010] ">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}
