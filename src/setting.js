/***********  REACT ***********************************/
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

/***********  COMPONENT *******************************/
import db from "./firestore.js";
import "./styles/setting.css";

/***********  FONTAWESONE *****************************/
import { faPlusCircle, faTimes, faEquals } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/***********  MATERIAL UI *****************************/
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
    testField: {
        margin: theme.spacing(1),
        width: "40%",
    },
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
    const classes = useStyles();

    /****************** fetch category data from firestore ********************/
    const [catsCollection, setCatsCollection] = useState([]);
    const fetchCatsCollection = async() => {
        setCatsCollection([]);
        const response = db.collection("category");
        const data = await response.get();
        data.docs.forEach(item => {
            const itemObj = {
                name: item.data().name,
                deleteBtn: <FontAwesomeIcon icon={faTimes} onClick={() => deleteCat(item.data().name)}/>
            }
            setCatsCollection(catsCollection => [...catsCollection, <ListItem obj={itemObj} key={"cat-" + item.data().name} />]);
        });
      };
    useEffect(() => {
        fetchCatsCollection();
    }, []);

    /****************** Adding category state/function ********************/
    const [addingCategoryName, setAddingCategoryName] = useState("");
    const [addCatPopUp, setAddCatPopUp] = useState(false);
    const handleChangeAddCatValue = (event) => {
        setAddingCategoryName(event.target.value);
    };
    const addCatPopUpIndicator = (indicator) => {
        setAddCatPopUp(indicator);
    };
    const addNewCategory = async() => {
        if (addingCategoryName !== "") {
            const newData = {
                name: addingCategoryName,
            }
            await db.collection('category').doc(addingCategoryName).set(newData);
        }
        addCatPopUpIndicator(false);
        setAddingCategoryName("");
        fetchCatsCollection();
    }
    useEffect(() => {
        const elements = document.getElementsByClassName("area-box");
        addCatPopUp ? [...elements].forEach(e => e.style.opacity = 0.5) : [...elements].forEach(e => e.style.opacity = 1); 
    }, [addCatPopUp]);

    /****************** Deleting category function ********************/
    const deleteCat = async(catName) => {
        if (window.confirm("本当に" + catName + "を削除しますか? (" + catName + "に関連したデータも削除されます)")) {
            await db.collection("category").doc(catName).delete();
            fetchCatsCollection();
        }
    };

    return (
        <div className="content">
            <div className="area-box">
                <div className="set-title">カテゴリー</div>
                <div className="add-icon"><FontAwesomeIcon icon={faPlusCircle} onClick={() => addCatPopUpIndicator(true)}/></div>
                {catsCollection.length ?
                catsCollection
                : <div>Loading</div>}
            </div>
            <div className={addCatPopUp ? "setting-pop active" : "setting-pop"}>
                <FontAwesomeIcon icon={faTimes} className="close-button" onClick={() => addCatPopUpIndicator(false)}/>
                <p className="pop-title">カテゴリー追加</p>
                <div className="inline">
                    <TextField
                        className="pop-value"
                        className={classes.testField}
                        value={addingCategoryName}
                        onChange={handleChangeAddCatValue}
                    />
                    <Button variant="contained" className="add-button" onClick={addNewCategory} style={{maxWidth: '90px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}>
                        追加
                    </Button>
                </div>
            </div>
        </div>
    );
}

function PaySet() {
    const classes = useStyles();

    /****************** fetch pay data from firestore ********************/
    const [paysCollection, setPaysCollection] = useState([]);
    const fetchPaysCollection = async() => {
        setPaysCollection([]);
        const response = db.collection("pay").orderBy("order");
        const data = await response.get();
        data.docs.forEach(item => {
            setPaysCollection(paysCollection => [...paysCollection, item.data()]);
        });
    };
    useEffect(() => {
        fetchPaysCollection();
    }, []);

    /****************** Adding pay state/function ********************/
    const [addingPayName, setAddingPayName] = useState("");
    const [addPayPopUp, setAddPayPopUp] = useState(false);
    const handleChangeAddingPayName = (event) => {
        setAddingPayName(event.target.value);
    };
    const addPayPopUpIndicator = (indicator) => {
        setAddPayPopUp(indicator);
    };
    const addNewPay = async() => {
        if (addingPayName !== "") {
            const newData = {
                name: addingPayName,
                balance: 0,
                order: paysCollection.length,
            }
            await db.collection('pay').doc(addingPayName).set(newData);
        }
        addPayPopUpIndicator(false);
        setAddingPayName("");
        fetchPaysCollection();
    }
    useEffect(() => {
        const elements = document.getElementsByClassName("area-box");
        addPayPopUp ? [...elements].forEach(e => e.style.opacity = 0.5) : [...elements].forEach(e => e.style.opacity = 1); 
    }, [addPayPopUp]);

    /****************** Deleting pay function ********************/
    const deletePay = async(payName) => {
        if (window.confirm("本当に" + payName + "を削除しますか? (" + payName + "に関連したデータも削除されます)")) {
            await db.collection("pay").doc(payName).delete();
            fetchPaysCollection();
        }
    };

    /****************** Changing pay order function ********************/
    const changeOrder = async(payName, srcIndex, desIndex) => {
        const oneUp = srcIndex > desIndex ? true : false
        oneUp ?
        paysCollection.forEach(async(item) => {
            if (desIndex <= item.order && item.order < srcIndex) {
                await db.collection("pay").doc(item.name).update({
                    order: item.order + 1,
                });
            }
        })
        :
        paysCollection.forEach(async(item) => {
            if (srcIndex < item.order && item.order <= desIndex) {
                await db.collection("pay").doc(item.name).update({
                    order: item.order - 1,
                });
            }
        })

        await db.collection("pay").doc(payName).update({
            order: desIndex,
        });
        // update React state order for now > when it's refreshed, the backend data is already re-ordered
        // paysCollection.splice(desIndex, 0, paysCollection.splice(srcIndex, 1)[0])
        // setPaysCollection(paysCollection);
        fetchPaysCollection();
    }

    return (
        <div className="content">
            <DragDropContext 
                onDragEnd={(param) => {
                    const payName = param.draggableId;
                    const srcIndex = param.source.index;
                    const desIndex = param.destination.index;
                    changeOrder(payName, srcIndex, desIndex);
                }}>
                <div className="area-box">
                    <div className="set-title">Pay</div>
                    <div className="add-icon"><FontAwesomeIcon icon={faPlusCircle} onClick={() => addPayPopUpIndicator(true)}/></div>
                    {paysCollection.length ?
                    <Droppable droppableId="droppable-pay">
                        {(provided, snapshot) => (
                            <div className="whiteWrap" ref={provided.innerRef} {...provided.droppableProps}> 
                                {paysCollection.map((item, i) => (
                                    <Draggable key={item.name} draggableId={item.name} index={i}>
                                        {(provided, snapshot) => (
                                            <div 
                                                className="list-item" 
                                                ref={provided.innerRef} 
                                                {...provided.draggableProps} 
                                                style={{
                                                    ...provided.draggableProps.style,
                                                    boxShadow: snapshot.isDragging ? "0 0 .4rem #666" : "none"
                                                }}
                                            >
                                                <div {...provided.dragHandleProps}><FontAwesomeIcon icon={faEquals}/></div>
                                                <p>{item.name}</p>
                                                <FontAwesomeIcon icon={faTimes} onClick={() => deletePay(item.name)}/>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    : <div>Loading</div>}
                </div>
            </DragDropContext>
            <div className={addPayPopUp ? "setting-pop active" : "setting-pop"}>
                <FontAwesomeIcon icon={faTimes} className="close-button" onClick={() => addPayPopUpIndicator(false)}/>
                <p className="pop-title">Pay追加</p>
                <div className="inline">
                    <TextField
                        className="pop-value"
                        className={classes.testField}
                        value={addingPayName}
                        onChange={handleChangeAddingPayName}
                    />
                    <Button variant="contained" className="add-button" onClick={addNewPay} style={{maxWidth: '90px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}>
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