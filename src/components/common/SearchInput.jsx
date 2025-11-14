import styled from "@emotion/styled";

const StyledInput = styled.input`
  width: 400px;
  height: 40px;
  background-color: rgba(217, 217, 217, 0.1);
  border-radius: 4px;
  font-size: 16px;
  font-family: ${(props) => props.theme.font.family};
  color: ${(props) => props.theme.colors.text};
  border: 1px solid ${(props) => props.theme.colors.text};
  padding: 16px 12px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.accent};
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.disabled};
  }

  @media (max-width: 1240px) {
    width: 100%;
    order: 3;
  }
`;

const SearchInput = ({
  value,
  onChange,
  onKeyDown,
  placeholder = "사람, 제목, 검색",
}) => {
  return (
    <StyledInput
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
    />
  );
};
export default SearchInput;
