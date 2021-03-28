const Joi = require('joi')
    .extend(require('@joi/date'));
const ClienteValidation = {
    index: {
        query: Joi.object({
            offset: Joi.number(),
            limit: Joi.number()
        })
    },
    searchPedidos: {
        query: Joi.object({
            offset: Joi.number(),
            limit: Joi.number()
        }),
        params: Joi.object({
            search: Joi.string().required()
        })
    },
    search: {
        query: Joi.object({
            offset: Joi.number(),
            limit: Joi.number()
        }),
        params: Joi.object({
            search: Joi.string().required()
        })
    },
    showAdmin: {
        params: Joi.object({
            id: Joi.string().alphanum().length(24).required()
        })
    },
    showPedidosCliente: {
        query: Joi.object({
            offset: Joi.number(),
            limit: Joi.number()
        }),
        params: Joi.object({
            id: Joi.string().alphanum().length(24).required()
        })
    },
    updateAdmin: {
        params: Joi.object({
            id: Joi.string().alphanum().length(24).required()
        }),
        body: Joi.object({
            nome: Joi.string().optional(),
            cpf: Joi.string().length(14).optional(),
            email: Joi.string().email().optional(),
            telefones: Joi.array().items(Joi.string()).optional(),
            endereco: Joi.object({
                local: Joi.string().required(),
                numero: Joi.string().required(),
                complemento: Joi.string(),
                bairro: Joi.string().required(),
                cidade: Joi.string().required(),
                estado: Joi.string().required(),
                CEP: Joi.string().required()
            }).optional(),
            dataDeNascimento: Joi.date().format('YYYY-MM-DD').utc().raw().optional()
        })
    },

    // CLIENTE 
    show: {
        query: Joi.object({
            loja: Joi.string().alphanum().length(24).required()
        })
    },
    store: {
        query: Joi.object({
            loja: Joi.string().alphanum().length(24).required()
        }),
        body: Joi.object({
            nome: Joi.string().required(),
            password: Joi.string().required(),
            cpf: Joi.string().length(14).required(),
            email: Joi.string().email().required(),
            telefones: Joi.array().items(Joi.string()).required(),
            endereco: Joi.object({
                local: Joi.string().required(),
                numero: Joi.string().required(),
                complemento: Joi.string(),
                bairro: Joi.string().required(),
                cidade: Joi.string().required(),
                estado: Joi.string().required(),
                CEP: Joi.string().required()
            }).required(),
            dataDeNascimento: Joi.date().format("YYYY-MM-DD").utc().raw().required()
        })
    },
    update: {
        query: Joi.object({
            loja: Joi.string().alphanum().length(24).required()
        }),
        params: Joi.object({
            id: Joi.string().alphanum().length(24).required()
        }),
        body: Joi.object({
            nome: Joi.string().optional(),
            password: Joi.string().optional(),
            cpf: Joi.string().length(14).optional(),
            email: Joi.string().email().optional(),
            telefones: Joi.array().items(Joi.string()).optional(),
            endereco: Joi.object({
                local: Joi.string().required(),
                numero: Joi.string().required(),
                complemento: Joi.string(),
                bairro: Joi.string().required(),
                cidade: Joi.string().required(),
                estado: Joi.string().required(),
                CEP: Joi.string().required()
            }).optional(),
            dataDeNascimento: Joi.date().format("YYYY-MM-DD").raw().optional()
        })
    }
};

module.exports = { ClienteValidation };