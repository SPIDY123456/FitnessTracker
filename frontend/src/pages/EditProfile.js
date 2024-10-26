import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
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
                const response = await axios.get(`https://fitnesstracker-2.onrender.com/api/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Extract the date from the ISO format
                const birthday = response.data.birthday ? response.data.birthday.split('T')[0] : '';

                setUser({
                    ...response.data,
                    birthday: birthday // Use only the date part for the input
                });
                setLoading(false);
            } catch (error) {
                setError(error.response ? error.response.data.message : 'Error fetching profile');
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleSave = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('No authorization token found.');
            return;
        }

        const id = "671b971b4e3ffd9b80e512e1";

        try {
            const response = await axios.put(
                `https://fitnesstracker-2.onrender.com/api/users/update/${id}`,
                {
                    name: user.name,
                    gender: user.gender,
                    birthday: user.birthday,
                    height: user.height,
                    weight: user.weight,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Profile updated successfully:", response.data);
            navigate('/profile');
        } catch (error) {
            console.error("Error updating profile:", error);
            alert(error.response ? error.response.data.message : 'Error updating profile');
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
    }

    return (
        <div className="container w-3xl min-h-[48rem] mx-auto p-4">
            <h1 className="text-4xl text-white text-center font-semibold mb-4">Edit Profile</h1>

            <div className='text-center'>
                <label className='block text-white mb-4'>Name</label>
                <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    className="border rounded p-2 w-52 mb-4"
                />
            </div>

    
            <div className="text-center mt-8">
                <label className='block text-white mb-4'>Gender</label>
                <select
                    value={user.gender}
                    onChange={(e) => setUser({ ...user, gender: e.target.value })}
                    className="border rounded p-2 w-52"
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>


            <div className="text-center mt-8">
                <label className='block text-white mb-4'>Birthday</label>
                <input
                    type="date"
                    value={user.birthday}
                    onChange={(e) => setUser({ ...user, birthday: e.target.value })}
                    className="border rounded p-2 w-52"
                />
            </div>

           
            <div className="text-center mt-8">
                <label className='block text-white mb-4'>Height (cm)</label>
                <input
                    type="number"
                    value={user.height}
                    onChange={(e) => setUser({ ...user, height: e.target.value })}
                    className="border rounded p-2 w-52"
                />
            </div>

          
            <div className="text-center mt-8">
                <label className='block text-white mb-4'>Weight (kg)</label>
                <input
                    type="number"
                    value={user.weight}
                    onChange={(e) => setUser({ ...user, weight: e.target.value })}
                    className="border rounded p-2 w-52 mb-12 "
                />
            </div>

            <div className="flex justify-center">
                <button
                    onClick={handleSave}
                    className="absolute top-4 right-4 hover:bg-gray-400 text-white font-semibold py-2 px-4 rounded-full"
                >
                    SAVE
                </button>
                <p className='text-center text-gray-400 text-2xl font-semibold '>{user.email}</p>
            </div>
        </div>
    );
};

export default EditProfile;
