import { useState, useEffect } from 'react';
import './App.css';
import calls from './Fetches';
import Form from './components/Form'
import Profile from './components/Profile';
import Masteries from './components/Masteries';
import Matches from './components/Matches';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { Nav, Navbar, NavbarBrand } from 'react-bootstrap';
import About from './components/About';


// Can change the port here.
const fetchUrl = 'http://localhost:4000'

let postInfo = (r, u) => {
    return {method: "POST",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        server: r,
        summonerName: u,
        id: Math.random().toFixed(2)
    })
}}

function submitData(server, name) {
    fetch(`${fetchUrl}/searches`, postInfo(server, name))
    .then(Response => Response.json())
    .then(returnedPromise => {
        console.log(returnedPromise)
    })
    .catch(error => {
        console.log("Error: ", error)
    })
}





function App() {

    const [stats, setStats] = useState(undefined)
    const [searches, setSearches] = useState(undefined)
    const [server, setServer] = useState(undefined)
    const [profile, setProfile] = useState(undefined)
    const [matches, setMatches] = useState(undefined)
    const [masteries, setMasteries] = useState(undefined)

    useEffect(() => {
        fetch('http://localhost:4000/searches')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setSearches(recentSearches(data))
            })
            .catch(console.log('No Searches Returned'))
    },[])



    const getData = (server, name) => {
        setServer(server)
        console.log('getData called: ', server, name)
        fetch(calls.fetchBySummonerName(server, name))
            .then(response => response.json())
            .then(data => {
                console.log(data)
                submitData(server, name)
                setStats(data)
                getMasteries(server, data.id)
                getProfile(server, data)
            })
            .catch(error => console.error(error))
    }

    const getProfile = (server, call) => {
        fetch(calls.fetchRankedDetails(server, call.id))
            .then(response => response.json())
            .then(data => {
                console.log('getProfile called: ', data)
                setProfile(data)
                getMatchHistory("americas", call.puuid)
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




    const recentSearches = (data) => {
        console.log(data)
        let searchList = data.map(value => {
            return (
            <li>
                <em className="text-muted">{value.server}</em> {value.summonerName}
            </li>
            )
        })
        return searchList
    }



        if (!matches) {
            return (
                <div class="App">
                    <Form getData={getData} />
                    These players have been searched recently:
                    <ul>

                        {searches && searches}
                    </ul>
                </div>
            )
        }

        return  (
        <BrowserRouter>
          <Navbar sticky="top" bg="dark" variant="dark">
              <Nav>
              <Nav.Link>
                <Link to="/profile">Profile</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/masteries">Masteries</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/matches">Match History</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/about">About</Link>
              </Nav.Link>
              </Nav>
            <Navbar.Collapse className="justify-content-end">
              <NavbarBrand>GetGud.gg</NavbarBrand>
            </Navbar.Collapse>
          </Navbar>
        <div className="App">
            <Switch>
                <Route path="/profile">
                    <Profile data={profile} icon={stats.profileIconId} summ={stats.summonerLevel} />
                </Route>
                <Route path="/masteries">
                    <Masteries data={masteries} /> 
                </Route>
                <Route path="/matches">
                    <Matches data={matches} user={stats}/>
                </Route>
                <Route path="/matches">
                    <Matches data={matches} user={stats}/>
                </Route>
                <Route path="/about">
                    <About />
                </Route>
            </Switch>
        </div>
      </BrowserRouter>
    );
}

export default App;
