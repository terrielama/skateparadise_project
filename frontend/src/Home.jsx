import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import userIcon from './assets/img/icon/user.svg';
import shoppingIcon from './assets/img/icon/shopping.svg';
import searchIcon from './assets/img/icon/search.svg';
import homePic from './assets/img/img_page_accueil/home_pic22.jpg';
import SignInForm from './SignInForm';

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    setIsUserLoggedIn(!!accessToken);
  }, []);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const handleProfileRedirect = () => {
    isUserLoggedIn ? navigate('/profile') : toggleModal();
  };

  return (
    <div className="home">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          {/* Brand à gauche */}
          <a className="navbar-brand" href="#">
            Skate Paradise
          </a>

          {/* Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation centrale */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Skateboard
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Planche de skate</a></li>
                  <li><a className="dropdown-item" href="#">Roues</a></li>
                  <li><a className="dropdown-item" href="#">Grips</a></li>
                  <li><a className="dropdown-item" href="#">Trucks</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Chaussures</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Accessoires
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Bonnets</a></li>
                  <li><a className="dropdown-item" href="#">Ceintures</a></li>
                </ul>
              </li>
            </ul>
          </div>

          {/* Icônes à droite */}
          <div className="d-flex align-items-center">
            <button className="btn btn-light me-2">
              <img src={searchIcon} alt="Search" className="img-fluid" width="25" />
            </button>
            <button className="btn btn-light me-2">
              <img src={shoppingIcon} alt="Shopping" className="img-fluid" width="25" />
            </button>
            {isUserLoggedIn ? (
              <button className="btn btn-outline-primary" onClick={handleProfileRedirect}>
                Mon compte
              </button>
            ) : (
              <button className="btn btn-light" onClick={toggleModal}>
                <img src={userIcon} alt="User" className="img-fluid" width="25" />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Image Bannière */}
      <div className="text-center my-4">
        <img src={homePic} alt="Bannière Skate Paradise" className="img-fluid rounded" />
      </div>

      {/* Modal Connexion */}
      {isModalOpen && <SignInForm toggleModal={toggleModal} />}
    </div>
  );
}

export default Home;
