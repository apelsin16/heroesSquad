/* eslint-disable*/
import React from 'react';


const SquadStats = ( onSquadStats ) => 
(

    <div>
        <p> Strength: {onSquadStats.onSquadStats.str}</p>
        <p> Intelligence: {onSquadStats.onSquadStats.int}</p>
        <p> Speed: {onSquadStats.onSquadStats.spd}</p>
    </div>
)


export default SquadStats;