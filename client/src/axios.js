import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:4000' //API cloud function url 
});

export default instance;