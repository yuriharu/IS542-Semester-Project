import './input.css';
import clsx from 'clsx';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

function ItemList(keyName) {
  // console.log(keyName);
  const classes = useStyles();
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [pay, setPay] = React.useState('');
  const [cat, setCat] = React.useState('');

  const handleChangeName = (event) => {
    setName(event.target.value);
    console.log({name});
  };
  const handleChangePrice = (event) => {
    setPrice(event.target.value);
    console.log({price});
  };
  const handleChangePay = (event) => {
    setPay(event.target.value);
    console.log({pay});
  };
  const handleChangeCat = (event) => {
    setCat(event.target.value);
    console.log(event.target.value);
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
      </form>
  );
}

function Content() {
  const [shopped, setShopped] = React.useState([]);

  function add(item) {
    setShopped(current => [...current, item]);
  }

  console.log({shopped});

  return (
    <div className="content">
      <div className="add-button">
        <FontAwesomeIcon icon={faPlusCircle} size="2x" onClick={() => add(<ItemList />)}/>
      </div>
      {shopped}
      <Button variant="contained" id="submit-button">
          完了
      </Button>
    </div>
  );
}

function ItemInput() {
    return (
      <div className="Input">
        <MenuBar />
        <Content />
      </div>
    );
}

export default ItemInput;
