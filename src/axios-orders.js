import axios from 'axios';

const instance = axios.create({
   baseURL: 'https://burgerbuilderapp-ed799-default-rtdb.firebaseio.com/'
});

export default instance;
