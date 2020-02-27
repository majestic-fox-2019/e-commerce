const { History } = require('../models')

class HistoryController {
    static showHistory(req, res, next) {
        History
            .findAll({
                where: {
                    UserId: req.user.id
                },
                order: [['createdAt', 'DESC']]
            })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(next)
    }
}

module.exports = HistoryController