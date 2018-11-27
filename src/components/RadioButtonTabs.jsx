import React from 'react';
import PropTypes from 'prop-types';

const RadioButtonTabs = ({
    value,
    onChange,
    tabs
}) => (
    <div className="radioBtnGroup">
        {tabs.map(([name, key]) => (
            <div className="radioBtnElement" key={key}>
                <label htmlFor={`#${key}`}>{name}</label>
                <input id={key} type="radio" name="group" onChange={onChange} value={key} checked={key === value}/>
            </div>
        ))}        
    </div>
)

RadioButtonTabs.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default RadioButtonTabs;