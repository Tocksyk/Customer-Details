const Joi = require("joi");

const schema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(10)
        .required(),
    email: Joi.string()
        .email()
        .min(5)
        .max(15)
        .required()
})


exports.validateSchema = function (req, res, next) {
    try {
        schema.validate(req.body);
        next();
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
}