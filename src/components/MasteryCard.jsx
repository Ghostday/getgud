import React from "react";
import { Card, ProgressBar } from 'react-bootstrap'

import image from '../data/img/champion/Vayne.png'

class MasteryCard extends React.Component {

    constructor(props) {
        super(props);
    }





    render() {
        const champ = this.props.data

        console.log('After mounting: ', champ)

        const champImg = champ[1].image.full
        const imgSrc = require(`../data/img/champion/${champImg}`)
        

        const champName = champ[1].name
        console.log(champName)

        const champTitle = champ[1].title
        console.log('Title: ', champTitle)

        const champRoles = champ[1].tags
        console.log('Roles: ', champRoles)

        const level = champ.championLevel
        console.log('Level: ', level)

        const points = champ.championPoints
        console.log('Mastery Point: ', points)
        
        const chest = champ.chestGranted
        console.log('Chest Already Given: ', chest)

        const progress = () => {
            let prog = 0;
            switch (level) {
                case 7:
                    prog = 100;
                    break;
                case 6:
                    prog = 100;
                    break;
                case 5:
                    prog = 100;
                    break;
                case 4:
                    prog = (points / 21600) * 100
                    console.log('Case 4: ', prog)
                    break;
                default:
                    break;
            }
            console.log(prog)
            return prog
        }
        console.log(imgSrc)




        return (
            <Card style={{ width: '18rem' }} bg="dark">
                <Card.Header>
                    <h2>{champName}</h2>
                    <h5>{champTitle}</h5>
                </Card.Header>
                <Card.Img variant="top" src={imgSrc} />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    
                    <ProgressBar now={progress()}/>
                </Card.Footer>
            </Card>
        )
    }

}

export default MasteryCard