import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BASE_API_URL;
axios.defaults.headers.common['x-API-key'] =  process.env.REACT_APP_API_KEY;

export default axios;