import React from 'react';

import PropTypes from 'prop-types';
import SquadEditorItem from '../squadEditorItem';
import Button from '../shared/button';



const SquadEditorList = ({ heroForSquad,  ...props }) => (
    <div>
        <Button text="Save Squad" onClick={props.onSaveSquad}/>
        <Button text="Reset Squad" onClick={props.onResetSquad}/>
      
    <ul>
        
        {heroForSquad.map(item =>
             <li key={item.id}>
                <SquadEditorItem {...item}{ ...props}/>                
             </li>)}
    </ul>

    </div>
)

SquadEditorList.propTypes = {
    onSaveSquad: PropTypes.func.isRequired,
    onResetSquad: PropTypes.func.isRequired,
    heroForSquad: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
        }).isRequired,
    ).isRequired,
}

export default SquadEditorList;