
import SummaryForm from './pages/summary/SummaryForm';
import Options from './pages/entry/Options';

function App() {
    return (
      <div>
          <h1>Sundaes on Demand</h1>
          <Options optionType='scoops'/>
          <Options optionType='toppings'/>
          <SummaryForm/>
      </div>
    );
}

export default App;
