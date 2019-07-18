import React from 'react';
import { NavLink } from 'react-router-dom'

class NavBar extends React.Component {
  render() {
    return (
      <section id="nav">
        <nav id="nav-wrap">
            <ul className="nav" id="nav">
              <li>
                <NavLink exact={true} to="/" activeStyle={{color:'orange'}}>Game</NavLink>
              </li>
              <li>
                <NavLink to="/sign-in" activeStyle={{color:'orange'}}>Watchlist</NavLink>
              </li>
              <li>
                <NavLink to="/sing-up" activeStyle={{color:'orange'}}>Top Movers</NavLink>
              </li>
              <li>
                <NavLink to="/sig-up" activeStyle={{color:'orange'}}>Recent News</NavLink>
              </li>
            </ul>
        </nav>
      </section>
    );
  }
}

export default NavBar;