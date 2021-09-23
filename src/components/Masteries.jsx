import React from "react"

const cDragonChamps = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/en_au/v1/champions/'

class Masteries extends React.Component {


    
    render() {
        const {
            championId,
            championLevel,
            championPoints,
            chestGranted,
        } = this.props.data
        
        this.props.data.forEach(element => {
            console.log(element)

            
        });

        console.log(championId)
        return (
            <h1></h1>
        )

    }
}



export default Masteries