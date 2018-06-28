import React from 'react';
import PropTypes from 'prop-types';




const MainTitle = props => (
    <h1>{props.text}</h1>
)

MainTitle.propTypes = {
    text: PropTypes.string.isRequired,
}

export default MainTitle;