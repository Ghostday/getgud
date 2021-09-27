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
    const inactive = rankedInfo.inactive



    return (
        <Container id="profile">
            <Row>
                <Col sm={8}>
                    <h1>{name}</h1>
                </Col>
                <Col sm={4}>
                    <h2>{lvl}</h2>
                </Col>
            </Row>
        </Container>
    )




}