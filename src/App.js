import { useState } from 'react';
import './App.css';
import calls from './Fetches';
import Main from './components/Main';
import Form from './components/Form';
import Profile from './components/Profile';
import Masteries from './components/Masteries';
import Matches from './components/Matches';



function App() {

    const [stats, setStats] = useState(undefined)
    const [server, setServer] = useState(undefined)
    const [profile, setProfile] = useState(undefined)
    const [matches, setMatches] = useState(undefined)
    const [masteries, setMasteries] = useState(undefined)


    const getData = (server, name) => {
        setServer(server)
        console.log('getData called: ', server, name)
        fetch(calls.fetchBySummonerName(server, name))
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setStats(data)
                getMasteries(server, data.id)
                getProfile(server, data.id)
                getMatchHistory("americas", data.puuid)
            })
            .catch(error => console.error(error))
    }

    const getProfile = (server, id) => {
        fetch(calls.fetchRankedDetails(server, id))
            .then(response => response.json())
            .then(data => {
                console.log('getProfile called: ', data)
                setProfile(data)
            })
            .catch(error => console.error(error))
    }

    const getMatchHistory = (server, puuid) => {
        fetch(calls.fetchLastMatches(server, puuid))
            .then(response => response.json())
            .then(data => {
                console.log('getMatchHistory called: ', data)
                setMatches(data)
            })
            .catch(error => console.error(error))
    }

    const getMasteries = (server, id) => {
        fetch(calls.fetchMasteriesById(server, id))
            .then(response => response.json())
            .then(data => {
                console.log('componentDidMount being called: ', data)
                setMasteries(data)
            })
            .catch(error => console.error(error))
    }

    return (
        <div className="App">
            <header className="App-header">
                <Form getData={getData} />
            </header>
            {profile && <Profile data={profile} icon={stats.profileIconId} summ={stats.summonerLevel} /> }
            {masteries && <Masteries data={masteries} /> }
            {matches && <Matches data={matches} user={stats} />}

            <footer></footer>
        </div>
    );
}

export default App;
