import React from "react";
import calls from "../Fetches";
import Masteries from './Masteries'


class Main extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            masteries: undefined,
            matches: [],
        }

    }




render() {
    const {name, summonerLevel, id, puuid} = this.props.stats
    console.log('Main Rendering: ', name)

    return (
        <div>
            <h1>{name}</h1>
            <h2>{summonerLevel}</h2>
            { this.state.masteries && <Masteries data={this.state.masteries} /> }
        </div>
    )


}

componentDidMount() {
    fetch(calls.fetchMasteriesById(this.props.region, this.props.stats.id))
    .then(response => response.json())
    .then(data => {
        console.log('componentDidMount being called: ', data)
        this.setState({
            masteries: data
        })
    })
    .catch(error => console.error(error))
}


}

export default Main