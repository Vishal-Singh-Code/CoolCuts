import React, { useState, useContext } from 'react';
import api from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 
        try {
            const response = await api.login(username, password);
            login(response.data);
            console.log('Logged in successfully:', response.data);
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            setError('Invalid username or password. Please try again.');
        }
    };

    return (
        <div>
            <ul style={{ backgroundColor: '#121212' }} className="flex items-center justify-between bg-gray-800 p-3">
                <li>
                    <button
                        className="text-white text-xl flex items-center"
                        onClick={() => navigate(-1)}
                    >
                      <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="30"
                            height="30"
                            className="fill-current"
                        >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path d="M14.41 7.41L13 6l-6 6 6 6 1.41-1.41L9.83 12z" />
                        </svg>
                    </button>
                </li>
                <li>
                    <Link to="/" className="text-white text-xl flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24"  fill="white">
                            <path d="M 12 2 A 1 1 0 0 0 11.289062 2.296875 L 1.203125 11.097656 A 0.5 0.5 0 0 0 1 11.5 A 0.5 0.5 0 0 0 1.5 12 L 4 12 L 4 20 C 4 20.552 4.448 21 5 21 L 9 21 C 9.552 21 10 20.552 10 20 L 10 14 L 14 14 L 14 20 C 14 20.552 14.448 21 15 21 L 19 21 C 19.552 21 20 20.552 20 20 L 20 12 L 22.5 12 A 0.5 0.5 0 0 0 23 11.5 A 0.5 0.5 0 0 0 22.796875 11.097656 L 12.716797 2.3027344 A 1 1 0 0 0 12.710938 2.296875 A 1 1 0 0 0 12 2 z"></path>
                        </svg>
                    
                    </Link>
                </li>
            </ul>
            <div className="flex pl-2 pr-2 pt-3 pb-3 justify-center bg-gray-100">
                <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                    <div className="text-center mb-6">
                        <img
                            className="mx-auto h-12 w-auto mb-4 "
                            src="/static/images/logo.svg"
                            alt="Your Barbershop"
                        />
                        <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back!</h2>
                        <p className="text-gray-600 mt-2">Sign in to your account to continue.</p>
                    </div>

                    {error && (
                        <div className="mb-4 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter Username"
                                autoComplete="username"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter Password"
                                autoComplete="current-password"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 bg-teal-600 text-white font-semibold rounded-md shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                Login
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account? 
                            <Link to="/signup" className="font-semibold text-teal-600 hover:text-teal-700"> Sign up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
