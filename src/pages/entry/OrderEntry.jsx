import React, { useState } from 'react';
import Options from './Options';
import GrandTotal from './GrandTotal';
import OrderSummary from '../summary/OrderSummary';
import { useOrderDetails} from '../../context/OrderDetails';

const OrderEntry = () => {
    const [viewOrder, setViewOrder] = useState(false);
    const {totals} = useOrderDetails();

    const viewOrderHandler = () => {
        setViewOrder(true);
    };

    const orderSetHandler = () => {
        setViewOrder(false);
    };

    return (
      <>
          {!viewOrder &&
          <div>

              <Options optionType='scoops'/>
              <Options optionType='toppings'/>
              <GrandTotal/>

              <button
                disabled={!totals.scoops}
                onClick={viewOrderHandler}>View Order</button>

          </div>
          }

          {viewOrder &&
          <OrderSummary newOrder={orderSetHandler}/>
          }

      </>
    );
};

export default OrderEntry;
