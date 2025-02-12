/* eslint-disable no-unused-vars */

import { message } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { setLogout } from '../redux/loginForm';
import { axiosInstance } from "./axiosInstance";

const ApiFunction = () => {
    const userData = useSelector(state => state.auth.userData);
    // const userData = decryptData(encryptedUser)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const token = localStorage.getItem('btelco_admin_panel');
    const handleUserLogout = () => {
        dispatch(setLogout());
        navigate("/auth/login", { replace: true });
        message.info('Your session is expire, please login')
    }

    // Define headers
    const header1 = {
        "Content-Type": "application/json",
        "x-auth-token": token,
    };

    const header2 = {
        "Content-Type": "multipart/form-data",
        "x-auth-token": token,
    };

    // API Functions
    const get = async (endpoint, headers = header1) => {
        try {
            const response = await axiosInstance.get(endpoint, {
                headers: {
                    ...headers,
                },
            });
            return response.data;
        } catch (error) {
            // console.error("Error in GET request:", error);
            if (error.response.status === 401) {
                handleUserLogout()
            }
            throw error;
        }
    };

    const post = async (endpoint, apiData, headers = header1) => {
        try {
            const response = await axiosInstance.post(endpoint, apiData, {
                headers: {
                    ...headers,
                },
            });
            return response.data;
        } catch (error) {
            // console.error("Error in POST request:", error);
            if (error.response.status === 401) {
                handleUserLogout()
            }
            throw error;
        }
    };

    const deleteData = async (endpoint, headers = header1) => {
        try {
            const response = await axiosInstance.delete(endpoint, {
                headers: {
                    ...headers,
                },
            });
            return response.data;
        } catch (error) {
            // console.error("Error in DELETE request:", error);
            if (error.response.status === 401) {
                handleUserLogout()
            }
            throw error;
        }
    };

    const put = async (endpoint, apiData, headers = header1) => {
        try {
            const response = await axiosInstance.put(endpoint, apiData, {
                headers: {
                    ...headers,
                },
            });
            return response.data;
        } catch (error) {
            // console.error("Error in PUT request:", error);
            if (error.response.status === 401) {
                handleUserLogout()
            }
            throw error;
        }
    };

    return {
        get,
        post,
        deleteData,
        put,
        header1,
        header2,
        userData,
    };
};

export default ApiFunction;
