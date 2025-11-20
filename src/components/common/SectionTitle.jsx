import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Typography from "./Typography";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;

  @media (max-width: 768px) {
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
  margin-right: 12px;

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
      <Typography variant="sectionTitle" as="h2">
        {title}
      </Typography>
      {showMoreButton && (
        <MoreButton onClick={onMoreClick}>
          <Typography variant="caption" as="span">
            {moreText}
          </Typography>
          <StyledIcon icon={faChevronRight} />
        </MoreButton>
      )}
    </Wrapper>
  );
};

export default SectionTitle;
