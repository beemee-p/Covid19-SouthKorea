import './App.css';
import Header from './components/Header'
import AccGraph from './components/AccGraph'
import DailyGraph from './components/DailyGraph';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <AccGraph></AccGraph>
      <DailyGraph></DailyGraph>
    </div>
  );
}

export default App;
