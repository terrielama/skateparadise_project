import React, { useState } from 'react';
import './assets/css/style.css';
import axios from 'axios';

function SignInForm({ toggleModal }) {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');  // État pour le message de succès

  // Fonction pour l'inscription
  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validation côté client
    if (!email || !password || !firstName || !lastName) {
        setError('Tous les champs sont requis.');
        return;
    }

    try {
        const response = await axios.post('http://127.0.0.1:8000/api/signup/', {
            email,
            password,
            first_name: firstName,
            last_name: lastName,
        });
        console.log('User created successfully', response);
        setSuccessMessage('Inscription réussie !'); // Message de succès
        setError(''); // Réinitialiser les erreurs
    } catch (err) {
        console.error('Error during signup', err);
        setError('Erreur lors de l\'inscription');
        setSuccessMessage(''); // Réinitialiser le message de succès en cas d'erreur
    }
  };

  // Fonction pour la connexion
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        email,
        password,
      });

      console.log('Connexion réussie', response);

      // Récupérer les tokens
      const { access_token, refresh_token } = response.data;

      // Stocker les tokens dans le localStorage
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      setSuccessMessage('Connexion réussie !'); // Message de succès
      setError(''); // Réinitialiser les erreurs

      // Rediriger l'utilisateur vers une autre page (par exemple la page d'accueil)
      window.location.href = '/';  // Exemple : redirige vers la page d'accueil

    } catch (err) {
      console.error('Erreur lors de la connexion', err);
      // Affichage d'un message d'erreur plus détaillé
      if (err.response && err.response.data) {
        setError(err.response.data.error || 'Identifiants invalides');
      } else {
        setError('Une erreur est survenue lors de la connexion');
      }
      setSuccessMessage(''); // Réinitialiser le message de succès en cas d'erreur
    }
  };

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
              <div>
                
              </div>
            </form>
            <button type="submit">Se connecter</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} {/* Afficher le message de succès */}
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
              <div>
                
              </div>
            </form>
            <button type="submit">S'inscrire</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} {/* Afficher le message de succès */}
            <button onClick={() => setIsLoginForm(true)}>
              Vous avez déjà un compte ? Connexion
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SignInForm;
