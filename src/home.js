/***********  REACT ***********************************/
// import clsx from "clsx";
import React, { useState, useEffect } from "react";

/***********  COMPONENT *******************************/
import db from "./firestore.js";
import initStorage from "./storageInit.js";
import "./styles/home.css";

/***********  MATERIAL UI *****************************/
import Button from "@material-ui/core/Button";
import { faPlusCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: "40%",
  },
  formControl: {
    margin: theme.spacing(1),
    width: "40%",
  },
  homeBackground: {
    backgroundColor: "#F78888",
  },
}));

function ImageMap(keyName) {
  const imageMap = {
    "PayPay": <img src={PayPay} alt="PayPay Logo" className="logo" />,
    "LINE Pay": <img src={LINEPay} alt="LINEPay Logo" className="logo" />,
    "au Pay": <img src={auPay} alt="auPay Logo" className="logo" />,
    "マイカ": <img src={マイカ} alt="マイカ Logo" className="logo" />,
    "WAON": <img src={WAON} alt="WAON Logo" className="logo" />,
    "でんでん": <img src={でんでん} alt="でんでん Logo" className="logo" />,
    "ICOCA": <img src={ICOCA} alt="ICOCA Logo" className="logo" />,
    "NICOPA": <img src={NICOPA} alt="NICOPA Logo" className="logo" />,
  }

  if (imageMap[keyName]) {
    return imageMap[keyName]
  } else {
    return <p>LOGO</p>
  }
}

function PayItem(props) {
  let balanceWithComma = props.obj.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div className="pay-item">
      {ImageMap(props.obj.name)}
      <p>{props.obj.name}</p>
      <p>￥ {balanceWithComma}</p>
      <p>{props.obj.addBtn}</p>
    </div>
  );
}

function Content() {
  const classes = useStyles();

  /****************** fetch pay data from firestore ********************/
  const [pays, setPays] = useState([]);
  const fetchPays = async() => {
    setPays([]);
    const response = db.collection("pay").orderBy("order");
    const data = await response.get();
    data.docs.forEach(item => {
      setPays(pays => [...pays, item.data()]);
    });
  };
  useEffect(() => {
    fetchPays();
  }, []);

  let payItems = [];
  for (let i = 0; i < pays.length; i++) {
    let itemObj = {
      image: pays[i].image,
      name: pays[i].name,
      balance: pays[i].balance,
      addBtn: <FontAwesomeIcon icon={faPlusCircle} onClick={() => chargePay(pays[i].name)}/>
    };
    payItems.push(<PayItem obj={itemObj} key={i} />);
  }

  /****************** charge pop up state ********************/
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

  /****************** charge price state ********************/
  const [price, setPrice] = useState("");
  const chargePrice = (priceAmt) => {
    setPrice(priceAmt);
  }
  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };
  const addCharge = async() => {
    let currentAmount = pays.filter(pay => pay.name === charge)[0].balance;
    let newAmount = Number(currentAmount) + Number(price.replace(",", ""));
    await db.collection("pay").doc(charge).update({
      balance: newAmount,
    });
    chargePay("");
    chargePrice("");
    fetchPays();
  }

  return (
    <div className="content">
      <div id="pay" className={classes.homeBackground}>
        {payItems}
      </div>
      <div className={charge ? "charge-pop active" : "charge-pop"}>
        <FontAwesomeIcon icon={faTimes} id="close-button" onClick={() => chargePay("")}/>
        <div className="inline">
          {ImageMap(charge)}
          <p id="charge-name" className={classes.margin}>{charge}</p>
        </div>
        <div className="inline">
          <CurrencyTextField
            id="charge-price"
            className={classes.formControl}
            label=""
            variant="standard"
            value={price}
            currencySymbol="￥"
            minimumValue="0"
            outputFormat="string"
            decimalPlaces={0}
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
