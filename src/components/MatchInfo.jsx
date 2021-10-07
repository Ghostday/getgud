import React from "react";



export default function MatchHistory({match, key}) {

    console.log(match)

    return (
        <tr>
            <td>{key}</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
        </tr>
    )

}