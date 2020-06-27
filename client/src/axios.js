import axios from 'axios'

export default axios.create({
  baseURL: 'https://pc-corner.herokuapp.com/' // production
  // baseURL: 'http://localhost:3000/' //development
})
