const mongoose = require("mongoose"),
    Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')
const cryto = require("crypto")
const jwt = require("jsonwebtoken")
const secret = require("../config").secret
const { token } = require("morgan")

const errorCampo = "Campo não pode ficar vazio"
const errorEmail = "Campo inválido"
const UsuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, errorCampo]
    },
    email: {
        type: {
            type: String,
            lowercase: true,
            unique: true,
            required: [true, errorCampo],
            index: true,
            match: [/\S+@\S+\.\S+/, errorEmail]
        }
    },
    loja: {
        type: Schema.Types.ObjectId,
        ref: "Loja",
        required: [true, errorCampo]
    },
    permissao: {
        type: Array,
        default: ["cliente"]
    },
    hash: String,
    salt: String,
    recovery: {
        type: {
            token: String,
            date: Date
        },
        dafault: {}
    }
}, { timestamps: true })

UsuarioSchema.plugin(uniqueValidator, { message: "Já esta sendo utilizado" })

UsuarioSchema.methods.setSenha = function (password) {
    this.salt = cryto.randomBytes(16).toString("hex")
    this.hash = cryto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex")
}

UsuarioSchema.methods.validarSenha = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex")
    return hash === this.hash
}

UsuarioSchema.methods.gerarToken = function () {
    const hoje = new Date()
    const sxp = new Date(today)
    exp.setDate(today.getDate() + 15)

    return jwt.sign({
        id: this._id,
        email: this.email,
        nome: this.nome,
        exp: parseFloat(exp.getTime() / 1000, 10)
    }, secret)
}

UsuarioSchema.methods.enviarAuthJSON = function () {
    return {
        _id: this._id, 
        nome: this.nome,
        email: this.email,
        loja: this.loja,
        role: this.permissao,
        token: this.gerarToken()
    }
}

UsuarioSchema.methods.criarTokenRecuperacaoSenha = function () {
    this.recovery = {}
    this.recovery.token = crypto.randomBytes(16).toString("hex")
    this.recovery.date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
    return this.recovery
}

UsuarioSchema.methods.finalizarTokenRecuperacaoSenha = function () {
    this.recovery = { token: null, date: null }
    return this.recovery
}

module.exports = mongoose.model("Usuario", UsuarioSchema)