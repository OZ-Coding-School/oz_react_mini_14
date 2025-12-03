import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh" }}>
      <Navbar />

      {/* navbar height 80px 이므로 padding-top도 80px */}
      <div style={{ paddingTop: "80px", color: "white" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
