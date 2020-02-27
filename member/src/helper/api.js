import axios from 'axios'

const api = axios.create({baseURL: 'http://localhost:3000'})
// const api = axios.create({ baseURL: 'https://web-e-commerce.herokuapp.com' })


export default api