const Joi = require('joi');
const addArticleValidatorHandler = require('../middlewares/addArticleValidatorHandler');

const addArticleValidator = (req, res, next) => {
    const schema = Joi.object().keys({
        title: Joi.string()
            .required(),
        author: Joi.string()
            .required(),
        body: Joi.string()
            .required()
    });
    addArticleValidatorHandler(req, res, next, schema);
};

module.exports = {
    addArticleValidator
};