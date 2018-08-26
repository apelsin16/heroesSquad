import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../shared/button';

export default class Hero extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        onDeleteHero: PropTypes.func.isRequired,
        onInfoHero: PropTypes.func.isRequired,
        onAddHeroToSquad: PropTypes.func.isRequired,
    }
   
    
    handleDelete = () => this.props.onDeleteHero(this.props.id);

    handleInfo = () => this.props.onInfoHero(this.props.id);

    handleAddHero = () => this.props.onAddHeroToSquad(this.props.id);

    render () {
        const { name } = this.props;
        
        return (
            <div>
                <h3>{name}</h3>
                
                <Button text="Delete" onClick={this.handleDelete} />
                <Button text="Info" onClick={this.handleInfo}/>
                <Button text="Add Hero" onClick={this.handleAddHero}/>
            </div>
        )
    }
}

