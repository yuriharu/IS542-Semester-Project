import './styles/home.css';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons'

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
  const [charge, setCharge] = useState("");
  const chargePay = (payName) => {
    setCharge(payName);
  }

  useEffect(() => {
    if (charge !== "") {
        document.getElementById("pay").style.opacity = 0.5;
    } else {
        document.getElementById("pay").style.opacity = 1;
    }
  }, [charge]);

  for (let i = 0; i < 8; i++) {
    let itemObj = {
      logo: "LOGO",
      name: pays[i],
      balance: balances[i],
      addBtn: <FontAwesomeIcon icon={faPlusCircle} onClick={() => chargePay(pays[i])}/>
    };
    payItems.push(<PayItem obj={itemObj} key={i} />);
  }

  return (
    <div className="content">
      <div id="pay">
        {payItems}
      </div>
      <div className={charge ? "charge-pop active" : "charge-pop"}>
          <FontAwesomeIcon icon={faTimes} id="close-button" onClick={() => chargePay("")}/>
      </div>
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
