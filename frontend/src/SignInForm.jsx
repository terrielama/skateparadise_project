import React, { useState } from 'react'
import './assets/css/style.css'
import axios from 'axios'

function SignInForm({ toggleModal }) {
  const [isLoginForm, setIsLoginForm] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState('')

  // Fonction pour l'inscription
  const handleSignUp = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('/api/signup/', {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      })
      console.log('User created successfully', response)
      // Optionnel : Rediriger ou afficher un message de succès
    } catch (err) {
      console.error('Error during signup', err)
      setError('Erreur lors de l\'inscription')
    }
  }

  // Fonction pour la connexion
  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('/api/login/', {
        email,
        password,
      })
      console.log('Login successful', response)
      // Optionnel : Stocker le token JWT ou rediriger vers une autre page
    } catch (err) {
      console.error('Error during login', err)
      setError('Identifiants invalides')
    }
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-btn" onClick={toggleModal}>
          X
        </button>

        {isLoginForm ? (
          <div>
            <h2>Connexion</h2>
            <form className="form-grid" onSubmit={handleLogin}>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Mot de passe</label>
                <input
                  type="password"
                  placeholder="Votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Se connecter</button>
            <button onClick={() => setIsLoginForm(false)}>
              Pas de compte ? Inscrivez-vous
            </button>
          </div>
        ) : (
          <div>
            <h2>Inscription</h2>
            <form className="form-grid" onSubmit={handleSignUp}>
              <div>
                <label>Nom</label>
                <input
                  type="text"
                  placeholder="Votre nom"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Prénom</label>
                <input
                  type="text"
                  placeholder="Votre prénom"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Mot de passe</label>
                <input
                  type="password"
                  placeholder="Votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">S'inscrire</button>
            <button onClick={() => setIsLoginForm(true)}>
              Vous avez déjà un compte ? Connexion
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SignInForm
