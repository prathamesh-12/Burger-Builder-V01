import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-d5983.firebaseio.com/'
});

export default instance;