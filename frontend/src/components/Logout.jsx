import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import de useNavigate

const Logout = () => {
    const navigate = useNavigate();  // Utilisation de useNavigate

    const handleLogout = () => {
        // Supprimer le token JWT du localStorage
        localStorage.removeItem('access_token');
        
        // Rediriger l'utilisateur vers la page de connexion
        navigate('/');
    };

    return (
        <div>
            <button onClick={handleLogout}>Se déconnecter</button>
        </div>
    );
};

export default Logout;
