// import React, { useState, useEffect } from 'react';

const defaultPaysCollection = "PayPay,LINE Pay,au Pay,マイカ,WAON,でんでん,ICOCA,NICOPA";
const defaultCatsCollection = "食品,美容,その他";

const initHelper = (keyName, valueStr) => {
    if (!window.localStorage.getItem(keyName)) {
        window.localStorage.setItem(keyName, valueStr);
    }
};

const initStorage = () => {

    /****************** Database Structure ******************************
        "Pays Collection" : "PayPay, LINE Pay, au Pay, マイカ, WAON, でんでん, ICOCA, NICOPA"
        "Cats Collection" : "食品, 美容, その他"
        "PayPay" : 400
        ...
        "食品" : 500
        ...
    *********************************************************************/

    // initialize `Pays Collection`
    initHelper("Pays Collection", defaultPaysCollection);

    // initialize `Cats Collection`
    initHelper("Cats Collection", defaultCatsCollection);

    // initialize each pay
    let currentPayCollectionArray = window.localStorage.getItem("Pays Collection").split(",");
    for (let i = 0; i < currentPayCollectionArray.length; i++) {
        initHelper(currentPayCollectionArray[i], "0");
    }

    // initialize each category
    let currentCatCollectionArray = window.localStorage.getItem("Cats Collection").split(",");
    for (let i = 0; i < currentCatCollectionArray.length; i++) {
        initHelper(currentCatCollectionArray[i], "0");
    }

    return ({
        defaultPaysCollection: window.localStorage.getItem("Pays Collection").split(","),
        defaultCatsCollection: window.localStorage.getItem("Cats Collection").split(","),
    });
};

export default initStorage;