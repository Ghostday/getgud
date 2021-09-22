import React from "react";
import calls from "../Fetches";


class Main extends React.Component {

    constructor(props) {
        super()
    }




render() {
    const userName = this.props.user
    console.log(userName)


    return (
        <div>
            <h1>{userName}</h1>
        </div>
    )    
}

}

export default Main