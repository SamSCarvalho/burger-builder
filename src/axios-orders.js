import axios from  'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-react-1fbf5.firebaseio.com/'
});

export default instance;