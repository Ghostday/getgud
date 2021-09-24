import React from "react"
import { Card } from 'react-bootstrap'
import championData from '../data/data/en_AU/champion.json'

const cDragonChamps = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/en_au/v1/champions/'

class Masteries extends React.Component {


    
    render() {

        // Defining the variables to be used in the upcoming storage of Data
        const championArr = []

        // Passing the base JSON object to an array for usage of the array Methods
        const champions = Object.entries(championData.data)
        
        this.props.data.forEach(element => {
            // value[0] seems to only hold the champion name, instead of the key, which is useless
            // for searching for champions as the API only returns the champion Key, not he name natively
            let champ = champions.find(value => value[1].key == element.championId)

            // Assigning these values to the object array for ease of manipulation for later
            champ.championPoints = element.championPoints
            champ.championLevel = element.championLevel
            champ.chestGranted = element.chestGranted
            
            championArr.push(champ)
        });

        console.log('Champion Array: ',championArr)


        return (
            <h1></h1>
        )

    }
}



export default Masteries