import React, {useContext} from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import calls from "../Fetches";
import Masteries from './Masteries'
import Profile from './Profile'
import Matches from "./Matches";

class Main extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            masteries: undefined,
        }
        this.context = {
            account: this.props.data,
        }
    }




render() {
    const Account =  React.createContext(this.props.data)
    const {name, summonerLevel, profileIconId, id, puuid} = this.props.stats


    console.log('Main Rendering: ', name)

    return (
        <Account.Provider value={this.props.data} >
            <Profile data={this.props.profile} icon={profileIconId} summ={summonerLevel}/>
            <ButtonGroup>
                <Button variant="outline-primary">Masteries</Button>
                <Button variant="outline-primary">Match History</Button>
            </ButtonGroup>
            { this.state.masteries && <Masteries data={this.state.masteries} /> }
            { this.props.matches && <Matches data={this.props.matches} /> }
        </Account.Provider>
    )


}

componentDidMount() {
    fetch(calls.fetchMasteriesById(this.props.region, this.props.stats.id))
    .then(response => response.json())
    .then(data => {
        console.log('componentDidMount being called: ', data)
        this.setState({
            masteries: data,
        })
    })
    .catch(error => console.error(error))
}


}

export default Main