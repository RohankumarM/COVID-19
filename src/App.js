import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Tracker from './Components/Tracker';
import Vaccine from './Components/Vaccine';
import Home from './Components/Home';
import Nav from './Nav';
import News from './News';
import coronavirusImage from './images/image.png';
import './styles/App.css';

function App() {

  return (
    <Router>
      <div className="app">
      <img className="header__img" src={coronavirusImage} alt="COVID-19" />
        <Nav />
        <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/news" component={News} />
        <Route path="/tracker" component={Tracker} />
        <Route path="/vaccine" component={Vaccine} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
