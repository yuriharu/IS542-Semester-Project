import styled, { css } from "styled-components";

export const Container = styled.div`
//   background-color: #ECECEC;
//   width: 80%;
  margin: 50px auto;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

export const BarChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

export const Chart = css`
  margin-top: 10px;
  width: 40px;
  &:hover {
    opacity: 0.8;
  }
  @media (max-width: 420px) {
    width: 34px;
  }
`;

export const Number = styled.span`
  font-size: 1rem;
  text-align: center;
  color: black;
`;

export const MakeBar = styled.div`
  height: ${(props) => props.height}%;
  background-color: #F78888;
  ${Chart};
`;

export const BlackLine = styled.div`
  width: 150%;
  height: 5px;
  background-color: grey;
`;

export const Label = styled.span`
  font-size: small;
  text-align: center;
  color: black;
`;