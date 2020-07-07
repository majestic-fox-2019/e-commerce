const { User, Product, Transaction } = require('../models')

class TransactionController {
    static readAll(req, res, next) {
        Transaction.findAll(
            {
                include: [User, Product],
                order: [
                    ['id', 'DESC'],
                ],
            }
        )
        .then(transactions => {
            res.status(200).json(transactions)
        })
        .catch(next)
    }

}

module.exports = TransactionController