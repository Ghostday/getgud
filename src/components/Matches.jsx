import React from "react";
import Fetches from '../Fetches';
import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import MatchInfo from './MatchInfo';


export default function Matches({data, user}) {

    const matches = data



    const curUser = user
    console.log('Matches.jsx | User: ', curUser)
    console.log('Matches.jsx | Match Info: ', matches)


    





    return (
        <div>
            <h2>Fetching</h2>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td colSpan="2">Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )

    

}