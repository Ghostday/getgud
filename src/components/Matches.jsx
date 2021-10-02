import React from "react";
import Fetches from '../Fetches';
import { useState } from "react";
import MatchInfo from './MatchInfo';


export default function Matches({data}) {

    let [matchHistory, setMatchHistory] = useState(undefined)

    const matches = data
    console.log('Matches.jsx | Match Info: ', matches)

    const makeMatchCard = (input) => {
        const data = input.info
        const matchId = input.metadata.matchId

        const queue = ((input) => {
            if (input === 420) {
                return '5v5 Ranked Solo/Duo'
            }
            else if (input === 325) {
                return 'All Random Game'
            }
            else if (input === 430) {
                return '5v5 Blind Pick'
            }
            else if (input === 440) {
                return '5v5 Ranked Flex'
            }
            else if (input === 450) {
                return '5v5 ARAM'
            }
            else if (input === 900) {
                return 'URF'
            }
            else if (input === 700) {
                return 'Clash Tournament'
            }
            else if (input === 830) {
                return 'Intro Bots'
            }
            else if (input === 840) {
                return 'Beginner Bots'
            }
            else if (input === 850) {
                return 'Intermediate Bots'
            }
            else {
                return 'Unknown'
            }
        })(data.queueId)

        const map = ((input) => {
            if (input === 11) {
                return `Summoner's Rift`
            }
            else if (input === 12) {
                return 'Howling Abyss'
            }
            else {
                return 'Depreciated Map'
            }
        })(data.mapId)
        
        let matchDate = new Date(data.gameStartTimestamp)
        let matchLength = data.gameDuration
        let players = data.participants

        let cardInfo = {
            date: matchDate,
            length: matchLength,
            type: [queue, map],

        }

        return <MatchInfo data={cardInfo}/>

    }

    const fetchData = (matchKey) => {
        fetch(Fetches.fetchMatchDetails('americas', matchKey))
        .then(response => response.json())
        .then(data => {
            console.log('Fetched Match Details: ', data)
            makeMatchCard(data)
        })
    }

     console.log('rendering')



    return (
        <div>
            <h2>Fetching</h2>
            {matchHistory}
        </div>
    )

    

}