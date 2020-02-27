const {Transaction, TransactionDetail, Cart} = require('../database/models');

class TransactionController {
  // add transaction
  static async addTransaction(req, res, next) {
    const {id: UserId} = req.headers.user;
    const { items } = req.body;
  }
}

module.exports = TransactionController;
