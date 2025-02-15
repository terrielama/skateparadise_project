import React, { useState, useEffect } from 'react'
import './assets/css/style.css'
import userIcon from './assets/img/icon/user.svg'
import shoppingIcon from './assets/img/icon/shopping.svg'
import searchIcon from './assets/img/icon/search.svg'
import homePic from './assets/img/img_page_accueil/home_pic22.jpg'
import SignInForm from './SignInForm'
import { useNavigate } from 'react-router-dom' // Changement ici

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const navigate = useNavigate() // Utilisation de useNavigate

  // Fonction pour ouvrir/fermer le modal
  const toggleModal = () => setIsModalOpen(!isModalOpen)

  // Vérification de l'état de la connexion à chaque chargement de la page
  useEffect(() => {
    // Si un token d'accès est stocké dans le localStorage, l'utilisateur est connecté
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
      setIsUserLoggedIn(true)
    } else {
      setIsUserLoggedIn(false)
    }
  }, [])

  // Fonction pour rediriger vers la page du profil
  const handleProfileRedirect = () => {
    if (isUserLoggedIn) {
      navigate('/profile') // Utilisation de navigate pour rediriger vers la page de profil
    } else {
      toggleModal() // Ouvre le modal de connexion si l'utilisateur n'est pas connecté
    }
  }

  return (
    <div className="home">
      {/* Navbar */}
      <nav className="navbar">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Skate Paradise
          </a>
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown1"
              >
                Skateboard
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Planche de skate
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Roues
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Grips
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Trucks
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Chaussures
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown4"
              >
                Accessoires
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Bonnets
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Ceintures
                  </a>
                </li>
              </ul>
            </li>
          </ul>

          {/* Icônes utilisateur, shopping, recherche */}
          <ul className="navbar-icons">
            <li className="nav-item">
              <img src={searchIcon} alt="Search" className="icon" />
            </li>
            <li className="nav-item">
              <img src={shoppingIcon} alt="Shopping" className="icon" />
            </li>
            <li className="nav-item">
              {isUserLoggedIn ? (
                <span
                  onClick={handleProfileRedirect}
                  style={{ cursor: 'pointer' }}
                >
                  Mon compte
                </span>
              ) : (
                <img
                  src={userIcon}
                  alt="User"
                  className="icon"
                  onClick={toggleModal}
                />
              )}
            </li>
          </ul>
        </div>
      </nav>

      {/* Image Bannière */}
      <div className="home-img">
        <img src={homePic} alt="Bannière Skate Paradise" />
      </div>

      {/* Modal Connexion */}
      {isModalOpen && <SignInForm toggleModal={toggleModal} />}
    </div>
  )
}

export default Home
