import React, {createContext, useContext, useState} from 'react';
import {pricePerItem} from '../constants/index'

const OrderDetails = createContext({

});

//create custom hook to check wheter we are in aprovider

export function useOrderDetails(){
    const contextValue = useContext(OrderDetails);

    if(!contextValue){
        throw new Error("useOrderDetail must be called from withing an OrderDetailsProvider");
    }

    return contextValue;
}

export function OrderDetailsProvider (props){
    const [optionCounts, setOptionsCount] = useState({
        scoops: {},    //{chocolate: 1, Vanilla :2}
        toppings: {},   //{"Gummi bears" :1}
    });

    const updateItemCount = (itemName, newItemCount, optionType) =>{
        // make a copy of existing state
        const newOptionsCounts = { ...optionCounts};

        newOptionsCounts[optionType][itemName] = newItemCount;

        //set updated state
        setOptionsCount(newOptionsCounts);
    };
    const resetOrder = ()=>{
        setOptionsCount(
          {
              scoops: {},
              toppings: {},}
        )
    };

    const calculateTotal  = (optionsType)=>{
        //to get array of all counts [1,3]
        const countsArray = Object.values(optionCounts[optionsType]);
        //get total
        const totalCount = countsArray.reduce((total, value) => total + value, 0)

        //get price
        const price = totalCount * pricePerItem[optionsType];
        return price;
    };

    const totals = {
        scoops : calculateTotal('scoops'),
        toppings : calculateTotal("toppings")
    };

    const value = {
        optionCounts,
        totals,
        updateItemCount,
        resetOrder
    };

    return <OrderDetails.Provider value = {value} {...props}/>
}
