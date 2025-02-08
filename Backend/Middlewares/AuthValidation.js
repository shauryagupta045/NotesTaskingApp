const Joi = require('joi');

const SignupValidation = (req, res, next) => {
    const Schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(4).max(100),
    });

    const { error } = Schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Validation error",
            success: false,
            error: error.details[0].message, // Send only the error message
        });
    }
    next();
};

const loginValidation = (req, res, next) => {
    const Schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(4).max(100),
    });

    const { error } = Schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Validation error",
            success: false,
            error: error.details[0].message, // Send only the error message
        });
    }
    next();
};

module.exports = {
    SignupValidation,
    loginValidation,
};