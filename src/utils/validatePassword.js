// 패스워드 유효성 예시(minimum 6 letters, 최소6글자)
export function validatePassword(password) {
  return typeof password === "string" && password.length >= 6;
}
