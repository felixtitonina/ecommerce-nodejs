const mongoose = require("mongoose")

const Cliente = mongoose.model("Cliente")
const Usuario = mongoose.model("Usuario")

class ClientesController {
    //ADMIN
    // GET /
    async index(req, res, next) {
        try {
            const offset = Number(req.query.offset) || 0
            const limit = Number(req.query.limit) || 50
            const clientes = await Cliente.paginate(
                { loja: req.query.loja },
                { offset, limit, populate: "usuario" })
            return res.json({ clientes })
        } catch (error) {
            next(error)
        }

    }
    // GET /search/:search/pedidos
    async searchPedidos(req, res, next) {
        return res.status(400).send({ error: "Em desenvolvimento" })
    }
    // GET /search/:search
    async search(req, res, next) {

    }
    // GET /admin/:id
    async showAdmin(req, res, next) {

    }
    // GET /admin/:id/:pedidos
    async showPedidosCliente(req, res, next) {

    }
    //GET /admin/:id
    async updateAdmin(req, res, next) {

    }
    // CLIENTE

    // GET /:id
    async show(req, res, next) {

    }
    // POST /
    async store(req, res, next) {

    }
    // PUT /:id
    async update(req, res, next) {

    }
    // delete /:id
    async remove(req, res, next) {

    }
}

module.exports = ClientesController