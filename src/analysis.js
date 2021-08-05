/***********  REACT ***********************************/
import React, { useState, useEffect } from "react";

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
import db from "./firestore.js";

function CatBar() {
    const [logs, setLogs] = useState([]);
    const [cats, setCats] = useState([]);
    const fetchLogs = async() => {
        setLogs([]);
        const response = db.collection("log").orderBy("date");
        const data = await response.get();
        data.docs.forEach(item => {
            setLogs(logs => [...logs, item.data()]);
        });
    };
    const fetchCats = async() => {
        setCats([]);
        const response = db.collection("category");
        const data = await response.get();
        data.docs.forEach(item => {
            setCats(cats => [...cats, item.data()]);
        });
    };
    useEffect(() => {
        fetchLogs();
        fetchCats();
    }, []);

    return (
        <div id="chart-container">
            <Container>
                <h1>今月の出費</h1>
                <MainContainer>
                    {cats.length ? 
                        cats.map((cat, i) => {
                            let catTotal = 0;
                            logs.filter(log => 
                                    log.categoryID === cat.name && 
                                    log.date.toDate().getMonth() === new Date().getMonth() &&
                                    log.date.toDate().getFullYear() === new Date().getFullYear()
                                ).forEach(selectedLog => {
                                catTotal += selectedLog.total;
                            })
                            return (
                                <BarChartContainer key={i}>
                                <Number>￥{catTotal}</Number>
                                <MakeBar height={catTotal / 40} />
                                <BlackLine />
                                <Label>{cat.name}</Label>
                                </BarChartContainer>
                            );
                        }) : <div>Loading</div>}
                </MainContainer>
            </Container>
            <Container>
                <h1>先月の出費</h1>
                <MainContainer>
                    {cats.length ? 
                        cats.map((cat, i) => {
                            let catTotal = 0;
                            logs.filter(log => 
                                log.categoryID === cat.name && 
                                log.date.toDate().getMonth() === new Date().getMonth() - 1 &&
                                log.date.toDate().getFullYear() === new Date().getFullYear() - 1
                            ).forEach(selectedLog => {
                                catTotal += selectedLog.total;
                            })
                            return (
                                <BarChartContainer key={i}>
                                <Number>￥{catTotal}</Number>
                                <MakeBar height={catTotal / 40} />
                                <BlackLine />
                                <Label>{cat.name}</Label>
                                </BarChartContainer>
                            );
                        }) : <div>Loading</div>}
                </MainContainer>
            </Container>
        </div>
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