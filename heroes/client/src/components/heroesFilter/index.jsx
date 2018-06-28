import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class HeroesFilter extends Component {
    static propTypes = {
        filter: PropTypes.string.isRequired,
        onHandleFilterChange: PropTypes.func.isRequired,
    }
    state = {};
    
    handleChange = e => {
        this.props.onHandleFilterChange(e.target.value);
      };
    

    render () {
        const { filter } = this.props;

        return (
            <form>
                <input type="text"
                value={filter}
                onChange={this.handleChange}
                placeholder="Filter ..."
                />
            </form>
        )
    }
}
