import { useContext, useEffect } from "react";
import { UserContext } from "@sbCtx/UserContext";
import { useNavigate } from "react-router-dom";

export default function MyPage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, [user]);

  if (!user)
    return (
      <div className="min-h-screen flex justify-center items-center text-lg pt-24">
        로그인이 필요합니다...
      </div>
    );

  return (
    <div className="pt-28 max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">마이페이지</h1>

      <div className="space-y-4 text-lg">
        <p>
          <span className="font-semibold">닉네임:</span> {user.userName}
        </p>

        <p>
          <span className="font-semibold">이메일:</span> {user.email}
        </p>
      </div>
    </div>
  );
}
