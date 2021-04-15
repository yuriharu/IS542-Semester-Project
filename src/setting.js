import './styles/setting.css';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

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
        <div className="area-box">
            <div className="set-title">カテゴリー</div>
            {catListItems.length ?
            catListItems
            : <div>Loading</div>}
        </div>
    );
}

function PaySet() {
    const [pays, setPays] = useState([]);
    const [payListItems, setPayListItems] = useState([]);

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
        <div className="area-box">
            <div className="set-title">Pay</div>
            {payListItems.length ?
            payListItems
            : <div>Loading</div>}
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