import logo from './logo.svg';
import './App.css'
import calls from './Fetches';
import Main from './components/Main';
import APIKey from './api';


function App() {

const userName = calls.fetchBySummonerName('Ghostday')



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      
      <Main apiKey={APIKey} user={userName}/>
    </div>
  );
}

export default App;
