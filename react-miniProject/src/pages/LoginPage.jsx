import "./LoginPage.scss";
import { useNavigate } from "react-router-dom";
import { CommonButton, OAuthButton, InputField } from "../components";
import { useOAuth } from "../../supabase/auth/useOauth.auth";
import { useLoginController } from "../hooks/useLoginController";
import kakaoLogo from "../assets/icons/Kakao_icon.png";
import googleLogo from "../assets/icons/Google_icon.png";

export default function LoginPage() {
  const { form, errors, authError, loading, handleChange, handleLogin } =
    useLoginController();
  const { loginWithKakao, loginWithGoogle } = useOAuth();
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <h2 className="login-title">로그인</h2>
      <div className="oauth-section">
        <OAuthButton
          logo={kakaoLogo}
          children="카카오로 계속하기"
          className="kakao-btn"
          onClick={loginWithKakao}
          label="카카오로 계속하기"
        />

        <OAuthButton
          logo={googleLogo}
          children="Google로 계속하기"
          className="google-btn"
          onClick={loginWithGoogle}
          label="Google로 계속하기"
        />
      </div>
      <form
        className="login-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <span className="divider">또는</span>
        <InputField
          label="이메일"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />
        <InputField
          label="패스워드"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />

        {authError && <p className="auth-error">{authError}</p>}

        <div className="btn-container">
          <CommonButton
            type="submit"
            className="loginPage-btn"
            aria-label="로그인 데이터 보내기"
          >
            {loading ? "로그인 중..." : "로그인"}
          </CommonButton>
          <CommonButton
            className="loginPage-btn"
            onClick={() => navigate("/signup")}
            type="button"
            aria-label="회원가입 정보 보내기"
          >
            회원가입
          </CommonButton>
        </div>
      </form>
    </div>
  );
}

// function handleSineUpPage() {
//   navigate("/signup");
// }
// const [form, setForm] = useState({ email: "", password: "" });
// const [errors, setErrors] = useState({}); //이메일, 패스워드 입력 에러 메시지
// const [loading, setLoading] = useState(false);
// const [authError, setAuthError] = useState(""); //로그인 에러 메시지 상태

// const dispatch = useDispatch();
// const supabaseAuth = useSupabaseAuth();

// function handleOnChange(e) {
//   const { name, value } = e.target;
//   setForm({ ...form, [name]: value });
//   setAuthError("");
// }

// async function handleSubmit(e) {
//   e.preventDefault();

//   const newErrors = {
//     email: validateEmail(form.email),
//     password: validatePassword(form.password),
//   };

//   setErrors(newErrors);

//   const isValid = Object.values(newErrors).every((err) => err === "");

//   if (!isValid) {
//     return;
//   }

//   try {
//     setLoading(true);
//     setAuthError("");

//     const { data, error } = await supabaseAuth.login({
//       email: form.email,
//       password: form.password,
//     });

//     if (error) {
//       throw error;
//     }

//     toast.success("로그인 성공!");
//     dispatch(logInState(true));
//     navigate("/");
//   } catch (error) {
//     if (error.message.includes("Invalid login credentials")) {
//       setAuthError("아이디 또는 비밀번호가 올바르지 않습니다.");
//     } else if (error.message.includes("User not found")) {
//       setAuthError("아이디가 존재하지 않습니다.");
//     } else {
//       setAuthError("서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
//     }
//     console.log(error.message);
//   } finally {
//     setLoading(false);
//   }
