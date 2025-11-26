import { useEffect, useState } from "react";
import { useSupabaseAuth } from "@supabase_path";
import { useAuthGuard } from "@hooks/useAuthGuard";
import "./MyPage.scss";
import { SideMenu } from "./components/SideMenu";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";

export default function MyPage() {
  const supabaseAuth = useSupabaseAuth();
  const [userInfo, setUserInfo] = useState(null);

  // useAuthGuard();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userInfo = await supabaseAuth.getUserInfo();

        if (userInfo?.user) {
          setUserInfo({
            email: userInfo.user.email,
            profileImageUrl: userInfo.user.profileImageUrl,
            name: userInfo.user.name,
          });
        }
      } catch (error) {
        console.log("마이페이지 데이터 가져오기 실패 : ", error);
        toast.error("마이페이지 데이터를 가져오는데 오류가 발생하였습니다.");
      }
    };

    fetchUser();
  }, []);

  if (!userInfo) return null;

  return (
    <div className="mypage-wrapper">
      <SideMenu userInfo={userInfo} />
      <main className="mypage-content">
        <Outlet context={{ userInfo }} />
      </main>
    </div>
  );
}
