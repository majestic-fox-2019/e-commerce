import axios from 'axios'

let instance = axios.create({
    baseURL: `https://ecommerce-serverside.herokuapp.com/`
})

export default instance