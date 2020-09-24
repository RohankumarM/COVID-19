import React from 'react';
import './styles/Nav.css';
import { Link } from 'react-router-dom';

function Nav() {

  return (
    <div className="nav-container">
      <nav className="nav__bar">
        <ul className="nav__links">
        <Link className="nav__links__element" to="/"> 
            <li className="nav__links__names">HOME</li>
          </Link>
          <Link className="nav__links__element" to="/news"> 
            <li>NEWS</li>
          </Link>
          <Link className="nav__links__element" to="/tracker"> 
            <li>TRACKER</li>
          </Link>
          <Link className="nav__links__element" to="vaccine">
            <li>VACCINE</li>
          </Link>
          
        </ul>
      </nav>

    </div>
  )
}

export default Nav
