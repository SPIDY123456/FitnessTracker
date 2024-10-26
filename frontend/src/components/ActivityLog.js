import React, { useState, useEffect } from 'react';
import { getUserActivities } from '../api/activity';
import Modal from './Modal'; 

const ActivityLog = () => {
    const [activities, setActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const data = await getUserActivities();
                console.log("Fetched activities:", data);
                setActivities(Array.isArray(data) ? data : []); 
            } catch (error) {
                console.error("Error fetching activities:", error);
                setActivities([]); 
            }
        };

        fetchActivities();
    }, []);

    const openModal = (activity) => {
        setSelectedActivity(activity); 
        setIsModalOpen(true); 
    };

    const closeModal = () => {
        setSelectedActivity(null); 
        setIsModalOpen(false); 
    };

    return (
        <div className="flex flex-col items-center ">
            <div className='w-96 rounded-xl shadow-md bg-stone-700'> 
                <h1 className='h-16 text-white  font-bold text-2xl text-center'>Activity Log</h1>
                <div className="space-y-2 p-2"> 
                    {activities.length > 0 ? (
                        activities.map((activity, index) => (
                            <div key={index} onClick={() => openModal(activity)} className="text-gray-300 cursor-pointer font-bold text-center -mt-4 py-2">
                                {activity.type}
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No activities found.</p> 
                    )}
                </div>
            </div>

            {isModalOpen && (
                <Modal activity={selectedActivity} onClose={closeModal} />
            )}
        </div>
    );
};

export default ActivityLog;
