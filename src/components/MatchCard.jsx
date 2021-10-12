import React from "react";
import Fetches from '../Fetches'
import { useState, useEffect } from "react";


export default function MatchCard({match, key}) {

    const [matchInfo, setMatchInfo] = useState(undefined)
    
    function comparedPositions(a, b) {
        if (a.individualPosition < b.individualPosition) {
          return -1;
        }
        if (a.individualPosition > b.individualPosition) {
          return 1;
        }
        return 0;
    }
    
    const makeMatchCard = (input) => {
        const data = input.info
        const matchId = input.metadata.matchId

        let queue = ((input) => {
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

        let map = ((input) => {
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

        let teams = ((input) => {
            let positions = input.sort(comparedPositions)
            let blueTeam = positions.filter(a => {
                return a.teamId === 100
            })

            let redTeam = positions.filter(a => {
                return a.teamId === 200
            })

            return [blueTeam, redTeam]
        })(data.participants)
        console.log('Matches.jsx | Teams: ', teams)

        let cardInfo = {
            matchId: matchId,
            date: matchDate,
            length: matchLength,
            type: [queue, map],
            players: teams,

        }

        return (
        <tr>
            <td>{matchId}</td>
            <td>{matchLength}</td>
            <td>Otto</td>
            <td>@mdo</td>
        </tr>
        )

    }

    useEffect(() => {
        if (!matchInfo) {
        fetch(Fetches.fetchMatchDetails('americas', match))
        .then(response => response.json())
        .then(data => {               
            console.log('Fetched Match Details: ', data)
            setMatchInfo(data)
            })
        }    
    })

    return (
        <div>
        {matchInfo && makeMatchCard(matchInfo)}
        <h1>Yo</h1>
        </div>
        
    )
}