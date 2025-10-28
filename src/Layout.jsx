import { Outlet } from "react-router-dom";
import NavigationBar from "./component/NavigationBarComponent";

function Layout() {
  return (
    <div>
      <NavigationBar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
