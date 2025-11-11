import styled from "styled-components";

export const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const SignupContainer = styled.div`
  max-width: 400px;
  width: 100%;
  padding: 40px;
  background: rgba(26, 28, 32, 0.9);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);

  h1 {
    color: white;
    text-align: center;
    margin-bottom: 30px;
    font-size: 28px;
  }

  p {
    text-align: center;
    color: rgba(255, 255, 255, 0.6);
    margin-top: 20px;

    a {
      color: #ff1a66;
      text-decoration: none;
      font-weight: 600;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Input = styled.input`
  padding: 14px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 16px;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: #ff1a66;
    background: rgba(255, 255, 255, 0.15);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

export const Button = styled.button`
  padding: 14px;
  background: #ff1a66;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background: #e6135c;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.p`
  color: #ff4444;
  font-size: 14px;
  text-align: center;
  margin: 0;
  padding: 8px;
  background: rgba(255, 68, 68, 0.1);
  border-radius: 4px;
`;

export const SuccessMessage = styled.p`
  color: #44ff88;
  font-size: 14px;
  text-align: center;
  margin: 0;
  padding: 8px;
  background: rgba(68, 255, 136, 0.1);
  border-radius: 4px;
`;

export const Divider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 24px 0;
`;
