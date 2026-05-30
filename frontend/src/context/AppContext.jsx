import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currencySymbol = "₹";
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
    const [userData, setUserData] = useState(null);
    const [socket, setSocket] = useState(null);

    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctors');
            setDoctors(data);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getDoctorsData();
    }, []);

    // Setup Global Socket Connection when token is present
    useEffect(() => {
        if (token) {
            const newSocket = io(backendUrl);
            setSocket(newSocket);

            // In a real app, you would decode the token to get userId and role
            // Here we assume patient for demo purposes unless role is explicitly doctor
            const decodedId = 'mock_user_id'; 
            newSocket.emit('join_user_room', decodedId);

            return () => newSocket.close();
        } else {
            if (socket) socket.close();
            setSocket(null);
        }
    }, [token, backendUrl]);

    const value = {
        doctors,
        getDoctorsData,
        currencySymbol,
        token,
        setToken,
        backendUrl,
        userData,
        setUserData,
        socket
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};
export default AppContextProvider;