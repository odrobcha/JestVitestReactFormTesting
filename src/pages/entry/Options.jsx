import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ScoopOption from './ScoopOptions';
import ToppingOptions from './ToppingOptions';
import AlertBanner from '../common/AlertBanner';
import {pricePerItem} from '../../constants';
import {formatCurrency} from '../../utilities';
import { useOrderDetails} from '../../context/OrderDetails';

import { Col } from 'react-bootstrap';

const Options = ({ optionType }) => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(false);
    const {totals} = useOrderDetails();

    useEffect(
      () => {
          // create an abortController to attach to network request
          const controller = new AbortController()
          //optionType is 'scoops' or ' toppings
          axios
            .get(`http://localhost:3030/${optionType}` /*, {signal: controller.signal}*/) //axios watch abortController
            .then(res => {
                setItems(res.data);
            })
            .catch(err => {
                //error handling
                if (error.name !== "CanceledError") {   //to set error only if request was not Canceled
                    setError(true);
                }
            });

          //abort axios call on component unmount
          return ()=> {
           // controller.abort();

              console.log("Unmount")
          }
      },
      [optionType]);
    if (error){
        return <AlertBanner/>
    }

    const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOptions;

    const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

    const optionItems = items.map((item) => (
      <ItemComponent
        key={item.name}
        name={item.name}
        imagePath={item.imagePath}
      />
    ));


    return (
      <>
          <h2>
              {title}
          </h2>
          <p>{formatCurrency(pricePerItem[optionType])} each</p>
          <p>{title} total: {formatCurrency(totals[optionType])}</p>

          <div style={{display: "flex", justifyContent : "space-around" , marginBottom: "40px"}}>
              {optionItems}
          </div>
      </>
    );
};

export default Options;
