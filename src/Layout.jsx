import { Outlet } from "react-router-dom";
import NavigationBar from "./component/NavigationBarComponent";

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
