import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar />
      <div style={{ marginTop: "20px" }}>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
