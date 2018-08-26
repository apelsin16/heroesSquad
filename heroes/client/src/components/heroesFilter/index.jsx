/* eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';

const HeroesFilter = ({ filter, onHandleFilterChange }) => (
            
                <input type="text"
                value={filter}
                onChange= {e =>  onHandleFilterChange(e.target.value)}
                placeholder="Filter ..."
                />
            
        );


HeroesFilter.propTypes = {
    filter: PropTypes.string.isRequired,
    onHandleFilterChange: PropTypes.func.isRequired,
}

export default HeroesFilter; 
