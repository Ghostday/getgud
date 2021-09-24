import React from "react"
import { Card } from 'react-bootstrap'

const cDragonChamps = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/en_au/v1/champions/'

class Masteries extends React.Component {


    
    render() {
        const {
            championId,
            championLevel,
            championPoints,
            chestGranted,
        } = this.props.data

        const championArr = []
        
        this.props.data.forEach(element => {
            console.log(element)
            championArr.push(element.championId)

            
        });

        console.log(championArr)
        return (
            <h1></h1>
        )

    }
}



export default Masteries