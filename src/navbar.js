import React, { useState, useEffect } from 'react';
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faYenSign, faHome, faChartBar, faCog, faTimes} from '@fortawesome/free-solid-svg-icons'
// import { IconContext } from 'react-icons'; //have to install?
import './styles/navbar.css';

function MenuBar() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = (show) => {
        setSidebar(show);
        // console.log(show);
        // console.log(sidebar);
    }

    useEffect(() => {
        console.log(sidebar);
        if (sidebar) {
            document.getElementById("home").style.opacity = 0.5;
        } else {
            document.getElementById("home").style.opacity = 1;
        }
    }, [sidebar]);

    return (
        <div>
            <div className="menu-bar">
                <Link className="humbarger-button" to="/">
                    <FontAwesomeIcon icon={faBars} onClick={() => showSidebar(true)}/>
                </Link>
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
                <Link className="close-button" to="/">
                    <FontAwesomeIcon icon={faTimes} onClick={() => showSidebar(false)}/>
                </Link>
                <NavLink
                    className="bar-button"
                    to="/"
                    exact
                >
                    <FontAwesomeIcon icon={faChartBar} /> データ分析
                </NavLink>
                <NavLink
                    className="bar-button"
                    to="/"
                    exact
                >
                    <FontAwesomeIcon icon={faYenSign} /> 出費入力
                </NavLink>
                <NavLink
                    className="bar-button"
                    to="/"
                    exact
                >
                    <FontAwesomeIcon icon={faCog} /> 設定
                </NavLink>
            </nav>
        </div>
    );
}

export default MenuBar;