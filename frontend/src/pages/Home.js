import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
            <h1 className="text-5xl text-center font-extrabold text-gray-800 mb-12">Welcome to the Fitness Tracker</h1>
            <div className='flex space-x-4'>
                <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition duration-300">Login</Link>
                <Link to="/register" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg transition duration-300">Register</Link>
            </div>
        </div>
    );
};

export default Home;
