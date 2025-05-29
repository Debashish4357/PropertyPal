import axios from "axios";

// Configure axios defaults
axios.defaults.withCredentials = true;

const apiRequest = axios.create({
    baseURL: "https://propertypal-wbh0.onrender.com/api",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
    // Add these options to ensure cookies are handled properly
    withCredentials: true,
    xsrfCookieName: 'token',
    xsrfHeaderName: 'X-CSRF-Token'
});

// Add request interceptor to ensure credentials are sent
apiRequest.interceptors.request.use(
    (config) => {
        // Ensure credentials are included in every request
        config.withCredentials = true;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
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