import './input.css';
import clsx from 'clsx';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { ContactlessOutlined } from '@material-ui/icons';

function MenuBar() {
    return (
      <div className="menu-bar">
        <div className="humbarger-button"><FontAwesomeIcon icon={faBars} /></div>
        <div className="home-button"><FontAwesomeIcon icon={faHome} /></div>
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

function Item(keyName) {
  // console.log(keyName);
  const classes = useStyles();
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [pay, setPay] = React.useState('');
  const [cat, setCat] = React.useState('');

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

  const add = () => {
    console.log(name + " was $" + price + "; " + pay + " & " + cat)
  }

  return (
      <form className="item" noValidate autoComplete="off">
        <TextField
          label="アイテム名"
          id="item-name"
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
          onChange={handleChangeName}
        />
        <TextField
          label="値段"
          id="item-price"
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            startAdornment: <InputAdornment position="start">￥</InputAdornment>,
          }}
          onChange={handleChangePrice}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="pay-select">Pay種類</InputLabel>
          <Select
            labelId="pay-select"
            id="pay"
            value={pay}
            onChange={handleChangePay}
          >
            <MenuItem value={"paypay"}>PayPay</MenuItem>
            <MenuItem value={"linepay"}>LINE Pay</MenuItem>
            <MenuItem value={"aupay"}>au Pay</MenuItem>
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
            <MenuItem value={"food"}>食品</MenuItem>
            <MenuItem value={"beauty"}>美容</MenuItem>
            <MenuItem value={"other"}>その他</MenuItem>
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
        <MenuBar />
        <Item />
      </div>
    );
}

export default ItemInput;
