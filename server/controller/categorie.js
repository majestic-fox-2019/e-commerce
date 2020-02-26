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
            category: req.body.category,
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
            category: req.body.category,
        };
        Category.findByPk(req.params.id)
            .then(result => {
                return Category.update(objInput, {
                    where: {
                        id: req.params.id
                    }
                });
            })
            .then(result => {
                res.status(200).json(objInput);
            })
            .catch(err => {
                res.status(404).json(err.response);
            });
    }
    static deleteOne(req, res, next) {
        let objInput
        Category.findByPk(req.params.id)
            .then(result => {
                objInput = result
                return Category.destroy(
                    {
                        where:
                        {
                            id: req.params.id
                        }
                    });
            })
            .then(result => {
                res.status(200).json(objInput);
            })
            .catch(err => {
                res.status(404).json(err.response);
            });
    }
}
module.exports = CategoryController;
