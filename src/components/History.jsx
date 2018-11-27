import React from 'react';
import PropTypes from 'prop-types';
import RadioButtonTabs from './RadioButtonTabs';
import ChartView from './ChartView';

const History = ({
    selectedCoin,
    onSelectCoin,
    handleAddCoin,
    handleDeleteCoin,
    chosenCoin,
    currency,
    onSelectCurrency,
    options,
    tabs,
    period,
    onChangePeriod,
    labels,
    datasets
}) => (
  <div className="tabPannel">
    <RadioButtonTabs
        value={period}
        tabs={tabs}
        onChange={onChangePeriod}
    />
    <select className="customSelect coinSelect" onChange={onSelectCurrency} value={currency}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="ETH">ETH</option>
    </select>

    <select className="customSelect currencySelect" onChange={onSelectCoin} value={selectedCoin}>
        {options.map((option, id) => <option key={id} value={option}>{option}</option>)}
    </select>
    <button onClick={handleAddCoin}>ADD</button>
    <ul className='list chosenCoins'>
      {chosenCoin.map((el) => (
          <li key={el.id}>
              <span>{el.name}</span>
              <span className="deleteItem" onClick={() => {handleDeleteCoin(el.id)}}>DELETE</span>
          </li>
      ))}
    </ul>
    <ChartView labels={labels} datasets={datasets} />
</div>
)

History.propTypes = {

  };

export default History;