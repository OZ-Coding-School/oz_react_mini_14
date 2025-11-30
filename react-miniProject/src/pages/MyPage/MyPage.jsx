import { useAuthGuard } from "@hooks/useAuthGuard";
import { SideMenu } from "./components/SideMenu";
import { Outlet } from "react-router-dom";
import { useUserInfo } from "@hooks";
import "./MyPage.scss";
import { LoadingSkeleton } from "@components";

export default function MyPage() {
  useAuthGuard();
  const { userInfo } = useUserInfo();

  if (!userInfo)
    return (
      <div>
        <LoadingSkeleton
          posterHeight="220px"
          titleWidth="60%"
          textWidth="80%"
        />
      </div>
    );

  return (
    <div className="mypage-wrapper">
      <SideMenu userInfo={userInfo} />
      <main className="mypage-content">
        <Outlet context={{ userInfo }} />
      </main>
    </div>
  );
}
