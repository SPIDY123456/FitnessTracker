import React from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ActivityLog from "../components/ActivityLog";
import GoalSetting from "../components/GoalSetting";
import ProgressCharts from "../components/ProgressCharts";
import SocialSharing from "../components/SocialSharing";

const Dashboard = () => {
    const navigate = useNavigate();

    const goToProfile = () => {
        navigate("/profile");
    };

    return (
        <div className="flex"> 
            {/* Sidebar */}
            <div className="w-1/6 h-fullscreen -ml-3 -mt-4 bg-stone-800 p-4 mr-2 text-white flex flex-col items-center">
                <button onClick={goToProfile} className="flex flex-col items-center mt-4 hover:text-stone-300">
                    <FaUser className="text-3xl mr-40 mt-36" /> {/* Profile icon */}
                    <span className="text-lg mr-12 -mt-8">Profile</span> {/* Profile label */}
                </button>
            </div>

            {/* Main Content */}
            <div className="container mx-auto p-4 w-4/5">
                <h1 className="text-4xl font-bold text-white ml-24 mb-10">Dashboard</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <ActivityLog />
                    <GoalSetting />
                    <ProgressCharts />
                    <SocialSharing />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
