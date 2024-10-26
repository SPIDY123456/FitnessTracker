import axios from "axios";

const API_URL = `http://localhost:4000/api/activity`;

const getToken = () => localStorage.getItem('token');

export const getUserActivities = async()=> {
    try{
    const token = getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(`${API_URL}/`,config);
    console.log(response);
    return response.data;
}
catch(error){
    console.error('Error fetching the activity',error);
    throw error;
}
}

export const logActivity  = async(ActivityData)=> {
    const token = getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(`${API_URL}/log`,ActivityData,config);
    return response.data;
}