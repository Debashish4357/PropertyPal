import axios from "axios";

// Configure axios defaults
axios.defaults.withCredentials = true;

const apiRequest = axios.create({
    baseURL: "https://propertypal-wbh0.onrender.com/api",
    headers: {
        'Content-Type': 'application/json',
    }
});

// Add a request interceptor to attach the token
apiRequest.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add response interceptor for debugging
apiRequest.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Log the error details for debugging
            console.error('API Error:', {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers,
                cookies: document.cookie // Log cookies for debugging
            });
        }
        return Promise.reject(error);
    }
);

export default apiRequest;