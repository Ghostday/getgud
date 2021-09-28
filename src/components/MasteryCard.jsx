import React from "react";
import { Card, ProgressBar } from 'react-bootstrap'

import masteryRank from './Champion_Mastery_Level_2_Flair.png'
import '../index.css'
class MasteryCard extends React.Component {

    constructor(props) {
        super(props);
    }





    render() {
        const champ = this.props.data

        console.log('After mounting: ', champ)

        const champImg = `${champ[0]}_0.jpg`
        

        const champName = champ[1].name

        const champTitle = champ[1].title

        //  If champ has multiple roles will join them with a seperator for a cleaner look
        const champRoles = champ[1].tags.join(" | ")
        

        const level = champ.championLevel

        const points = champ.championPoints
   
        const chest = champ.chestGranted

        const progress = () => {
            let prog = 0;
            let label = 0;
            switch (level) {
                case 7:
                case 6:
                case 5:
                    prog = 100;
                    label = points;
                    break;
                case 4:
                    prog = (points / 21600) * 100
                    label = `${points} / 21600`
                    console.log('Case 4')
                    break;
                case 3:
                    prog = (points / 12600) * 100
                    label = `${points} / 12600`
                    console.log('Case 3')
                    break;
                case 2:
                    prog = (points / 6000) * 100
                    label = `${points} / 6000`
                    console.log('Case 2')
                    break;
                case 1:
                    prog = (points / 1800) * 100
                    label = `${points} / 1800`
                    console.log('Case 1')
                    break;
                default:
                    break;
            }
            console.log(prog)
            return (
                <div>
                    <img className="masteryRank"  alt="masteryRankImg" src={masteryRank}/>
                    <p className="masteryProg">{label}</p>
                    <ProgressBar>
                        <ProgressBar now={prog}/> 
                    </ProgressBar>
                </div>
            )
        }




        return (
            <Card style={{ width: '18rem', backgroundImage: `url(https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champImg})`}} bg="dark">
                <Card.Header>
                    <h2>{champName}</h2>
                    <h5>{champTitle}</h5>
                </Card.Header>
                <Card.Body>
                    <Card.Title>{champRoles}</Card.Title>
                    <Card.Text>

                    </Card.Text>
                </Card.Body>
                    {progress()}
            </Card>
        )
    }

}

export default MasteryCard