import { Outlet } from "react-router-dom";
import NavBar from "./details/NavBar.jsx";

function Layout() {
  return (
    <div>
      <NavBar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
