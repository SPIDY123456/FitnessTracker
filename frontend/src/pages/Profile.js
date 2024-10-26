import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiEdit, FiLogOut } from 'react-icons/fi';

const API_URL = 'https://fitnesstracker-2.onrender.com';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No authorization token found');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${API_URL}/api/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.response ? error.response.data.message : 'Error fetching profile');
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
    }

    const handleEditProfile = () => {
        navigate('/edit-profile'); // Navigate to the edit profile page
    };

    const handleSignOut = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleHome = () => {
        navigate('/dashboard');
    }

    return (
        <div className="max-w-screen-lg mx-auto p-4">
            <div className="bg-white min-h-[48rem] shadow-xl rounded-xl p-12">
                <h1 className="absolute text-3xl text-black  font-semibold mt-40 ml-96  text-center ">{user.name}</h1>
                <h2 className="text-xl text-gray-500 font-semibold mb-4 text-center">{user.passion}</h2>

                {user.profilePicture && (
                    <img
                        src={user.profilePicture}
                        alt={`${user.name}'s profile`}
                        className="w-24 h-24 rounded-full border-2 border-gray-300 mb-28 mx-auto "
                    />
                )}

                <div className="mt-8 p-4 border-t border-gray-200">
                    <h3 className="text-2xl text-gray-700 font-bold mb-12 flex items-center space-x-2 ">
                        <span>Settings</span>
                    </h3>

                    <div className="mt-4">
                        <ul className="space-y-2">
                            <li className="flex justify-between items-center cursor-pointer" onClick={handleEditProfile}>
                                <div className="flex items-center">
                                    <FiEdit className="mr-2" /> {/* Add margin for spacing */}
                                    <span className="text-gray-700">Edit Profile</span>
                                </div>
                                <span className="text-gray-400">&gt;</span>
                            </li>
                            <hr className="border-gray-200" />
                            <li className="flex justify-between items-center cursor-pointer" onClick={handleSignOut}>
                                <div className="flex items-center">
                                    <FiLogOut className="mr-2" /> {/* Add margin for spacing */}
                                    <span className="text-gray-700">Log Out</span>
                                </div>
                                <span className="text-gray-400">&gt;</span>
                            </li>
                        </ul>
                        <div className='flex justify-center mt-40'>
                    <button
                        onClick={handleHome}
                        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded  hover:bg-blue-600 transition duration-200 flex items-center space-x-2"
                    >
                        <span>Dashboard</span>
                    </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
