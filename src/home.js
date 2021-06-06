/***********  REACT ***********************************/
// import clsx from "clsx";
import React, { useState, useEffect } from "react";

/***********  COMPONENT *******************************/
import initStorage from "./storageInit.js";
import "./styles/home.css";

/***********  MATERIAL UI *****************************/
import Button from "@material-ui/core/Button";
import { faPlusCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import { makeStyles } from "@material-ui/core/styles";
// import TextField from "@material-ui/core/TextField";
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

/***********  IMAGES **********************************/
import auPay from "./images/auPay.png";
import ICOCA from "./images/ICOCA.jpg";
import LINEPay from "./images/LINEPay.png";
import NICOPA from "./images/NICOPA.png";
import PayPay from "./images/PayPay.jpg";
import WAON from "./images/WAON.png";
import でんでん from "./images/でんでん.jpg";
import マイカ from "./images/マイカ.jpg";

function ImageMap(keyName) {
  const imageMap = {
    PayPay: <img src={PayPay} alt="PayPay Logo" className="logo" />,
    LINEPay: <img src={LINEPay} alt="LINEPay Logo" className="logo" />,
    auPay: <img src={auPay} alt="auPay Logo" className="logo" />,
    マイカ: <img src={マイカ} alt="マイカ Logo" className="logo" />,
    WAON: <img src={WAON} alt="WAON Logo" className="logo" />,
    でんでん: <img src={でんでん} alt="でんでん Logo" className="logo" />,
    ICOCA: <img src={ICOCA} alt="ICOCA Logo" className="logo" />,
    NICOPA: <img src={NICOPA} alt="NICOPA Logo" className="logo" />,
  }

  if (imageMap[keyName]) {
    return imageMap[keyName]
  } else {
    return <p>LOGO</p>
  }
}

function NumberWithCommas(nString) {
  return nString.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function PayItem(props) {
  let imageTag = ImageMap(props.obj.logo);
  let balanceWithComma = NumberWithCommas(props.obj.balance)

  return (
    <div className="pay-item">
      {imageTag}
      <p>{props.obj.name}</p>
      <p>￥ {balanceWithComma}</p>
      <p>{props.obj.addBtn}</p>
    </div>
  );
}

// const useStyles = makeStyles((theme) => ({
//   margin: {
//     margin: theme.spacing(1),
//   },
//   textField: {
//     width: "40%",
//   },
//   formControl: {
//     margin: theme.spacing(1),
//     width: "40%",
//   },
// }));

function Content() {
  let pays = window.localStorage.getItem("Pays Collection").split(",");
  let payItems = [];
  // const classes = useStyles();
  const [charge, setCharge] = useState("");
  const [price, setPrice] = useState("");
  const chargePay = (payName) => {
    setCharge(payName);
  }
  const chargePrice = (priceAmt) => {
    setPrice(priceAmt);
  }
  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const addCharge = () => {
    let currentAmount = localStorage.getItem(charge);
    let newAmount = Number(currentAmount) + Number(price.replace(",", ""));
    localStorage.setItem(charge, String(newAmount));
    chargePay("");
    chargePrice("");
  }

  useEffect(() => {
    if (charge !== "") {
        document.getElementById("pay").style.opacity = 0.5;
    } else {
        document.getElementById("pay").style.opacity = 1;
    }
  }, [charge]);

  for (let i = 0; i < pays.length; i++) {
    let itemObj = {
      logo: pays[i].replace(" ", ""),
      name: pays[i],
      balance: localStorage.getItem(pays[i]),
      addBtn: <FontAwesomeIcon icon={faPlusCircle} onClick={() => chargePay(pays[i])}/>
    };
    payItems.push(<PayItem obj={itemObj} key={i} />);
  }

  let imageTag = ImageMap(charge.replace(" ", ""));

  return (
    <div className="content">
      <div id="pay">
        {payItems}
      </div>
      <div className={charge ? "charge-pop active" : "charge-pop"}>
        <FontAwesomeIcon icon={faTimes} id="close-button" onClick={() => chargePay("")}/>
        <div className="inline">
          {imageTag}
          <p id="charge-name">{charge}</p>
        </div>
        <div className="inline">
          {/* <TextField
            id="charge-price"
            className={clsx(classes.margin, classes.textField)}
            InputProps={{
              startAdornment: <InputAdornment position="start">￥</InputAdornment>,
            }}
            value={price}
            onChange={handleChangePrice}
            type="number"
          /> */}
          <CurrencyTextField
            id="charge-price"
            // className={clsx(classes.margin, classes.textField)}
            label=""
            variant="standard"
            value={price}
            currencySymbol="￥"
            minimumValue="0"
            outputFormat="string"
            // decimalCharacter="."
            decimalPlaces="0"
            digitGroupSeparator=","
            onChange={handleChangePrice}   // CHECK IS THIS CHANGING THE MOBILE KEYBOARD!!!!!????
          />
          <Button variant="contained" id="charge-button" onClick={addCharge} style={{maxWidth: "90px", maxHeight: "30px", minWidth: "30px", minHeight: "30px"}}>
            チャージ
          </Button>
        </div>
      </div>
    </div>
  );
}

function Home() {
  initStorage();

  return (
    <div id="home" className="home-abled">
      <Content />
    </div>
  );
}

export default Home;
