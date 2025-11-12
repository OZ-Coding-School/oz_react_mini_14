import styled from "@emotion/styled";
import Typography from "./Typhography";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 99px;
  padding-left: 225px;

  @media (max-width: 768px) {
    margin-top: 40px;
    padding: 0;
    justify-content: center;
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 768px) {
    max-width: 294px;
    gap: 4px;
  }
`;

const Tab = styled.button`
  padding: 10px 20px;
  cursor: pointer;
  font-family: ${(props) => props.theme.font.family};
  background: transparent;
  border: none;
  color: ${(props) =>
    props.$active ? props.theme.colors.text : "rgba(255,255,255,0.6)"};
  font-weight: ${(props) => (props.$active ? "700" : "400")};
  border-bottom: ${(props) =>
    props.$active ? `2px solid ${props.theme.colors.text}` : "none"};
  transition: color 0.2s, border-bottom 0.2s;

  &:hover {
    color: ${(props) => props.theme.colors.text};
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    width: 74px;
    height: 32px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    border: none;
    background-color: ${(props) =>
      props.$active ? props.theme.colors.accent : "transparent"};
    font-size: 14px;
  }
`;

const TabMenu = ({ tabs, activeTab, onTabChange }) => {
  return (
    <Wrapper>
      <TabsContainer>
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            $active={activeTab === tab.id}
            onClick={() => onTabChange(tab.id)}
          >
            <Typography variant="bodySmall">{tab.label}</Typography>
          </Tab>
        ))}
      </TabsContainer>
    </Wrapper>
  );
};

export default TabMenu;
