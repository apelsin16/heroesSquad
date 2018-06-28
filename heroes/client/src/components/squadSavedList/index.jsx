import React from 'react';

import PropTypes from 'prop-types';
import SquadSavedItem from '../squadSavedItem';




const SquadSavedList = ({ squad, ...props }) => (
    <div>
        <ul>
        {squad.map( item => 
        
        <li key={item.id}>
            <SquadSavedItem {...item}{...props} />
        </li>
        )}
            
       </ul>
        
    </div>
)

SquadSavedList.propTypes = {
    squad: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
        }).isRequired,
    ).isRequired,
}

export default SquadSavedList;