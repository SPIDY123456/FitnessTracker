
import React from 'react';

const Modal = ({ activity, onClose }) => {
    if (!activity) return null;

    const formattedDate = new Date(activity.createdAt).toLocaleString(); 

    return (
        <div className="absolute  flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded shadow-lg">
                <h2 className="text-lg font-bold text-center mb-4">{activity.type} Details</h2>
                <p className='mb-2'><strong>Distance:</strong> {activity.distance} Km</p>
                <p className='mb-2'><strong>Duration:</strong> {activity.duration} ms</p>
                <p className='mb-2'><strong>Calories Burned:</strong> {activity.caloriesBurned}</p>
                <p className='mb-2'><strong>Notes:</strong> {activity.notes}</p>
                <p className='mb-8'><strong>Created At:</strong> {formattedDate}</p>
                <div className = "flex justify-center">
                    <button className="mt-4 bg-red-500 w-20  hover:bg-red-600 text-white p-2 rounded " onClick={onClose}>Close</button>
                </div>  
            </div>
            <div className="absolute  inset-0 cursor-pointer " onClick={onClose}></div>
        </div>
    );
};
export default Modal;
