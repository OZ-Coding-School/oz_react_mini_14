// 이메일 형식 유효성 검사 함수(Email validation, 이메일 밸리데이션)
export function validateEmail(email) {
  return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}
