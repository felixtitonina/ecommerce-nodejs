
const Joi = require('joi')

const UsuarioValidation = {
    show: {
        params: Joi.object({
            id: Joi.string().alphanum().length(24).required()
        }),
    },
    store: {
        body: Joi.object({
            nome: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            loja: Joi.string().alphanum().length(24).required()
        }),
    },
    update: {
        body: Joi.object({
            nome: Joi.string().optional(),
            email: Joi.string().email().optional(),
            password: Joi.string().optional()
        }),
    },
    login: {
        body: Joi.object({
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string()
                //   .regex(/[a-zA-Z0-9]{3,30}/)
                .required(),
        }),
    }
};

module.exports = {
    UsuarioValidation
};