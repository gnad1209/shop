import styled from "styled-components";

export const WrapperContainerLeft = styled.div`
  flex: 1;
  padding: 40px 45px 24px;
  display: flex;
  flex-direction: column;
  @media (max-width: 390px) {
    height: 100%;
  }
`;

export const WrapperContainerRight = styled.div`
  width: 300px;
  background: linear-gradient(
    136deg,
    rgb(240, 248, 255) -1%,
    rgb(219, 238, 255) 85%
  );
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  @media (max-width: 768px) {
    display: none;
  }
`;
export const WrapperTextLight = styled.span`
  color: rgb(253 155 85);
  font-size: 13px;
  cursor: pointer;
`;

export const WrapperGG = styled.span`
  & .nsm7Bb-HzV7m-LgbsSe {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    background-color: #db4437; /* Google Red */
    color: white;
  }
  &:hover {
    opacity: 0.9;
  }
`;

export const WrapperFB = styled.span`
  position: 'relative' 
  &:hover {
    opacity: 0.9;
  }
`;
