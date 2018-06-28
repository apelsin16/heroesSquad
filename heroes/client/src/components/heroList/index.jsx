import React from 'react';
import PropTypes from 'prop-types';
import Hero from '../hero';



const HeroList = ({ heroes, ...props }) => (
    <ul>
        {heroes.map(item =>
             <li key={item.id}>
                <Hero {...item}{ ...props}/>                
             </li>)}
    </ul>
)

HeroList.propTypes = {
    heroes: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
        }).isRequired,
    ).isRequired,
}



export default HeroList;