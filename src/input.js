/***********  REACT ***********************************/
import React, { useState, useEffect } from "react";

/***********  COMPONENT *******************************/
import db from "./firestore.js";
import firebase from 'firebase';
import "./styles/input.css";

/***********  MATERIAL UI *****************************/
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from '@material-ui/core/Grid';
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    justifyItems: "stretch",
    width: "40%",
  },
}));

function Item() {
  const classes = useStyles();

  /****************** fetch pay & category data from firestore ********************/
  const [paysCollection, setPaysCollection] = useState([]);
  const [catsCollection, setCatsCollection] = useState([]);
  const fetchPaysCollection = async() => {
    setPaysCollection([]);
    const response = db.collection("pay").orderBy("order");
    const data = await response.get();
    data.docs.forEach(item => {
      setPaysCollection(paysCollection => [...paysCollection, item.data()]);
    });
  };
  const fetchCatsCollection = async() => {
    setCatsCollection([]);
    const response = db.collection("category");
    const data = await response.get();
    data.docs.forEach(item => {
      setCatsCollection(catsCollection => [...catsCollection, item.data()]);
    });
  };
  useEffect(() => {
    fetchPaysCollection();
    fetchCatsCollection();
  }, []);

  /****************** item name, price, pay, and category state ********************/
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [pay, setPay] = useState("");
  const [cat, setCat] = useState("");

  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };
  const handleChangePay = (event) => {
    setPay(event.target.value);
  };
  const handleChangeCat = (event) => {
    setCat(event.target.value);
  };
  const resetAll = () => {
    setName("");
    setPrice("");
    setPay("");
    setCat("");
  };

  const add = async() => {
    const currentPayAmt = paysCollection.filter(item => item.name === pay)[0].balance;
    const newPayAmt = currentPayAmt - Number(price.replace(",", ""));
    await db.collection("pay").doc(pay).update({
      balance: newPayAmt,
    });
    await db.collection("log").add({
      categoryID: cat,
      date: firebase.firestore.Timestamp.fromDate(new Date()),
      payID: pay,
      title: name,
      total: Number(price.replace(",", "")),
    });
    resetAll();
  };

  return (
    <div id="form-container">
      {paysCollection ?
          <Grid container spacing={0} direction="column" alignItems="center" justify="center">
            <Grid container spacing={0} direction="row" alignItems="center" justify="center">
              <TextField
                label="アイテム名"
                id="item-name"
                className={classes.paper}
                InputProps={{
                  startAdornment: <InputAdornment position="start"></InputAdornment>,
                }}
                value={name}
                onChange={handleChangeName}
              />
              <CurrencyTextField
                id="charge-price"
                className={classes.paper}
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
            </Grid>
            <Grid container spacing={0} direction="row" alignContent="center" alignItems="center" justify="center">
              <FormControl className={classes.paper}>
                <InputLabel id="pay-select">Pay種類</InputLabel>
                <Select
                  labelId="pay-select"
                  id="pay-type"
                  value={pay}
                  onChange={handleChangePay}
                >
                  {paysCollection.map((pay, index) =>
                    <MenuItem key={index} value={pay.name}>{pay.name}</MenuItem>
                  )}
                </Select>
              </FormControl>
              <FormControl className={classes.paper}>
                <InputLabel id="cat-select">カテゴリー</InputLabel>
                <Select
                  labelId="cat-select"
                  id="cat-type"
                  value={cat}
                  onChange={handleChangeCat}
                >
                  {catsCollection.map((cat, index) =>
                    <MenuItem key={index} value={cat.name}>{cat.name}</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" id="submit-button" onClick={add}>
                追加
              </Button>
            </Grid>
          </Grid>
        : <div>Loading</div>}
    </div>
);
}

function ItemInput() {
    return (
      <div id="Input">
        <Item />
      </div>
    );
}

export default ItemInput;
