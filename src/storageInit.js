const initHelper = (keyName) => {
    if (!window.localStorage.getItem(keyName)) {
        window.localStorage.setItem(keyName, "0");
    }
};

const initStorage = () => {
    const paysCollection = ["PayPay", "LINE Pay", "au Pay", "マイカ", "WAON", "でんでん", "ICOCA", "NICOPA"];
    const catsCollection = ["食品", "美容", "その他"];

    for (let i = 0; i < paysCollection.length; i++) {
        initHelper(paysCollection[i]);
    }

    for (let i = 0; i < catsCollection.length; i++) {
        initHelper(catsCollection[i]);
    }

    return ({
        pays: paysCollection,
        cats: catsCollection
    });
};

export default initStorage;