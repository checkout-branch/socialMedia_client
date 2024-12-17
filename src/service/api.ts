import axios from 'axios';


const api = axios.create({
    baseURL: "http://localhost:5005/api",
    headers: {
        'Content-Type': 'application/json', 
    },
});

// Request Interceptor to attach token from cookies to requests
api.interceptors.request.use(
    (config) => {
        // Get the token from the cookies
        const token = sessionStorage.getItem("Access_token");  // Read token from cookies
        console.log(token)

        if (token) {
            console.log('token get')
            // Attach the token to the Authorization header
            config.headers['Authorization'] = `Bearer ${token}`;
        }else {
            console.error("No token found in sessionStorage.");
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor for handling errors
api.interceptors.response.use(
    (response) => {
        console.log(response,'alksdjfl');
        
        return response;
    },
    (error) => {
        if (error.response) {
            const status = error.response.status;
            switch (status) {
                case 400:
                    console.error('Bad Request');
                    break;
                case 401:
                    console.error('Unauthorized: Please log in to continue.');
                    // Redirect to login page or show login modal
                    // window.location.replace('auth/login');
                    break;
                case 500:
                    console.error('Internal Server Error');
                    break;
                default:
                    console.error(`Error: ${status}`);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
