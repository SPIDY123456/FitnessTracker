import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserGoals } from '../api/goalapi';

const API_URL = `https://fitnesstracker-6.onrender.com`;

const GoalSetting = () => {
    const [goal, setGoal] = useState('');
    const [target, setTarget] = useState('');
    const [notes, setNotes] = useState('');
    const [progress, setProgress] = useState('');

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const data = await getUserGoals();
                console.log("Fetched Goals:", data);
                return Array.isArray(data) ? data : [];
            } catch (error) {
                console.error("Error fetching activities:", error);
                return [];
            }
        };

        fetchGoals();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(`${API_URL}/api/goal/set`,
                {
                    type: goal,
                    target,
                    progress,
                    notes,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);

            // Call the settingGoal function only if the response is successful
            settingGoal();

            // Reset the input fields
            setGoal('');
            setTarget('');
            setNotes('');
            setProgress('');
        } catch (error) {
            console.error("Error setting goal:", error);
        }
    };

    const settingGoal = () => {
        alert('Goal has been set successfully');
    };

    return (
        <div className=" max-w-lg  w-96 h-100 mx-auto bg-stone-800 rounded-lg shadow-md p-6 mr-20 -mt-2 ">
            <h2 className="text-2xl font-bold mb-6 text-white text-center">Set Your Goal</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Goal Type (e.g., Weight Loss)"
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="number"
                        placeholder="Target"
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="number"
                        placeholder="Progress"
                        value={progress}
                        onChange={(e) => setProgress(e.target.value)}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <textarea
                        placeholder="Write your thoughts"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 h-18 resize-none"
                    />
                </div>
                <div className="flex justify-center">
                <button
                    type="submit"
                    className=" bg-stone-600 w-24 text-white font-thin p-3 rounded-full  hover:bg-stone-700 transition-colors"
                    
                >
                    Set Goal
                </button>
                </div>
            </form>
        </div>
    );
};

export default GoalSetting;
