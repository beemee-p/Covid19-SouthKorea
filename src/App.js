import './App.css';
import Header from './components/Header';
import AccGraph from './components/AccGraph';
import DailyGraph from './components/DailyGraph';
import Article from './components/Article';

function App() {
  return (
    
    <div className="App">
      <Header></Header>
      <section>
        <div className="contents">
          <AccGraph></AccGraph>
          <DailyGraph></DailyGraph>       
        </div>             
        <Article></Article>            
      </section>  
    </div>
  );
}

export default App;
