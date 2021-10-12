import React from "react";
import { Table } from "react-bootstrap";
import MatchCard from './MatchCard';
import 'bootstrap/js/src/collapse.js'


export default function Matches({data, user}) {

    const matches = data
    console.log('Matches.jsx | Match Info: ', matches)


    




    return (
        <Table className='matchHistory'>
            <MatchCard match={matches[0]} user={user}/>
            <MatchCard match={matches[1]} user={user}/>
        </Table>
    )

    

}