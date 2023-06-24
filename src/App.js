import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Homepage from './components/Homepage';
import PlanetDetails from './components/PlanetDetails';

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>

        <Route path='/planet/:planetId' exact={true}>
          <PlanetDetails />
        </Route>

        <Route path='/'>
          <Homepage />
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
