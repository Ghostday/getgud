import React from "react";
import Fetches from '../Fetches'
import { useState, useEffect } from "react";
import { Table } from 'react-bootstrap'
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import './MatchCard.css'


export default function MatchCard({match, key, user}) {

    const [matchInfo, setMatchInfo] = useState(undefined)
    
    useEffect(() => {
        fetch(Fetches.fetchMatchDetails('americas', match))
        .then(response => response.json())
        .then(data => {               
            console.log('Fetched Match Details: ', data)
            setMatchInfo(data)
            })
        .catch(error => {
            console.error('Fetching Error: ', error)
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
        hiddenElement.className.indexOf("collapse table show") > -1 ? hiddenElement.classList.remove("show") : hiddenElement.classList.add("show");
    };
    
    const makeMatchCard = (input) => {
        const data = input.info
        const matchId = input.metadata.matchId

        //Javascript MAP/Object
        
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
            redTeam.kills = redTeam.reduce((acc, val) => {
                return acc + val.kills
            }, 0)
            return {blueTeam, redTeam}
        })(data.participants)

        let curPlayer = data.participants.find(value => {
            return value.summonerName === user.name
        })

        console.log('Current Player: ', curPlayer)

        const playerGold = (input) => { 
            return input.goldEarned
        }
        
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

        const cardChampIcon = (input) => {
            let link = `https://ddragon.leagueoflegends.com/cdn/11.19.1/img/champion/${input.championName}.png`
            return link
                
        }

        

        const cardChampPosition = (input) => {
            let position = (input.teamPosition).toLowerCase()
            let img = `https://raw.communitydragon.org/pbe/plugins/rcp-fe-lol-static-assets/global/default/svg/position-${position}.svg`
            return img
        }
        const playerKDA = (input) => {
            return `${input.kills}/${input.deaths}/${input.assists}`
        }

        const playerKp = ((input) => {
            let team;
            if (input.teamId === 100) {
                team = teams.blueTeam
            }
            else {
                team = teams.redTeam
            }
            let kp = (input.kills + input.assists) / team.kills * 100
            kp = kp.toFixed(2) + '%'
            return kp
        })(curPlayer)

        const playerItems = (input) => {
            let items = []
            let item;
            for (let i = 0; i < 6; i++) {
                item = ("item" + i).toString()
                items.push(input[item])
            }
            return (
            <td className="itemSet">
                {items.map(item => {
                    return <img className='item' src={`./items/${item}.png`} alt='item'/>
                })}
            </td>
            )
        }

        const mouseovers = () => {
            return (
                <td>
                <OverlayTrigger
                    key={matchId + 'kda'}
                    placement={"top"}
                    overlay={
                        <Tooltip id={`tooltip-${matchId + 'kda'}`}>
                            <div className='playerKp'>You participated in {playerKp} of the action!</div>
                        </Tooltip>}>
                    <div className='playerKda'>{playerKDA(curPlayer)}</div>
                </OverlayTrigger>
                <OverlayTrigger
                    key={matchId + 'gold'}
                    placement={"bottom"}
                    overlay={
                        <Tooltip id={`tooltip-${matchId + 'gold'}`}>
                            <div className='playerGoldPercent'>You had {playerGoldPercent} of all the team's gold.</div>
                        </Tooltip>}>
                    <div className='playerGold'>{playerGold(curPlayer)}g</div>
                </OverlayTrigger>
                </td>
            )
        }

        let topDeets = () => {
            return (
            <tr onClick={onClickHandler} className={curPlayer.win ? 'matchCardWin' : 'matchCardLoss'}>
                <td className='cardChampIcon'>
                    <img src={cardChampIcon(curPlayer)} alt="champIcon"/> 
                </td>
                <td>
                    <div className='matchIdInfo text-muted'>{matchId}</div>
                    <div className='dateInfo'>{matchDate()}</div>
                    <div className='timeInfo'>{matchLength}</div>
                </td>
                {mouseovers()}
                <td>
                    <img className='cardChampPosition' src={cardChampPosition(curPlayer)} alt="position"/>
                </td>
                <td/>
                {playerItems(curPlayer)}
            </tr>
        )}
        let expandedDeets = () => {
            const scoreBoard = (input) => {
                const boardTd = (input) => {
                    return (
                        <>
                        <img className="scoreboardImg" src={cardChampIcon(input)} alt="champPic"/>
                        <td>{input.summonerName}</td>
                        <td>{playerKDA(input)}</td>
                        </>
                    )
                }
                const boardTd2 = (input) => {
                    return (
                        <>
                        <td>{playerKDA(input)}</td>
                        <td>{input.summonerName}</td>
                        <img className="scoreboardImg" src={cardChampIcon(input)} alt="champPic" />
                        </>
                    )
                }
                let board = input.blueTeam.map((value, index) => {
                    return (
                        <tr className="scoreboardExt">
                            {boardTd(value)}
                            <img className="scoreBoardPos" src={cardChampPosition(value)} alt="position" />
                            {boardTd2(input.redTeam[index])}
                        </tr>
                    )
                })
                console.log(board)
                return board
            }

            return (
                <Table className="collapse">
                    {scoreBoard(teams)}
                </Table>
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