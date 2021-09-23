import React from "react";
import calls from "../Fetches";
import Masteries from './Masteries'


class Main extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            masteries: [],
            matches: [],
        }

    }




render() {
    const {name, summonerLevel, id, puuid} = this.props.stats
    console.log(name)

    return (
        <div>
            <h1>{name}</h1>
            <h2>{summonerLevel}</h2>
            <Masteries data={this.state.masteries} />
        </div>
    )


}

componentDidMount() {
    fetch(calls.fetchMasteriesById(this.props.region, this.props.stats.id))
    .then(response => response.json())
    .then(data => {
        console.log(data)
        this.setState({
            masteries: data
        })
    })
    .catch(error => console.error(error))
}


}

export default Main