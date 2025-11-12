import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Typography from "./Typhography";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 30px 36px;

  @media (max-width: 1240px) {
    padding: 0 24px;
  }

  @media (max-width: 768px) {
    padding: 0 16px;
    margin-bottom: 12px;
  }
`;

const MoreButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.text};
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.colors.accent};
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    line-height: 12px;
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 12px;
  vertical-align: middle;
  transition: color 0.3s ease;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const SectionTitle = ({
  title,
  showMoreButton = false,
  onMoreClick,
  moreText = "더보기",
}) => {
  return (
    <Wrapper>
      <Typography variant="sectionTitle" tag="h2">
        {title}
      </Typography>
      {showMoreButton && (
        <MoreButton onClick={onMoreClick}>
          <Typography variant="caption" tag="span">
            {moreText}
          </Typography>
          <StyledIcon icon={faChevronRight} />
        </MoreButton>
      )}
    </Wrapper>
  );
};

export default SectionTitle;
