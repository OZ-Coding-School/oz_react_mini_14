import { Outlet } from "react-router-dom";
import NavBar from "./details/NavBar.jsx";

export default function Layout() {
  return (
    <div>
      <NavBar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
