import './home.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faYenSign } from '@fortawesome/free-solid-svg-icons'

function MenuBar() {
  return (
    <div className="menu-bar">
      <div className="humbarger-button"><FontAwesomeIcon icon={faBars} /></div>
      <div className="inuput-button"><FontAwesomeIcon icon={faYenSign} /></div>
    </div>
  );
}

function PayItem(props) {
  return (
    <div className="pay-item">
      <p>{props.obj.logo}</p>
      <p>{props.obj.name}</p>
      <p>{props.obj.balance}</p>
      <p>{props.obj.addBtn}</p>
    </div>
  );
}

function Content() {
  let pays = ["PayPay", "LINE Pay", "au Pay", "マイカ", "WAON", "でんでん", "ICOCA", "NICOPA"]
  let balances = ["￥2,870", "￥20", "￥870", "￥170", "￥1,330", "￥970", "￥1,570", "￥4,100"]
  let payItems = [];
  for (let i = 0; i < 8; i++) {
    let itemObj = {
      logo: "LOGO",
      name: pays[i],
      balance: balances[i],
      addBtn: "+"
    };
    payItems.push(<PayItem obj={itemObj} key={i} />);
  }

  return (
    <div className="pay">
      {payItems}
    </div>
  );
}

function Home() {
  return (
    <div className="Home">
      <MenuBar />
      <Content />
    </div>
  );
}

export default Home;
