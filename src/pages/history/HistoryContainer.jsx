import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

import History from '../../components/History';
import { CryptocompareResponseAdapter } from '../../services/CryptocompareResponseAdapter'

class HistoryContainer extends Component {

  static propTypes = {
    coinsList: PropTypes.array.isRequired,
  };

  state = {
    period: 'histoday',
    selectedCoin: '808',
    chosenCoin: [],
    currency: 'USD',
    coinsData: [],
    labels: [],
    datasets: []
  };

  constructor() {
    super();

    this.tabs = {
      histohour: 'daily',
      histoday: 'hourly',
      histominute: 'minute',
    }
  }


  componentDidMount() {
      this.fetchDataHistory();
      this.adapter = new CryptocompareResponseAdapter();
  }

  componentDidUpdate(prevProps, prevState) {
      const { selectedCoin, period, currency } = this.state

      if (
          prevState.selectedCoin !== selectedCoin ||
          prevState.period !== period || prevState.currency !== currency
      ) {
          this.fetchDataHistory();
      }
  }

  handlePeriodChange = (event) => {
      console.log('handlePeriodChange')
      this.setState({ period: event.target.value });
  };

  handleCoinChange = (event) => {
      this.setState({ selectedCoin: event.target.value });
  };

  handleAddCoin = () => {
      const { selectedCoin, chosenCoin } = this.state;

      if (chosenCoin.some(coin => coin.name === selectedCoin)) {

          return;
      }


      const newItem = {
          id: new Date().getTime(),
          name: selectedCoin,
          value: 1
      }

      this.setState({ chosenCoin: [...chosenCoin, newItem] })

  }

  handleDeleteCoin = (id) => {
      this.setState(({ chosenCoin }) => {
          return {
              chosenCoin: chosenCoin.filter(coin => coin.id !== id)
          }
      })
  }

  handleCurrencyChange = (event) => {
    this.setState({ currency: event.target.value });
  };

  getCoinsNames = () => {
    const { coinsList } = this.props;

    return coinsList.map(coin => coin.CoinName)
  };

  fetchDataHistory() {
      const { selectedCoin, period, currency } = this.state;
      const url = `https://min-api.cryptocompare.com/data/${period}?fsym=${selectedCoin}&tsym=${currency}&limit=9`;

      fetch(url)
          .then(responce => responce.json())
          .then((responseData) => {
            try {
              const chartAdaptedData = this.adapter.adapt(responseData)
              const data = this.prepareDataForChart(chartAdaptedData)

              this.setState({...data})
            } catch (error) {
              alert('This coin not found');
            }
          });
  }

  prepareDataForChart = (data) => {
    const { selectedCoin, period, currency } = this.state
    const { labels, datasets } = data

    return {
      labels,
      datasets: datasets.map(set => ({
        ...set,
        label: `${selectedCoin} to ${currency} by ${this.tabs[period]}`
      })),
    }
  }

  getTabsForView = () => {
    return Object.entries(this.tabs).map(([radioBtnValue, label]) => [label, radioBtnValue])
  }

  render () {
    const {
      period,
      selectedCoin,
      chosenCoin,
      currency,
      labels,
      datasets
    } = this.state;

    return (
        <History
          period={period}
          selectedCoin={selectedCoin}
          currency={currency}
          onSelectCoin={this.handleCoinChange}
          handleAddCoin={this.handleAddCoin}
          chosenCoin={chosenCoin}
          handleDeleteCoin={this.handleDeleteCoin}
          onSelectCurrency={this.handleCurrencyChange}
          options={this.getCoinsNames()}
          onChangePeriod={this.handlePeriodChange}
          tabs={this.getTabsForView()}
          value={period}
          labels={labels}
          datasets={datasets}
        />
    )
  }
}

export default HistoryContainer;
