import React, { useState } from 'react';
import SummaryForm from './SummaryForm';
import { useOrderDetails } from '../../context/OrderDetails';
import { formatCurrency } from '../../utilities';

const OrderSummary = ({ newOrder }) => {
    const { totals, optionCounts } = useOrderDetails();
    const scoopArray = Object.entries(optionCounts.scoops); // [["chocolates" : 2], ["vanila" : 2]]
    const scoopList = scoopArray.map(([key, value]) => {
        return (
          <li key={{ key }}>
              {value} {key}
          </li>
        );
    });

    const toppingsArray = Object.keys(optionCounts.toppings); //["M&M's" , "Gummy bear"]
    const toppingsList = toppingsArray.map(key => {
        return (
          <li key={key}>
              {key}
          </li>
        );
    });

    const [orderNumber, setOrderNumber] = useState();

    const onOrderSetHandler = (orderNumber) => {
        setOrderNumber(orderNumber);
    };
    const newOrderHandler = ()=>{
        newOrder();
    }

    return (
      <>
          <div>
              <h1>Order Summary</h1>
              <h2>Scoops: {formatCurrency(totals['scoops'])}</h2>
              <ul>{scoopList}</ul>
              <h2>Toppings: {formatCurrency(totals['toppings'])}</h2>
              <ul> {toppingsList}</ul>
              <SummaryForm onOrderSet={onOrderSetHandler}/>
          </div>
          {orderNumber &&
          <div>
              <p>Order number: {orderNumber}</p>
              <button onClick={newOrderHandler}>New order</button>
          </div>
          }
      </>
    );

};

export default OrderSummary;
