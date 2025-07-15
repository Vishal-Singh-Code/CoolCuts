import { useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            await api.logout();
            logout();
            console.log('Logged out successfully');
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;
