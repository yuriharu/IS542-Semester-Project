import './styles/home.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

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
      addBtn: <FontAwesomeIcon icon={faPlusCircle} />
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
    <div id="home" className="home-abled">
      <Content />
    </div>
  );
}

export default Home;
