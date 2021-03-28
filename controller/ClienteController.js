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
        try {
            const offset = Number(req.query.offset) || 0
            const limit = Number(req.query.limit) || 50
            const search = new RegExp(req.params.search, "i")

            const clientes = await Cliente.paginate(
                { loja: req.query.loja, nome: { $regex: search } },
                { offset, limit, populate: "usuario" })
            return res.json({ clientes })
        } catch (error) {
            next(error)
        }
    }
    // GET /admin/:id
    async showAdmin(req, res, next) {
        try {
            const cliente = await Cliente.findOne({ _id: req.params.id, loja: req.query.loja }).populate("usuario")
            return res.send({ cliente })
        } catch (error) {
            next(error)
        }
    }
    // GET /admin/:id/:pedidos
    async showPedidosCliente(req, res, next) {
        return res.status(400).send({ error: "Em desenvolvimento" })
    }
    //PUT /admin/:id
    async updateAdmin(req, res, next) {
        const { name, cpf, email, telefones, endereco, dataDeNascimento } = req.body
        try {

            const cliente = await Cliente.findById(req.params.id).populate('usuario')
            if (name) {
                cliente.usuario.nome = nome
                cliente.nome
            }
            if (email) cliente.usuario.email = email
            if (telefones) cliente.telefones = telefones
            if (endereco) cliente.endereco = endereco
            if (dataDeNascimento) cliente.dataDeNascimento = dataDeNascimento
            await cliente.save()
            return res.send({ cliente })
        } catch (error) {
            next(error)
        }
    }
    // CLIENTE

    // GET /:id
    async show(req, res, next) {
        try {
            const cliente = await Cliente.findOne({ usuario: req.payload.id, loja: req.query.loja }).populate("usuario")
            return res.send({ cliente })
        } catch (error) {
            next(error)
        }
    }
    // POST /
    async store(req, res, next) {
        const { nome, email, cpf, telefones, endereco, dataDeNascimento, password } = req.body
        const { loja } = req.query

        const usuario = new Usuario({ nome, email, loja })
        usuario.setSenha(password)
        const cliente = new Cliente({ nome, cpf, telefones, endereco, loja, dataDeNascimento, usuario: usuario._id })
        try {
            await usuario.save()
            await cliente.save()

            return res.send({ cliente: Object.assign({}, cliente._doc, { email: usuario.email }) })
        } catch (error) {
            next(error)
        }

    }
    // PUT /:id
    async update(req, res, next) {
        try {
            const { nome, email, cpf, telefones, endereco, dataDeNascimento, password } = req.body
            const cliente = await Cliente.findById(req.payload.id).populate("usuario")
            if (nome) {
                cliente.usuario.nome = nome
                cliente.nome = nome
            }
            if (email) cliente.usuario.email = email
            if (password) cliente.usuario.setSenha(password)
            if (cpf) cliente.cpf = cpf
            if (telefones) cliente.telefones = telefones
            if (endereco) cliente.endereco = endereco
            if (dataDeNascimento) cliente.dataDeNascimento = dataDeNascimento

            await cliente.save()
            return res.send({ cliente })
        } catch (error) {
            next(error)
        }
    }
    // delete /:id 
    async remove(req, res, next) {
        try {
            const cliente = await Cliente.findOne({ usuario: req.payload.id }).paginate("usuario")
            await cliente.usuario.remove()
            cliente.deletado = true
            await cliente.save()
            return res.send({ deleto: true })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ClientesController