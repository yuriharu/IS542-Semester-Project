import './styles/setting.css';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    textField: {
      width: '40%',
    }
}));

function ListItem(props) {
    return (
      <div className="list-item">
        <p>{props.obj.name}</p>
        <p>{props.obj.deleteBtn}</p>
      </div>
    );
  }

function CategorySet() {
    const [cats, setCats] = useState([]);
    const [catListItems, setCatListItems] = useState([]);
    const [addCat, setAddCat] = useState(false);
    const [addCatValue, setAddCatValue] = useState("");
    const classes = useStyles();

    const initCats = (catArray) => {
        for (let i = 0; i < catArray.length; i++) {
            setCats(cats => [...cats, catArray[i]]);
        }
    };

    const initData = () => {
        setCats([]);
        initCats(window.localStorage.getItem("Cats Collection").split(","));
    };

    useEffect(() => {
        initData();
    }, []);

    useEffect(() => {
        setCatListItems([]);
        for (let i = 0; i < cats.length; i++) {
            let itemObj = {
                name: cats[i],
                deleteBtn: <FontAwesomeIcon icon={faTimes} onClick={() => deleteCat(cats[i])}/>
            }
            setCatListItems(catListItems => [...catListItems, <ListItem obj={itemObj} key={"cat-" + i} />]);
        }
    }, [cats]);

    const addCatIndicator = (indicator) => {
        setAddCat(indicator);
    };

    const handleChangeAddCatValue = (event) => {
        setAddCatValue(event.target.value);
    };

    const addCatSetting = () => {
        if (addCatValue !== "") {
            let currentCatsArray = window.localStorage.getItem("Cats Collection").split(",");
            currentCatsArray.push(addCatValue);
            window.localStorage.setItem("Cats Collection", currentCatsArray.toString());
            window.localStorage.setItem(addCatValue, "0");
            initData();
        }
        addCatIndicator(false);
        setAddCatValue("");
    }

    const deleteCat = (catName) => {
        if (window.confirm("本当に" + catName + "を削除しますか? (" + catName + "に関連したデータも削除されます)")) {
            let currentCatCollectionArray = window.localStorage.getItem("Cats Collection").split(",");
            let newCatCollectionArray = [];
            for (let i = 0; i < currentCatCollectionArray.length; i++) {
                if (currentCatCollectionArray[i] !== catName) {
                    newCatCollectionArray.push(currentCatCollectionArray[i]);
                }
            }
            window.localStorage.setItem("Cats Collection", newCatCollectionArray.toString());
            window.localStorage.removeItem(catName);

            //remove from state cats
            let idx = cats.indexOf(catName);
            if (idx > -1) {
                let newCats = cats;
                newCats.splice(idx, 1);
                setCats([]);
                initCats(newCats);
            }
        }
    };

    return (
        <div className="content">
            <div className="area-box">
                <div className="set-title">カテゴリー</div>
                <div className="add-icon"><FontAwesomeIcon icon={faPlusCircle} onClick={() => addCatIndicator(true)}/></div>
                {catListItems.length ?
                catListItems
                : <div>Loading</div>}
            </div>
            <div className={addCat ? "setting-pop active" : "setting-pop"}>
                <FontAwesomeIcon icon={faTimes} className="close-button" onClick={() => addCatIndicator(false)}/>
                <div className="flex-area">
                    <p className="pop-title">カテゴリー追加</p>
                    <TextField
                        className="pop-value"
                        className={clsx(classes.margin, classes.textField)}
                        value={addCatValue}
                        onChange={handleChangeAddCatValue}
                    />
                    <Button variant="contained" className="add-button" onClick={addCatSetting} style={{maxWidth: '90px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}>
                        追加
                    </Button>
                </div>
            </div>
        </div>
    );
}

function PaySet() {
    const [pays, setPays] = useState([]);
    const [payListItems, setPayListItems] = useState([]);
    const [addPay, setAddPay] = useState(false);
    const [addPayValue, setAddPayValue] = useState("");
    const classes = useStyles();

    const initPays = (payArray) => {
        for (let i = 0; i < payArray.length; i++) {
            setPays(pays => [...pays, payArray[i]]);
        }
    };

    const initData = () => {
        setPays([]);
        initPays(window.localStorage.getItem("Pays Collection").split(","));
    };

    useEffect(() => {
        initData();
    }, []);

    useEffect(() => {
        setPayListItems([]);
        for (let i = 0; i < pays.length; i++) {
            let itemObj = {
                name: pays[i],
                deleteBtn: <FontAwesomeIcon icon={faTimes} onClick={() => deletePay(pays[i])}/>
            }
            setPayListItems(payListItems => [...payListItems, <ListItem obj={itemObj} key={"pay-" + i} />]);
        }
    }, [pays]);

    useEffect(() => {
        if (addPay) {
            let elements = document.getElementsByClassName("area-box");
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.opacity = 0.5;
            }
        } else {
            let elements = document.getElementsByClassName("area-box");
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.opacity = 1;
            }
        }
    }, [addPay]);

    const addPayIndicator = (indicator) => {
        setAddPay(indicator);
    }

    const handleChangeAddPayValue = (event) => {
        setAddPayValue(event.target.value);
    };

    const addPaySetting = () => {
        if (addPayValue !== "") {
            let currentPaysArray = window.localStorage.getItem("Pays Collection").split(",");
            currentPaysArray.push(addPayValue);
            window.localStorage.setItem("Pays Collection", currentPaysArray.toString());
            window.localStorage.setItem(addPayValue, "0");
            initData();
        }
        addPayIndicator(false);
        setAddPayValue("");
    }

    const deletePay = (payName) => {
        if (window.confirm("本当に" + payName + "を削除しますか? (" + payName + "に関連したデータも削除されます)")) {
            let currentPayCollectionArray = window.localStorage.getItem("Pays Collection").split(",");
            let newPayCollectionArray = [];
            for (let i = 0; i < currentPayCollectionArray.length; i++) {
                if (currentPayCollectionArray[i] !== payName) {
                    newPayCollectionArray.push(currentPayCollectionArray[i]);
                }
            }
            window.localStorage.setItem("Pays Collection", newPayCollectionArray.toString());
            window.localStorage.removeItem(payName);

            //remove from state pays
            let idx = pays.indexOf(payName);
            if (idx > -1) {
                let newPays = pays;
                newPays.splice(idx, 1);
                setPays([]);
                initPays(newPays);
            }
        }
    };

    return (
        <div className="content">
            <div className="area-box">
                <div className="set-title">Pay</div>
                <div className="add-icon"><FontAwesomeIcon icon={faPlusCircle} onClick={() => addPayIndicator(true)}/></div>
                {payListItems.length ?
                payListItems
                : <div>Loading</div>}
            </div>
            <div className={addPay ? "setting-pop active" : "setting-pop"}>
                <FontAwesomeIcon icon={faTimes} className="close-button" onClick={() => addPayIndicator(false)}/>
                <div className="flex-area">
                    <p className="pop-title">Pay追加</p>
                    <TextField
                        className="pop-value"
                        className={clsx(classes.margin, classes.textField)}
                        value={addPayValue}
                        onChange={handleChangeAddPayValue}
                    />
                    <Button variant="contained" className="add-button" onClick={addPaySetting} style={{maxWidth: '90px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}>
                        追加
                    </Button>
                </div>
            </div>
        </div>
    );
}

function Setting() {
    return (
      <div id="setting">
        <CategorySet />
        <PaySet />
      </div>
    );
}

  export default Setting;