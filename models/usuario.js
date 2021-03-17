const mongoose = require("mongoose"),
    Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')
const cryto = require("crypto")
const jwt = require("jsonwebtoken")
const secret = require("../config").secret

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
            required: [ true, errorCampo],
            index: true, 
            match: [/\S+@\S+\.\S+/, errorEmail]
        }
    },
    loja: {
        type: Schema.Types.ObjectId,
        ref: "Loja"
    }
})