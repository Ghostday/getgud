import { useState } from 'react';
import './App.css'
import calls from './Fetches';
import Main from './components/Main';
import Form from './components/Form'


function App() {

  const [stats, setStats] = useState(undefined)
  const [server, setServer] = useState(undefined)


  const getData = (server, name) => {
    setServer(server)
    console.log('getData called: ', server, name)
    fetch(calls.fetchBySummonerName(server, name))
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setStats(data)
      })
      .catch(error => console.error(error))
  }


  return (
    <div className="App">
      <header className="App-header">
      <Form getData={getData}/>
      { stats && <Main stats={stats} region={server}/> }
      </header>

      
    </div>
  );
}

export default App;
