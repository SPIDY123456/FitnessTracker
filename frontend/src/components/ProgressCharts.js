import React, { useState, useEffect } from 'react';
import { getUserGoals } from '../api/goalapi';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';

// Register required components
ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement);

const ProgressCharts = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const response = await getUserGoals();
                console.log('Full Response:', response);

                if (response && Array.isArray(response)) {
                    setData(response);
                } else if (response && response.data) {
                    setData(response.data);
                } else {
                    setData([]);
                }

                setLoading(false);
            } catch (error) {
                console.error("Error fetching goals:", error);
                setData([]);
                setLoading(false);
            }
        };

        fetchProgress();
    }, []);

    
    const chartData = {
        labels: Array.isArray(data) ? data.map(goal => goal?.type || 'Unknown') : [],
        datasets: [
            {
                label: 'Progress',
                data: Array.isArray(data) ? data.map(goal => goal?.progress || 0) : [],
                borderColor: '#4A90E2',
                backgroundColor: 'rgba(74, 144, 226, 0.2)',
                pointBackgroundColor: '#4A90E2',
                pointBorderColor: '#fff',
                fill: false,
                tension: 0.4,
            },
            {
                label: 'Target', 
                data: Array.isArray(data) ? data.map(goal => goal?.target || 0) : [], 
                borderColor: '#FF6347', 
                backgroundColor: 'rgba(255, 99, 71, 0.2)',
                pointBackgroundColor: '#FF6347',
                pointBorderColor: '#fff',
                fill: false,
                tension: 0.4,
            },
        ],
    };


    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                text: 'Goal Progress vs Target',
            },
        },  
        scales: {
            x: {
                type: 'category',
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2 className=" text-2xl text-white  text-center font-bold  mt-24 ml-24 mb-8 ">Progress Charts</h2>
            {data.length > 0 ? (
                <Line className ='bg-stone-100 ml-20 'data={chartData} options={chartOptions}  />
            ) : (
                <p>No goals to display.</p>
            )}
        </div>
    );
};

export default ProgressCharts;
