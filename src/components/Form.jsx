import React from "react";

class searchForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            server: 'OC1',
            sumName: '',    
        };

    }

    handleChange = (event) => {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        });
        console.log('State is changing: ', this.state)
    }

    handleSubmit = (event) => {
        console.log('handleSubmit()', event)
        event.preventDefault();
        const { getData } = this.props;
        getData(this.state.server, this.state.sumName);
    }

    render() {
        return (
        <form onSubmit={this.handleSubmit}>
            <label>
            <select name="server" value={this.state.server} onChange={this.handleChange}>
                <option value="OC1">Oceania</option>
                <option value="BR1">Brazil</option>
                <option value="EUN1">Europe Nordic/East</option>
                <option value="EUW1">Europe West</option>
                <option value="JP1">Japan</option>
                <option value="KR">Korea</option>
                <option value="LA1">LAS</option>
                <option value="LA2">LAN</option>
                <option value="NA1">North America</option>
                <option value="RU">Russia</option>
                <option value="TR1">Turkey</option>
            </select>
            </label>
            <input name="sumName" type="text" placeholder="Summoner Name" onChange={this.handleChange} />
            <input type="submit" value="Submit" />
        </form>
        );
    }
}

export default searchForm