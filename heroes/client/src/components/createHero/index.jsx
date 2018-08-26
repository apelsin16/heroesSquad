import React, { Component } from 'react';
import PropTypes from 'prop-types';



const INITIAL_STATE = {
    name: '',
    strength:'',
    intelligence: '',
    speed: '',
}

const makeOptions = num => {
    const elements = [];

    for (let i = 0; i <= num; i += 1) { 
    elements.push(
        <option key={i} value={i}>
            {i}
        </option>
    );
}
return elements;
}

export default class CreateHero extends Component {
    static propTypes = {
        onAddHero: PropTypes.func.isRequired,
    }
    state = { ...INITIAL_STATE};

    handleInputChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            [name]: value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.name === '') { return; }

        const { name, strength, intelligence, speed } = this.state;    

        this.props.onAddHero({
            name, 
            strength: Number(strength), 
            intelligence: Number(intelligence), 
            speed: Number(speed)
        });
        this.setState({ ...INITIAL_STATE });
    }

    render() {
        const { name, strength, intelligence, speed  } = this.state;
       
        return(
            <form onSubmit={this.handleSubmit}>
                <input
                type="text"
                name="name"
                value={name}
                placeholder="Hero name"
                onChange={this.handleInputChange}/>
                
                <div>
                    <p>strength</p>
                    <select name="strength" value={strength} onChange={this.handleInputChange}>                
                        {makeOptions(10)}                
                    </select>
                </div>
                <div>
                    <p>intelligence</p>
                    <select name="intelligence" value={intelligence} onChange={this.handleInputChange}>                
                        {makeOptions(10)}                
                    </select>
                </div>
                <div>
                    <p>speed</p>
                    <select name="speed" value={speed} onChange={this.handleInputChange}>                
                        {makeOptions(10)}                
                    </select>
                </div>
                
                
                
                <button>Add Hero</button>
            </form>

        );
    }
}
