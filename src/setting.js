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
        }
    };

    useEffect(() => {
        setCats([]);
        setCatListItems([]);
        initCats(window.localStorage.getItem("Cats Collection").split(","));
        for (let i = 0; i < cats.length; i++) {
            let itemObj = {
                name: cats[i],
                deleteBtn: <FontAwesomeIcon icon={faTimes} onClick={() => deleteCat(cats[i])}/>
            }
            setCatListItems(catListItems => [...catListItems, <ListItem obj={itemObj} key={"cat-" + i} />]);
        }
        // console.log(cats);
        // console.log(catListItems);
    }, []);

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
    return (
        <div className="area-box">
            <div className="set-title">Pay</div>
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