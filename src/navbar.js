/***********  REACT ***********************************/
import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";

/***********  COMPONENT *******************************/
import "./styles/navbar.css";

/***********  FONTAWESONE *****************************/
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faYenSign, faHome, faChartBar, faCog, faTimes, faFileAlt}
    from "@fortawesome/free-solid-svg-icons";

function MenuBar() {
    const baseUrl = "/IS542-Semester-Project";
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
                    to={baseUrl + "/"}
                    exact
                >
                    <FontAwesomeIcon icon={faHome} />
                </NavLink>
                <NavLink
                    className="menu-button"
                    to={baseUrl + "/input"}
                    exact
                >
                    <FontAwesomeIcon icon={faYenSign} />
                </NavLink>
            </div>
            <nav className={sidebar ? "side-bar active" : "side-bar"}>
                <FontAwesomeIcon className="close-button" icon={faTimes} onClick={() => showSidebar(false)} />
                <NavLink
                    className="bar-button"
                    to={baseUrl + "/analysis"}
                    onClick={() => showSidebar(false)}
                    exact
                >
                    <FontAwesomeIcon icon={faChartBar} /> ???????????????
                </NavLink>
                <NavLink
                    className="bar-button"
                    to={baseUrl + "/log"}
                    onClick={() => showSidebar(false)}
                    exact
                >
                    <FontAwesomeIcon icon={faFileAlt} /> ??????
                </NavLink>
                <NavLink
                    className="bar-button"
                    to={baseUrl + "/input"}
                    onClick={() => showSidebar(false)}
                    exact
                >
                    <FontAwesomeIcon icon={faYenSign} /> ????????????
                </NavLink>
                <NavLink
                    className="bar-button"
                    to={baseUrl + "/setting"}
                    onClick={() => showSidebar(false)}
                    exact
                >
                    <FontAwesomeIcon icon={faCog} /> ??????
                </NavLink>
            </nav>
        </div>
    );
}

export default MenuBar;