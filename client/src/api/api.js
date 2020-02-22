import axios from 'axios';

const api = axios.create({ baseURL : 'https://disekrip-cms.herokuapp.com' })

export default api