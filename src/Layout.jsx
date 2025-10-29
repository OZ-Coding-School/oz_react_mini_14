import { Outlet } from "react-router-dom";
import NavigationBar from "./components/NavigationBar.jsx";

export default function Layout() {
  return (
    <div>
      <NavigationBar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
