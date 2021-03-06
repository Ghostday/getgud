import React from "react";
import { Table } from "react-bootstrap";
import MatchCard from './MatchCard';
import 'bootstrap/js/src/collapse.js'


export default function Matches({data, user}) {

    const matches = data
    console.log('Matches.jsx | Match Info: ', matches)

    return (
        <Table className='matchHistory'>
            {matches.map((match, key) => {
                return <MatchCard match={match} user={user} key={key}/>
            })}
        </Table>
    )

    

}