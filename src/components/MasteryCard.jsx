import React from "react";
import { Card } from 'react-bootstrap'


class MasteryCard extends React.Component {




    


    render() {

        console.log(this.props.data)
        let champData = this.props.data

        console.log(champData)

        // let champImg = `../data/img/champion/${champData.image.full}`
        // let champName = champData.name
        // let champTitle = champData.title
        // let champRoles = champData.tags
        
        // const mastery = this.props.data

        // let level = mastery.championLevel
        // let points = mastery.championPoints
        // let chest = mastery.chestGranted

        return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }

}

export default MasteryCard