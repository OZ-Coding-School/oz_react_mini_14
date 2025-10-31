import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const TitleWrap = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-left: 30px;
  padding-right: 36px;

  @media (max-width: 1240px) {
    padding-left: 24px;
    padding-right: 24px;
  }

  @media (max-width: 768px) {
    padding-left: 16px;
    padding-right: 16px;
    margin-bottom: 12px;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const PlusBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 12px;
    line-height: 12px;
  }
`;

export const P = styled.span`
  font-size: 14px;
  line-height: 14px;
  color: #fff;
`;

export const StyledIcon = styled(FontAwesomeIcon)`
  color: #fff;
  font-size: 12px;
  vertical-align: middle;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;
