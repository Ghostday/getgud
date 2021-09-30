import React from "react";
import { Card, ProgressBar } from 'react-bootstrap'
import masteryRank1 from './masteryImg/Champion_Mastery_Level_1_Flair.png'
import masteryRank2 from './masteryImg/Champion_Mastery_Level_2_Flair.png'
import masteryRank3 from './masteryImg/Champion_Mastery_Level_3_Flair.png'
import masteryRank4 from './masteryImg/Champion_Mastery_Level_4_Flair.png'
import masteryRank5 from './masteryImg/Champion_Mastery_Level_5_Flair.png'
import masteryRank6 from './masteryImg/Champion_Mastery_Level_6_Flair.png'
import masteryRank7 from './masteryImg/Champion_Mastery_Level_7_Flair.png'
import image from '../data/img/champion/Aatrox.png'
import '../App.css'
class MasteryCard extends React.Component {

    constructor(props) {
        super(props);
    }





    render() {
        const champ = this.props.data

        const champImg = `${champ[0]}_0.jpg`

        const level = champ.championLevel

        
        let masteryIcon;

        const champName = champ[1].name

        const champTitle = champ[1].title

        //  If champ has multiple roles will join them with a seperator for a cleaner look
        const champRoles = champ[1].tags.join(" | ")


        const points = champ.championPoints
   
        const chest = () => {
            if (champ.chestGranted) {
                return 'greenBorder';
            }
            else {
                return 'redBorder';
            }
        }
        const progress = () => {
            let prog = 0;
            let label = 0;
            switch (level) {
                case 7:
                    prog = 100;
                    label = points;
                    masteryIcon = masteryRank7
                    break;
                case 6:
                    prog = 100;
                    label = points;
                    masteryIcon = masteryRank6
                    break;
                case 5:
                    prog = 100;
                    label = points;
                    masteryIcon = masteryRank5
                    break;
                case 4:
                    prog = (points / 21600) * 100
                    label = `${points} / 21600`
                    masteryIcon = masteryRank4
                    break;
                case 3:
                    prog = (points / 12600) * 100
                    label = `${points} / 12600`
                    masteryIcon = masteryRank3
                    break;
                case 2:
                    prog = (points / 6000) * 100
                    label = `${points} / 6000`
                    masteryIcon = masteryRank2
                    break;
                case 1:
                    prog = (points / 1800) * 100
                    label = `${points} / 1800`
                    masteryIcon = masteryRank1
                    break;
                default:
                    break;
            }
            return (
                <div>
                    <img className="masteryRank"  alt="masteryRankImg" src={masteryIcon}/>
                    <p className="masteryProg">{label}</p>
                    <ProgressBar>
                        <ProgressBar now={prog}/> 
                    </ProgressBar>
                </div>
            )
        }

        return (    
            <Card className={chest()} style={{ width: '18rem', backgroundImage: `url(https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champImg}`}} bg="dark">
                <Card.Header className="mastery-header">
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