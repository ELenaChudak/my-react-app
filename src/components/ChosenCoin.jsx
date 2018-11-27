import React from 'react';
import PropTypes from 'prop-types';

const ChosenCoin = ({ 
    options,
    selectedCoin,
    onSelect, 
    handleAddItem,
    handleDeleteItem,
    handleCurrencyAmountChange,
    chosenCoins
}) => ( // props { options } options => ['string', ...,]

    <div className='multipleConverterHolder'>
        <select className='customSelect' onChange={onSelect} value={selectedCoin}>
            {options.map((option, id) => <option key={id} value={option}>{option}</option>)}
        </select>
        <button onClick={handleAddItem}>ADD</button>
        <ul className='list chosenCoins'>
            {chosenCoins.map((el) => (
                <li key={el.id}>
                    <span>{el.name}</span>
                    <span className="deleteItem" onClick={() => {handleDeleteItem(el.id)}}>DELETE</span>
                </li>
            ))}
        </ul>
        <ul className='list resultschosenCoins'>
            {chosenCoins.map((el) => (
                <li key={el.id}>
                    <span className="currencyLabel">{el.name}</span>
                    <input 
                        className='numberInput' 
                        min="1" 
                        type='number' 
                        onChange={(event) => {handleCurrencyAmountChange(event, el.id)}} 
                        value={el.value}
                    />
                </li>
            ))}
        </ul>        
    </div>
    
)

ChosenCoin.propTypes = {
    
  };

export default ChosenCoin;