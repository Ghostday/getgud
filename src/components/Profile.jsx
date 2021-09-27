import React from "react";
import { Container, Row, Col } from 'react-bootstrap';

export default function Profile(data) {
    console.log('Profiles Data',data)

    const rankedInfo = data.data[0]
    const lvl = data.summ

    const name = rankedInfo.summonerName
    const streak = rankedInfo.hotStreak
    const lp = rankedInfo.leaguePoints
    const rank = rankedInfo.rank
    const tier = rankedInfo.tier

    const wins = rankedInfo.wins
    const losses = rankedInfo.losses
    const winRate = (wins / (wins + losses)) * 100

    const inactive = rankedInfo.inactive



    return (
        <Container id="profile">
            <Row>
                <Col sm={8} style={{textAlign: 'left'}}>
                    <h1>{name}</h1>
                    <h2>{lvl}</h2>

                </Col>
                <Col sm={2} style={{textAlign: 'left'}}>
                    <h5>Queue Type</h5>
                    <h5>Wins</h5>
                    <h5>Losses</h5>
                    <h5>Win Rate</h5>
                </Col>
                <Col sm={1}>
                    <h5>{wins}</h5>
                    <h5>{losses}</h5>
                    <h5>{winRate}%</h5>
                </Col>
                <Col sm={1}>
                    <h5>{wins}</h5>
                    <h5>{losses}</h5>
                    <h5>{winRate}%</h5>
                </Col>
            </Row>
        </Container>
    )




}