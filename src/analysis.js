/***********  REACT ***********************************/
import React from "react";

/***********  COMPONENT *******************************/
import "./styles/analysis.css";
import {
    MainContainer,
    Container,
    BarChartContainer,
    Number,
    BlackLine,
    MakeBar,
    Label
} from "./barStyle.js";

const cats = window.localStorage.getItem("Cats Collection").split(",");

function CatBar() {
    return (
        <Container>
            <h2>カテゴリー別出費</h2>
            <MainContainer>
                {cats.map((name, i) => {
                    let amount = window.localStorage.getItem(name);
                    return (
                        <BarChartContainer key={i}>
                        <Number>￥{amount}</Number>
                        <MakeBar height={amount / 40} />
                        <BlackLine />
                        <Label>{name}</Label>
                        </BarChartContainer>
                    );
                })}
            </MainContainer>
        </Container>
    );
}



function Analysis() {
    return (
      <div id="analysis">
        <CatBar />
      </div>
    );
}

export default Analysis;