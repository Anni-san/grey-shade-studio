import axios from 'axios';

// 1. Point this directly to your Spring Boot kitchen
const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

// 2. Before ANY request leaves React, do this:
api.interceptors.request.use(
    (config) => {
        // Look in the browser's memory for the VIP pass
        const token = localStorage.getItem('jwtToken');
        
        // If the pass exists, tape it to the request headers
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;