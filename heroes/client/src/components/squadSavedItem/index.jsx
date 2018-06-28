import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../shared/button';


export default class SquadSavedItem extends Component {
    static propTypes = {
        onDeleteSavedSquad: PropTypes.func.isRequired,
        
              heroes: PropTypes.arrayOf(
                  PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    name: PropTypes.string.isRequired,                    
                  }).isRequired,
              ).isRequired,
              stats: PropTypes.shape({
                str: PropTypes.number.isRequired,
                int: PropTypes.number.isRequired,
                spd: PropTypes.number.isRequired,
              }).isRequired,
              id: PropTypes.number.isRequired,
        
    }

    handleDeleteSavedSquad = () => this.props.onDeleteSavedSquad(this.props.id);
    render() {
        
    return (
        <div>
            <Button text="Delete Squad" onClick={this.handleDeleteSavedSquad}/>
            {this.props.heroes.map(hero =>
           
            <p key={hero.id}>{hero.name}</p>         
            )}
            {
            <div>
                <p>Strength: {this.props.stats.str}</p>
                <p>Intalligence: {this.props.stats.int}</p>
                <p>Speed: {this.props.stats.spd}</p>
            </div>
            }
        </div>
    )}
}

