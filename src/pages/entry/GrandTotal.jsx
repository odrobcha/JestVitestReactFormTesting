import {useOrderDetails} from '../../context/OrderDetails';
import {formatCurrency} from '../../utilities/index'

const GrandTotal = () =>{
    const {totals} = useOrderDetails();
    const grandTotals = totals.scoops + totals.toppings;
    return(
      <h2>
          Grand total: {formatCurrency(grandTotals)}
      </h2>
    )
}
export default GrandTotal;
