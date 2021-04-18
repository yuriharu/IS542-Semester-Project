/***********  REACT ***********************************/
import React, { useState, useEffect } from "react";
import clsx from "clsx";

/***********  COMPONENT *******************************/
import "./styles/input.css";

/***********  MATERIAL UI *****************************/
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

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
}));

function Item() {
  const classes = useStyles();
  const [paysColl, setPaysColl] = useState();
  const [catsColl, setCatsColl] = useState();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [pay, setPay] = useState("");
  const [cat, setCat] = useState("");

  useEffect(() => {
    setPaysColl(window.localStorage.getItem("Pays Collection").split(","));
    setCatsColl(window.localStorage.getItem("Cats Collection").split(","));
  }, []);

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

  const add = () => {
    let currentPayAmt = localStorage.getItem(pay);
    let currentCatAmt = localStorage.getItem(cat);
    let newPayAmt = Number(currentPayAmt) - Number(price);
    let newCatAmt = Number(currentCatAmt) + Number(price);
    localStorage.setItem(pay, String(newPayAmt));
    localStorage.setItem(cat, String(newCatAmt));
    resetAll();
  };

  return (
    <div>
      {paysColl ?
        <form className="item" noValidate autoComplete="off">
          <TextField
            label="アイテム名"
            id="item-name"
            className={clsx(classes.margin, classes.textField)}
            InputProps={{
              startAdornment: <InputAdornment position="start"></InputAdornment>,
            }}
            value={name}
            onChange={handleChangeName}
          />
          <TextField
            label="値段"
            id="item-price"
            className={clsx(classes.margin, classes.textField)}
            InputProps={{
              startAdornment: <InputAdornment position="start">￥</InputAdornment>,
            }}
            value={price}
            onChange={handleChangePrice}
          />
          <FormControl className={classes.formControl}>
            <InputLabel id="pay-select">Pay種類</InputLabel>
            <Select
              labelId="pay-select"
              id="pay-type"
              value={pay}
              onChange={handleChangePay}
            >
              {paysColl.map((pay, index) =>
                <MenuItem key={index} value={pay}>{pay}</MenuItem>
              )}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="cat-select">カテゴリー</InputLabel>
            <Select
              labelId="cat-select"
              id="cat-type"
              value={cat}
              onChange={handleChangeCat}
            >
              {catsColl.map((cat, index) =>
                <MenuItem key={index} value={cat}>{cat}</MenuItem>
              )}
            </Select>
          </FormControl>
          <Button variant="contained" id="submit-button" onClick={add}>
            追加
          </Button>
        </form>
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
