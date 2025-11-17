import { useOutletContext } from "react-router-dom";

export default function MyInfo() {
  const { userInfo } = useOutletContext();

  return (
    <div className="section-box">
      <h2>회원정보</h2>
      <div className="info-box">
        <p>
          <strong>이메일 :</strong> {userInfo.email}
        </p>
        <p>
          <strong>이름 :</strong> {userInfo.name}
        </p>
      </div>
    </div>
  );
}
