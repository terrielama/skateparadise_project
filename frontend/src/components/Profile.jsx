import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from './Nav';
import '../assets/css/style.css'; 

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        console.log("Token récupéré :", token); // Debug
    
        if (!token) {
            setError("Aucun token trouvé. Veuillez vous connecter.");
            setLoading(false);
            return;
        }
    
        axios.get("http://localhost:8000/api/profile/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => {
            setUser(response.data);
            setLoading(false);
        })
        .catch(err => {
            console.error("Erreur API :", err.response);
            setError("Erreur de chargement des données");
            setLoading(false);
        });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        navigate('/');  
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="profile-container">
            <NavBar />
            <div className="profile-card">
                <h1>Profil de {user.last_name} {user.first_name} </h1>
                <div className="profile-info">
                    <p>Email: {user.email}</p>
                    <p>Nom: {user.last_name}</p>
                    <p>Prenom: {user.first_name}</p>
                </div>
                <button className="logout-button" onClick={handleLogout}>Se déconnecter</button>
            </div>
        </div>
    );
};

export default Profile;
