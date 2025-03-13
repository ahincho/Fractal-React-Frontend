import axios from "axios";

const apiUrl = 'http://3.15.186.19:3000';

const axiosClient = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
