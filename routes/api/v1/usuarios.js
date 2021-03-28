const router = require("express").Router()
const auth = require("../../auth")
const UsuarioController = require("../../../controller/UsuarioController")

const { validate, Joi } = require('express-validation');
const { UsuarioValidation } = require("../../../controller/validacoes/usuarioValidation");

const usuarioController = new UsuarioController()



router.post("/login", validate(UsuarioValidation.login, /**{keyByField: true}, {}*/ ), usuarioController.login)
router.post("/registrar", validate(UsuarioValidation.store), usuarioController.store)
router.put("/", auth.required, validate(UsuarioValidation.update), usuarioController.update)
router.delete("/", auth.required, usuarioController.remove)

router.get("/recuperar-senha", usuarioController.showRecovery)
router.post("/recuperar-senha", usuarioController.createRecovery)
router.get("/senha-recuperada", usuarioController.showCompleteRecovery)
router.post("/senha-recuperada", usuarioController.completeRecovery)

router.get("/", auth.required, usuarioController.index)
router.get("/:id", auth.required, validate(UsuarioValidation.show), usuarioController.show)

module.exports = router