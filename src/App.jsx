import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import Landing from './pages/landing/Landing';
import Coins from './pages/coins/Coins';
import Converter from './pages/converter/Converter';
import MultipleConverter from './pages/multipleConverter/MultipleConverter';
import HistoryContainer from './pages/history/HistoryContainer';
import News from './pages/news/News';
import TopExchanges from './pages/topExchanges/TopExchanges';
import ForOFor from './pages/404';
import CoinCard from './components/CoinCard';
import './App.css';

class App extends Component {
  state = {
    coinsList: [],
  };

  filterListById = (list, id) => (
    list.find(coin => coin.Id === id)
  );

  componentDidMount() {
    fetch('https://min-api.cryptocompare.com/data/all/coinlist')
      .then(responce => responce.json())
      .then(responce => this.setState({ coinsList: Object.keys(responce.Data).slice(0, 10).map(key => responce.Data[key]) }))
      .catch(err => alert(err));
  }

  render() {
    const { coinsList } = this.state;

    return (
      <BrowserRouter>
        <div className="App">
          <ul>
            <li>
              <NavLink to="/" activeClassName="active" exact>Landing</NavLink>
            </li>
            <li>
              <NavLink to="/coins" activeClassName="active">Coins</NavLink>
            </li>
            <li>
              <NavLink to="/converter" activeClassName="active">Converter</NavLink>
            </li>
            <li>
              <NavLink to="/history" activeClassName="active">History</NavLink>
            </li>
            <li>
              <NavLink to="/news" activeClassName="active">News</NavLink>
            </li>
            <li>
              <NavLink to="/top-exchanges" activeClassName="active">TopExchanges</NavLink>
            </li>
            <li>
              <NavLink to="/multiple-converter" activeClassName="active">Multiple Converter</NavLink>
            </li>            
          </ul>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/coins" render={() => <Coins coinsList={coinsList} />} />
            <Route
              path="/coins/:id"
              component={props => (
                <CoinCard {...props} coin={this.filterListById(coinsList, props.match.params.id)} />
              )}
            />
            <Route path="/converter" render={() => <Converter coinsList={coinsList} />} />
            <Route path="/multiple-converter" render={() => <MultipleConverter coinsList={coinsList} />} />
            <Route path="/history" render={() => <HistoryContainer coinsList={coinsList} />} />
            <Route path="/news" component={News} />
            <Route path="/top-exchanges" component={TopExchanges} />
            <Route component={ForOFor} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
