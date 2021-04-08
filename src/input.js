import './styles/input.css';
import initStorage from './storageInit.js'
import clsx from 'clsx';
import React from 'react';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

function Item(keyName) {
  const classes = useStyles();
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [pay, setPay] = React.useState("");
  const [cat, setCat] = React.useState("");
  let pays = initStorage().pays;
  let categories = initStorage().cats;

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
    console.log(name + " was $" + price + "; " + pay + " & " + cat);
    let currentPayAmt = localStorage.getItem(pay);
    let currentCatAmt = localStorage.getItem(cat);
    let newPayAmt = Number(currentPayAmt) - Number(price);
    let newCatAmt = Number(currentCatAmt) + Number(price);
    localStorage.setItem(pay, String(newPayAmt));
    localStorage.setItem(cat, String(newCatAmt));
    resetAll();
  };



  return (
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
            {pays.map((pay, index) =>
              <MenuItem key={index} value={pay}>{pay}</MenuItem>
            )}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="cat-select">カテゴリー</InputLabel>
          <Select
            labelId="cat-select"
            id="cat"
            value={cat}
            onChange={handleChangeCat}
          >
            {categories.map((cat, index) =>
              <MenuItem key={index} value={cat}>{cat}</MenuItem>
            )}
          </Select>
        </FormControl>
        <Button variant="contained" id="submit-button" onClick={add}>
          追加
        </Button>
      </form>
  );
}

function ItemInput() {
    return (
      <div className="Input">
        <Item />
      </div>
    );
}

export default ItemInput;
