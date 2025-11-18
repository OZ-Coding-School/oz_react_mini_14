import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

// Layout.jsx 최적화 버전
function Layout() {
  return (
    <>
      {/* header(헤더)는 네비게이션 전체를 감쌉니다 (SEO, 접근성↑) */}
      <header>
        <NavBar />
      </header>
      {/* main(메인)은 본문 컨텐트를 감쌉니다 */}
      <main>
        <Outlet />
      </main>
      {/* 선택: 필요시 footer(푸터) 추가 가능 */}
      {/* <footer>
        <p>Copyright ⓒ 2025 Movie App</p>
      </footer> */}
    </>
  );
}

export default Layout;
