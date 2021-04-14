import './styles/home.css';
import initStorage from './storageInit.js'
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import PayPay from './images/PayPay.jpg'
import LINEPay from './images/LINEPay.png'
import auPay from './images/auPay.png'
import マイカ from './images/マイカ.jpg'
import WAON from './images/WAON.png'
import でんでん from './images/でんでん.jpg'
import ICOCA from './images/ICOCA.jpg'
import NICOPA from './images/NICOPA.png'
import { Image } from '@material-ui/icons';

function ImageMap(keyName) {
  const imageMap = {
    PayPay: <img src={PayPay} alt="PayPay Logo" />,
    LINEPay: <img src={LINEPay} alt="LINEPay Logo" />,
    auPay: <img src={auPay} alt="auPay Logo" />,
    マイカ: <img src={マイカ} alt="マイカ Logo" />,
    WAON: <img src={WAON} alt="WAON Logo" />,
    でんでん: <img src={でんでん} alt="でんでん Logo" />,
    ICOCA: <img src={ICOCA} alt="ICOCA Logo" />,
    NICOPA: <img src={NICOPA} alt="NICOPA Logo" />,
  }

  if (imageMap[keyName]) {
    return imageMap[keyName]
  } else {
    return <p>LOGO</p>
  }
}

function PayItem(props) {
  let imageTag = ImageMap(props.obj.logo);

  return (
    <div className="pay-item">
      {imageTag}
      <p>{props.obj.name}</p>
      <p>￥ {props.obj.balance}</p>
      <p>{props.obj.addBtn}</p>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: '40%',
  },
  formControl: {
    margin: theme.spacing(1),
    width: '40%',
  },
}));

function Content() {
  let pays = initStorage().pays;
  let payItems = [];
  const classes = useStyles();
  const [charge, setCharge] = useState("");
  const [price, setPrice] = useState("");
  const chargePay = (payName) => {
    setCharge(payName);
  }
  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const addCharge = () => {
    let currentAmount = localStorage.getItem(charge);
    let newAmount = Number(currentAmount) + Number(price);
    localStorage.setItem(charge, String(newAmount));
    chargePay("");
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
      logo: pays[i].replace(" ", ""),
      name: pays[i],
      balance: localStorage.getItem(pays[i]),
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
        <p id="charge-logo">LOGO of {charge}</p>
        <p id="charge-name">{charge}</p>
        <TextField
          id="charge-price"
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            startAdornment: <InputAdornment position="start">￥</InputAdornment>,
          }}
          onChange={handleChangePrice}
        />
        <Button variant="contained" id="charge-button" onClick={addCharge} style={{maxWidth: '90px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}>
          チャージ
        </Button>
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
