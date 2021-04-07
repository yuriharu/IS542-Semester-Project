import './styles/home.css';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';

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
  let pays = ["PayPay", "LINE Pay", "au Pay", "マイカ", "WAON", "でんでん", "ICOCA", "NICOPA"]
  let balances = ["￥2,870", "￥20", "￥870", "￥170", "￥1,330", "￥970", "￥1,570", "￥4,100"]
  let payItems = [];
  const classes = useStyles();
  const [charge, setCharge] = useState("");
  const [price, setPrice] = React.useState('');
  const chargePay = (payName) => {
    setCharge(payName);
  }
  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const addCharge = () => {
    console.log(price + " was chaged to " + charge);
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
