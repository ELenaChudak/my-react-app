import React, { Component } from 'react';


const options = ["USD", "EUR", "ETH"];

class Select extends Component {
    constructor(props) {
        super(props);

        this.state = { value: 'Select an Option'};
    }
    onChange(e) {
        this.setState({
            value: e.target.value
        })
    }
    render() {
        return (
            <div className="form-group">
                <select value={this.state.value} onChange={this.onChange.bind(this)} className="form-control">
                    {options.map(option => {
                        return <option value={option} key={option} >{option}</option>
                    })}
                </select>
            </div>

        )
    }
}

export default Select;