import React, { useState } from 'react';
import Options from './Options';
import GrandTotal from './GrandTotal';
import OrderSummary from '../summary/OrderSummary';

const OrderEntry = () => {
    const [viewOrder, setViewOrder] = useState(false);


    const viewOrderHandler = ()=>{
        setViewOrder(true)
    };

    const  orderSetHandler = ()=>{
        setViewOrder(false)
    };

    return (
      <>
          {!viewOrder &&
          <div>
              <Options optionType='scoops'/>
              <Options optionType='toppings'/>
              <GrandTotal/>

              <button onClick={viewOrderHandler}>View Order</button>

          </div>
          }

          {viewOrder &&
            <OrderSummary newOrder={orderSetHandler}/>
          }

      </>
    )
};

export default OrderEntry;
