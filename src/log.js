/***********  REACT ***********************************/
import React, { useState, useEffect } from "react";

/***********  COMPONENT *******************************/
import "./styles/log.css";
import db from "./firestore.js";

function LogItem(props) {
    return (
      <div className="log-item">
        <p>{props.date}</p>
        <p>{props.title}</p>
        <p>￥{props.total}</p>
      </div>
    );
}

function LogSheet() {
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

    const days = [
        '日',
        '月',
        '火',
        '水',
        '木',
        '金',
        '土'
    ]

    return (
        <div id="log-container">
            <div className="month-container">
                <h1>今月の履歴</h1>
                {cats.length ?
                    cats.map((cat, i) => {
                        const logListForCat = []
                        logs.filter(log => 
                                log.categoryID === cat.name && 
                                log.date.toDate().getMonth() === new Date().getMonth() &&
                                log.date.toDate().getFullYear() === new Date().getFullYear()
                            ).forEach((selectedLog, idx) => {
                                const month = selectedLog.date.toDate().getMonth() + 1;
                                const date = selectedLog.date.toDate().getDay() + 1;
                                const day = days[date - 1];
                                logListForCat.push(<LogItem 
                                    title={selectedLog.title} 
                                    total={selectedLog.total} 
                                    date={`${month}月${date}日(${day})`} 
                                    key={"thisMonthLog-" + cat + "-" + idx} 
                                />)
                            })
                        return (
                            <div className="cat-container" key={"ThisMonthCat-" + i}>
                                <h4>{cat.name}</h4>
                                {logListForCat}
                            </div>
                        );
                    }) : <div>Loading</div>}
            </div>
            <div className="month-container">
                <h1>先月の履歴</h1>
                {cats.length ?
                    cats.map((cat, i) => {
                        const logListForCat = []
                        logs.filter(log => 
                                log.categoryID === cat.name && 
                                log.date.toDate().getMonth() === new Date().getMonth() - 1 &&
                                log.date.toDate().getFullYear() === new Date().getFullYear()
                            ).forEach((selectedLog, idx) => {
                                const month = selectedLog.date.toDate().getMonth() + 1;
                                const date = selectedLog.date.toDate().getDay() + 1;
                                const day = days[date - 1];
                                logListForCat.push(<LogItem 
                                    title={selectedLog.title} 
                                    total={selectedLog.total} 
                                    date={`${month}月${date}日(${day})`} 
                                    key={"thisMonthLog-" + cat + "-" + idx} 
                                />)
                            })
                        return (
                            <div className="cat-container" key={"ThisMonthCat-" + i}>
                                <h4>{cat.name}</h4>
                                {logListForCat}
                            </div>
                        );
                    }) : <div>Loading</div>}
            </div>
        </div>
    );
}



function Log() {
    return (
      <div id="log">
        <LogSheet />
      </div>
    );
}

export default Log;