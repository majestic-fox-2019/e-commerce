import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000'
  // baseURL: 'https://frozen-castle-56073.herokuapp.com'
})


export default instance 
