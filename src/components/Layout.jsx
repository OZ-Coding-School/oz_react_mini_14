import { Outlet, Link } from "react-router";

function Layout() {
  return (
    <div>
      {}
      <nav
        style={{
          backgroundColor: "#222",
          color: "white",
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2> Movie App</h2>
        <div style={{ display: "flex", gap: "20px" }}>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Home
          </Link>
          <Link to="/detail" style={{ color: "white", textDecoration: "none" }}>
            Detail
          </Link>
        </div>
      </nav>

      {}
      <Outlet />
    </div>
  );
}

export default Layout;
