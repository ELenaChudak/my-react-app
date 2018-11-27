import React from 'react';
import PropTypes from 'prop-types';

const SingleConverter = ({ 
    options,
    selected, 
    onSelect, 
    currencyAmount, 
    onChange,
    rates,
    errorMessage 
}) => ( // props { options } options => ['string', ...,]

    <div className='converterHolder'>
    <select className='customSelect' onChange={onSelect} value={selected}>
        {options.map((option, id) => <option key={id} value={option}>{option}</option>)}
    </select>
    <div className='selectedItem row'>
        <span className='currencyLabel'>{selected}</span>{' '}
        <input 
            className='numberInput' 
            min="1" 
            type='number' 
            onChange={onChange} 
            value={currencyAmount}
        />
    </div>
    {Object.keys(rates).map(rate => ( 
        <div className='resultsItem'>
            <span className='currencyLabel'>{rate}</span>
            <span className='converterResult'>{rates[rate] * currencyAmount}</span>
        </div>
    ))}
    {errorMessage}
    </div>
    
)

SingleConverter.propTypes = {
    
  };

export default SingleConverter;