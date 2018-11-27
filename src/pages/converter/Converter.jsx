import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import SingleConverter from '../../components/SingleConverter';

class Converter extends Component {

  static propTypes = {
    coinsList: PropTypes.array.isRequired,
  };

  state = {
    selected: '808',
    currencyAmount: 1,
    rates: {},
    errorMessage: null,
  };

  handleValueChange = (event) => {
    console.log('EventSelect', event.target.value);
    this.setState({ selected: event.target.value });
  };

  handleCurrencyAmountChange = (event) => {
    console.log('EventNumber', event.target.value);
    this.setState({ currencyAmount: event.target.value });
  };
  
  getCoinsNames = () => {
    const { coinsList } = this.props;

    return coinsList.map(coin => coin.CoinName)
  };

  componentDidMount() {
    this.fetchRate();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selected !== prevState.selected) {
      this.fetchRate();
    }
  }

  fetchRate() {
    const { selected } = this.state;

    fetch(`https://min-api.cryptocompare.com/data/price?fsym=${selected}&tsyms=USD,JPY,EUR`)
      .then(responce => responce.json())
      .then(data => {
        if (data.Response === 'Error') {
          this.setState({ rates: {}, errorMessage: data.Message})

          return;
        }

        this.setState({ rates: data, errorMessage: null })
      })
      .catch(err => alert(err));
  }

  render () {
    const { selected, currencyAmount, rates, errorMessage } = this.state;

    return (
        <SingleConverter 
          selected={selected} 
          options={this.getCoinsNames()} 
          currencyAmount={currencyAmount}
          onSelect={this.handleValueChange}
          onChange={this.handleCurrencyAmountChange}
          rates={rates}
          errorMessage={errorMessage}
        />
    )
  }
};

export default Converter;
