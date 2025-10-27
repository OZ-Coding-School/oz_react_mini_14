import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

function Layout() {
  return (
    <>
      <NavBar />
      <main
        style={{ backgroundColor: "black", minHeight: "100vh", color: "white" }}
      >
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
