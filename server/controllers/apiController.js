const axios = require('axios')
const { User } = require('../models')

class ApiController {
  static getCity(req, res, next) {
    axios
      .get('https://api.rajaongkir.com/starter/city', {
        headers: { key: process.env.API_KEY }
      })
      .then(({ data }) => {
        const result = data.rajaongkir.results
        const city = []
        for (let i = 0; i < result.length; i++) {
          let temp = {
            value: result[i].city_id,
            text: `${result[i].type} ${result[i].city_name}`
          }
          city.push(temp)
        }
        res.status(200).json(city)
      })
      .catch(next)
  }

  static getCost(req, res, next) {
    const data = {
      destination: req.body.destination,
      weight: Number(req.body.weight) * 1000,
      courier: req.body.courier
    }
    User.findOne({ where: { id: req.body.productOwner } })
      .then(result => {
        data.origin = result.userLocationId
        return axios.post('https://api.rajaongkir.com/starter/cost', data, {
          headers: { key: process.env.API_KEY }
        })
      })
      .then(({ data }) => {
        const result = data.rajaongkir.results[0].costs[0].cost[0]
        res.status(200).json(result)
      })
      .catch(next)
  }
}

module.exports = ApiController
