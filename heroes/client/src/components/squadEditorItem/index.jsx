import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../shared/button';

export default class SquadEditorItem extends Component {
    
    static propTypes = {
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        onDeleteHeroFromSquad: PropTypes.func.isRequired,
       
    }
    state = {};
    
    handleDelete = () => this.props.onDeleteHeroFromSquad(this.props.id);

    

    render () {
        const { name } = this.props;
        
        return (
            <div>
                <h3>{name}</h3>
                
                <Button text="Delete" onClick={this.handleDelete} />
                
            </div>
        )
    }
}