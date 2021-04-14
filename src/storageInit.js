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

    const defaultPaysCollection = ["PayPay", "LINE Pay", "au Pay", "マイカ", "WAON", "でんでん", "ICOCA", "NICOPA"];
    const defaultCatsCollection = ["食品", "美容", "その他"];

    // initialize `Pays Collection`
    initHelper("Pays Collection", "PayPay,LINE Pay,au Pay,マイカ,WAON,でんでん,ICOCA,NICOPA");

    // initialize `Cats Collection`
    initHelper("Cats Collection", "食品,美容,その他")

    // initialize each pay
    for (let i = 0; i < defaultPaysCollection.length; i++) {
        initHelper(defaultPaysCollection[i], "0");
    }

    // initialize each category
    for (let i = 0; i < defaultCatsCollection.length; i++) {
        initHelper(defaultCatsCollection[i], "0");
    }

    return ({
        defaultPaysCollection: window.localStorage.getItem("Pays Collection").split(","),
        defaultCatsCollection: window.localStorage.getItem("Cats Collection").split(","),
    });
};

export default initStorage;