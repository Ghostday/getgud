import React from "react";
import { Container, Row, Col } from 'react-bootstrap';

export default function Profile(data) {
    console.log('Profiles Data',data)

    const rankedInfo = data.data[0]
    const rankedInfo2 = data.data[1]

    const lvl = data.summ;
    const icon = `https://ddragon.leagueoflegends.com/cdn/11.19.1/img/profileicon/${data.icon}.png`

    let queue = rankedInfo.queueType;
    const name = rankedInfo.summonerName;
    const rank = rankedInfo.rank;
    const tier = rankedInfo.tier;

    const wins = rankedInfo.wins;
    const losses = rankedInfo.losses;
    const winRate = (wins / (wins + losses)) * 100;

    let queue2 = rankedInfo2.queueType;
    const rank2 = rankedInfo2.rank;
    const tier2 = rankedInfo2.tier;

    const wins2 = rankedInfo2.wins;
    const losses2 = rankedInfo2.losses;
    const winRate2 = (wins2 / (wins2 + losses2)) * 100;

    if (queue === "RANKED_SOLO_5x5") {
        queue = "Solo/Duo";
        queue2 = "Flex";
    }
    else {
        queue = "Flex";
        queue2 = "Solo/Duo";
    }


    return (
        <Container id="profile">
            <Row>
                <Col sm={2} style={{textAlign: 'left'}}>
                    <img alt="profile" id="profilePic" src={icon} style={{width: '180px', height: '180px'}}/>
                </Col>
                <Col sm={4} style={{textAlign: 'left', padding: '1vh 2vh'}}>
                    <div style={{float: 'left'}}>
                        <h1>{name}</h1>
                        <h2>{lvl}</h2>
                    </div>
                </Col>
                <Col sm={2} style={{textAlign: 'left', paddingTop: '4.3vh'}}>
                    <br />
                    <h5>Wins</h5>
                    <h5>Losses</h5>
                    <h5>Win Rate</h5>
                </Col>
                <Col sm={2} style={{padding: '2vh 2vh'}}>
                    <h5>{queue}</h5>
                    <h5>{tier + ' ' + rank}</h5>
                    <h5 style={{color: 'green'}}>{wins}</h5>
                    <h5 style={{color: 'red'}}>{losses}</h5>
                    <h5>{winRate.toFixed(1)}%</h5>
                </Col>
                <Col sm={2} style={{padding: '2vh 2vh'}}>
                    <h5>{queue2}</h5>
                    <h5>{tier2 + ' ' + rank2}</h5>
                    <h5 style={{color: 'green'}}>{wins2}</h5>
                    <h5 style={{color: 'red'}}>{losses2}</h5>
                    <h5>{winRate2.toFixed(1)}%</h5>
                </Col>
            </Row>
        </Container>
    )




}