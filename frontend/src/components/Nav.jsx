import React from 'react';
import userIcon from '../assets/img/icon/user.svg';
import shoppingIcon from '../assets/img/icon/shopping.svg';
import searchIcon from '../assets/img/icon/search.svg';
// import '../assets/css/style.css';


// Le composant Nav avec un export par défaut
const Nav = ({ toggleModal, isUserLoggedIn, handleProfileRedirect }) => {
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Skate Paradise</a>
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#">Skateboard</a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Planche de skate</a></li>
              <li><a className="dropdown-item" href="#">Roues</a></li>
              <li><a className="dropdown-item" href="#">Grips</a></li>
              <li><a className="dropdown-item" href="#">Trucks</a></li>
            </ul>
          </li>
          <li className="nav-item"><a className="nav-link" href="#">Chaussures</a></li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#">Accessoires</a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Bonnets</a></li>
              <li><a className="dropdown-item" href="#">Ceintures</a></li>
            </ul>
          </li>
        </ul>

        {/* Icônes utilisateur, shopping, recherche */}
        <ul className="navbar-icons">
          <li className="nav-item"><img src={searchIcon} alt="Search" className="icon" /></li>
          <li className="nav-item"><img src={shoppingIcon} alt="Shopping" className="icon" /></li>
          <li className="nav-item">
            {isUserLoggedIn ? (
              <button onClick={handleProfileRedirect}>Mon compte</button>
            ) : (
              <img src={userIcon} alt="User" className="icon" onClick={toggleModal} />
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

// Export par défaut
export default Nav;
