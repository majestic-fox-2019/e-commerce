const { Category } = require("../models")

class CategoryController {
    static getAll(req, res, next) {
        Category.findAll()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(404).json({ message: "data not found" });
            });
    }
    static addOne(req, res, next) {
        let objInput = {
            name: req.body.name,
        };
        Category.create(objInput)
            .then(result => {
                res.status(201).json(result);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    }
    static updateOne(req, res, next) {
        let objInput = {
            name: req.body.name,
        };
        Category.findByPk(req.params.id)
            .then(result => {
                res.status(200).json(result);
                return Category.update(objInput, {
                    where: {
                        id: req.params.id
                    }
                });
            })
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(404).json({ message: "data not found" });
            });
    }
    static deleteOne(req, res, next) {
        Category.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(result => {
                if (result === 0) {
                    res.status(404).json({ message: "data not found" });
                } else {
                    res.status(200).json(result);
                }
            })
            .catch(err => {
                res.status(400);
            });
    }
}
module.exports = CategoryController;
