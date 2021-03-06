import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Game from './Components/Game';
import Movers from './Components/Movers';
import News from './Components/News';
import Watchlist from './Components/Watchlist';
// import Signup from './Components/Signup';
//      <Route exact path='/signup' component={Signup}></Route>

const Main = () => {
  return (
    <Switch>
      <Route exact path='/' component={Game}></Route>
      <Route path='/movers' component={Movers}></Route>
      <Route path='/news' component={News}></Route>
      <Route path='/watchlist' component={Watchlist}></Route>
    </Switch>
  );
}

export default Main;