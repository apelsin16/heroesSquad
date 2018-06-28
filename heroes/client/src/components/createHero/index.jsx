import React, { Component } from 'react';
import PropTypes from 'prop-types';



const INITIAL_STATE = {
    name: '',
    strength: Number(''),
    intelligence: Number(''),
    speed: Number(''),
}

const arr = [];

for (let i = 0; i < 10; i+1) { 
    arr.push(i);
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
        this.props.onAddHero(this.state.name, Number(this.state.strength) , Number(this.state.intelligence) , Number(this.state.speed) );
        this.setState({ ...INITIAL_STATE});
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
                        {arr.map(item => <option key={item} value={item+1}> {item+1}</option>)}                
                    </select>
                </div>
                <div>
                    <p>intelligence</p>
                    <select name="intelligence" value={intelligence} onChange={this.handleInputChange}>                
                        {arr.map(item => <option key={item} value={item+1}> {item+1}</option>)}                
                    </select>
                </div>
                <div>
                    <p>speed</p>
                    <select name="speed" value={speed} onChange={this.handleInputChange}>                
                        {arr.map(item => <option key={item} value={item+1}> {item+1}</option>)}                
                    </select>
                </div>
                
                
                
                <button>Add Hero</button>
            </form>

        );
    }
}
