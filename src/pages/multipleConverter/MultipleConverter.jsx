import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import ChosenCoin from '../../components/ChosenCoin';
import ChosenCurrency from '../../components/ChosenCurrency';

class MultipleConverterContainer extends Component {

  static propTypes = {
    coinsList: PropTypes.array.isRequired,
  };

  state = {
    selectedCoin: '808',
    chosenCoins: [],

  };

  handleAddItem = () => {  
    const { selectedCoin, chosenCoins } = this.state;

     if (chosenCoins.some(coin => coin.name === selectedCoin)) {
 
        return;
    }
    

    const newItem = {
        id: new Date().getTime(),
        name: selectedCoin,
        value: 1
    }

    this.setState({ chosenCoins: [...chosenCoins, newItem] })
    
  }

  handleDeleteItem = (id) => {
      console.log('ID RECEIVED', id);
      this.setState(({ chosenCoins }) => {
        return {
            chosenCoins: chosenCoins.filter(coin => coin.id !== id)
        }
      })
  }

  handleValueChange = (event) => {
    console.log('EventSelect', event.target.value);
    this.setState({ selectedCoin: event.target.value });
  };

  handleCurrencyAmountChange = (event, id) => {
    const value = Number(event.target.value);

    this.setState(({ chosenCoins }) => {
        return {
            chosenCoins: chosenCoins.map(coin => {
                if (coin.id === id) {
                    coin.value = value;
                }

                return coin;
            })
        }
    });   
  };
  
  getCoinsNames = () => {
    const { coinsList } = this.props;

    return coinsList.map(coin => coin.CoinName)
  };

  
  render () {
    const { selectedCoin, chosenCoins } = this.state;

    return (
        <React.Fragment>

            <ChosenCoin 
                selectedCoin={selectedCoin}
                options={this.getCoinsNames()}
                onSelect={this.handleValueChange}
                handleAddItem={this.handleAddItem}
                chosenCoins={chosenCoins}
                handleDeleteItem={this.handleDeleteItem}
                handleCurrencyAmountChange={this.handleCurrencyAmountChange}
            />
        </React.Fragment>
    )
  }
};

export default MultipleConverterContainer;
