import React from "react";
import Fetches from '../Fetches'
import { useState, useEffect, useRef } from "react";
import { OverlayTrigger, Button, Tooltip } from "react-bootstrap";
import './MatchCard.css'


export default function MatchCard({match, key, user, rank}) {

    const [matchInfo, setMatchInfo] = useState(undefined)
    
    useEffect(() => {
        fetch(Fetches.fetchMatchDetails('americas', match))
        .then(response => response.json())
        .then(data => {               
            console.log('Fetched Match Details: ', data)
            setMatchInfo(data)
            })
    },[])

    function comparedPositions(a, b) {
        if (a.individualPosition < b.individualPosition) {
          return -1;
        }
        if (a.individualPosition > b.individualPosition) {
          return 1;
        }
        return 0;
    }

    const onClickHandler = (e) => {
        const hiddenElement = e.currentTarget.nextSibling;
        hiddenElement.className.indexOf("collapse show") > -1 ? hiddenElement.classList.remove("show") : hiddenElement.classList.add("show");
    };
    
    const makeMatchCard = (input) => {
        const data = input.info
        const matchId = input.metadata.matchId

        //Javascript MAP/Object
        let queue = ((input) => {
            if (input === 420) {
                return 'Ranked Solo/Duo'
            }
            else if (input === 400) {
                return 'Draft Pick'
            }
            else if (input === 325) {
                return 'All Random Game'
            }
            else if (input === 430) {
                return 'Blind Pick'
            }
            else if (input === 440) {
                return 'Ranked Flex'
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
        
        const matchDate = () => {
            const date = new Date(data.gameStartTimestamp)
            let month = date.getMonth() + 1
            let day = date.getDate()
            let year = date.getFullYear()
            let finalDate = day.toString() + '/' + month.toString() + '/' + year.toString().slice(2)
            return finalDate
        }

        function secondsToHms(d) {
            d = Number(d);
            var h = Math.floor(d / 3600);
            var m = Math.floor(d % 3600 / 60);
            var s = Math.floor(d % 3600 % 60);
        
            var hDisplay = h < 10 ? h = 0+h.toString() : h
            var mDisplay = m < 10 ? m = 0+m.toString() : m
            var sDisplay = s < 10 ? s = 0+s.toString() : s
            return mDisplay + ':' + sDisplay; 
        }

        let matchLength = secondsToHms(data.gameDuration)

        let teams = ((input) => {
            let positions = input.sort(comparedPositions)
            let blueTeam = positions.filter(a => {
                return a.teamId === 100
            })
            let redTeam = positions.filter(a => {
                return a.teamId === 200
            })
            blueTeam.kills = blueTeam.reduce((acc, val) => {
                return acc + val.kills
            }, 0)
            redTeam.kills = blueTeam.reduce((acc, val) => {
                return acc + val.kills
            }, 0)
            return {blueTeam, redTeam}
        })(data.participants)

        let curPlayer = data.participants.find(value => {
            return value.summonerName === user.name
        })

        console.log('Current Player: ', curPlayer)
        const playerGold = curPlayer.goldEarned
        const playerGoldPercent = (() => {
            if (curPlayer.teamId === 100) {
                let teamGold = teams.blueTeam.reduce((acc, val) => {
                    return acc + val.goldEarned
                }, 0)
                return ((playerGold / teamGold) * 100).toFixed(2) + '%'
            }
            else {
                let teamGold = teams.redTeam.reduce((acc, val) => {
                    return acc + val.goldEarned
                }, 0)
                return ((playerGold / teamGold) * 100).toFixed(2) + '%'
            }
        })()

        const cardChampIcon = () => {
            let link = `https://ddragon.leagueoflegends.com/cdn/11.19.1/img/champion/${curPlayer.championName}.png`
            return (
                <img src={link} alt="champIcon"/>
            )
        }

        const cardChampPosition = () => {
            let link = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/ranked/positions/`
        }
        const playerKDA = ((input) => {
            return `${input.kills}/${input.deaths}/${input.assists}`
        })(curPlayer)

        const curPlayerKP = ((input) => {
            let team;
            if (input.teamId === 100) {team = teams.blueTeam}
            else {team = teams.redTeam}
            let kp = (input.kills + input.assists) / team.kills * 100
            kp = kp.toFixed(2) + '%'
            return kp
        })(curPlayer)

        const curPlayerStats = () => {
            return (
                <td>
                <OverlayTrigger
                    key={matchId + 'kda'}
                    placement={"top"}
                    overlay={
                        <Tooltip id={`tooltip-${matchId + 'kda'}`}>
                            <div className='playerKp'>You participated in {curPlayerKP} of the action!</div>
                        </Tooltip>}>
                    <div className='playerKda'>{playerKDA}</div>
                </OverlayTrigger>
                <OverlayTrigger
                    key={matchId + 'gold'}
                    placement={"bottom"}
                    overlay={
                        <Tooltip id={`tooltip-${matchId + 'gold'}`}>
                            <div className='playerGoldPercent'>You had {playerGoldPercent} of all the team's gold.</div>
                        </Tooltip>}>
                    <div className='playerGold'>{playerGold}g</div>
                </OverlayTrigger>
                </td>
            )
        }

        let topDeets = () => {
            return (
            <tr onClick={onClickHandler} className={curPlayer.win ? 'matchCardWin' : 'matchCardLoss'}>
                <td className='cardChampIcon'>{cardChampIcon()}</td>
                <td>
                    <div className='matchIdInfo text-muted'>{matchId}</div>
                    <div className='dateInfo'>{matchDate()}</div>
                    <div className='timeInfo'>{matchLength}</div>
                </td>
                {curPlayerStats()}
                <td>$150.00</td>
                <td/>
                <td className="matchQueueType">
                    <div>{queue}</div>
                    <div className="text-muted">{map}</div>
                </td>
            </tr>
        )}
        let expandedDeets = () => {
        let deets = {
            matchId: matchId,
            length: matchLength,
            type: [queue, map],
            players: teams,
        }
            return (
                <tr className="collapse">
                    <div>
                        Info
                    </div>
                </tr>
            )

        }

        return (
            <>
                {topDeets()}
                {expandedDeets()}
            </>
        )

    }



    return (
        <div>
        {matchInfo ? makeMatchCard(matchInfo):<td>Loading</td>}
        </div>

        
    )
}