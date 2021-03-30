import './input.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';

function MenuBar() {
    return (
      <div className="menu-bar">
        <div className="humbarger-button"><FontAwesomeIcon icon={faBars} /></div>
        <div className="home-button"><FontAwesomeIcon icon={faHome} /></div>
      </div>
    );
}

function ItemList() {
    return (
        <div className="item">
            <div className="item-name">業務スーパー</div>
            <div className="item-name">業務スーパー</div>
            <div className="item-name">業務スーパー</div>
            <div className="item-name">業務スーパー</div>
        </div>
    );
}

function Content() {

    return (
      <div className="items">
        <div className="add-button"><FontAwesomeIcon icon={faPlusCircle} size="2x"/></div>
        <ItemList />
        <Button variant="contained" id="submit-button">
            完了
        </Button>
      </div>
    );
}

function Input() {
    return (
      <div className="Input">
        <MenuBar />
        <Content />
      </div>
    );
}

export default Input;
