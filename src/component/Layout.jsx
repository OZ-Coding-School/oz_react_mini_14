import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";


const Layout = () => {

  return(
    <div style={{width: '100%'}}>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default Layout;

