const mongoose = require("mongoose")
const Loja = mongoose.model("Loja")

class LojasController {

    // GET / 
    index(req, res, next) {
        Loja.find({}).select("_id nome cnpj email telefones endereco")
            .then(lojas => res.send({ lojas }))
            .catch(next)
    }

    //  GET /:id
    show(req, res, next) {
        Loja.findById(req.params.id).select("_id nome cnpj email telefones endereco")
            .then(loja => res.send({ loja }))
            .catch(next)

    }

    // POST /
    store(req, res, next) {
        try {
            const { nome, cnpj, email, telefones, endereco } = req.body
            const loja = new Loja({ nome, cnpj, email, telefones, endereco })
            loja.save()
                .then(() => res.send({ loja }))
                .catch(
                    error => {
                        // return res.status(400).json({ errors: error.message })
                        next(error)
                    }
                )
        } catch (error) {
            console.error(error);
            next()
        }
    }

    // PUT /:id
    update(req, res, next) {
        const { nome, cnpj, email, telefones, endereco } = req.body
        Loja.findById(req.query.id).then(loja => {
            if (!loja) return res.status(422).send({ error: "Loja não existe" })

            if (nome) loja.nome = nome
            if (cnpj) loja.cnpj = cnpj
            if (email) loja.email = email
            if (telefones) loja.telefones = telefones
            if (endereco) loja.endereco = endereco
            loja.save()
                .then(() => res.send({ loja }))
                .catch(next)

        })
            .catch(next)
    }

    // DELETE /:id
    remove(req, res, next) {
        Loja.findById(req.query.id).then(loja => {
            if (!loja) return res.status(422).send({ error: "Loja não existe" })
            Loja.remove({ _id: req.params.id }).then(() => res.send({ delete: true })).catch(next)
        })
            .catch(next)
    }

}

module.exports = LojasController