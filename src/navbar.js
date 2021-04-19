/***********  REACT ***********************************/
import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";

/***********  COMPONENT *******************************/
import "./styles/navbar.css";

/***********  FONTAWESONE *****************************/
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faYenSign, faHome, faChartBar, faCog, faTimes}
    from "@fortawesome/free-solid-svg-icons";

function MenuBar() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = (show) => {
        setSidebar(show);
    }

    useEffect(() => {
        let targetDiv = document.getElementById("container");

        if (sidebar && targetDiv !== null) {
            targetDiv.style.opacity = 0.5;
        } else if (!sidebar && targetDiv !== null) {
            targetDiv.style.opacity = 1;
        }
    }, [sidebar]);

    return (
        <div>
            <div className="menu-bar">
                <div className="humbarger-button">
                    <FontAwesomeIcon icon={faBars} onClick={() => showSidebar(true)} />
                </div>
                <NavLink
                    className="menu-button"
                    to="/"
                    exact
                >
                    <FontAwesomeIcon icon={faHome} />
                </NavLink>
                <NavLink
                    className="menu-button"
                    to="/input"
                    exact
                >
                    <FontAwesomeIcon icon={faYenSign} />
                </NavLink>
            </div>
            <nav className={sidebar ? "side-bar active" : "side-bar"}>
                <FontAwesomeIcon className="close-button" icon={faTimes} onClick={() => showSidebar(false)} />
                <NavLink
                    className="bar-button"
                    to="/analysis"
                    onClick={() => showSidebar(false)}
                    exact
                >
                    <FontAwesomeIcon icon={faChartBar} /> データ分析
                </NavLink>
                <NavLink
                    className="bar-button"
                    to="/input"
                    onClick={() => showSidebar(false)}
                    exact
                >
                    <FontAwesomeIcon icon={faYenSign} /> 出費入力
                </NavLink>
                <NavLink
                    className="bar-button"
                    to="/setting"
                    onClick={() => showSidebar(false)}
                    exact
                >
                    <FontAwesomeIcon icon={faCog} /> 設定
                </NavLink>
            </nav>
        </div>
    );
}

export default MenuBar;