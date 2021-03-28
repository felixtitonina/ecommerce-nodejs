const router = require("express").Router()
const auth = require("../../auth")
const LojasController = require("../../../controller/LojasController")

const { validate, Joi } = require('express-validation');
const { LojaValidation } = require("../../../controller/validacoes/lojaValidation");

const lojasController = new LojasController()

router.get("/", lojasController.index)
router.get("/:id", validate(LojaValidation.show), lojasController.show)


router.post("/", auth.required, validate(LojaValidation.store), lojasController.store)
router.put("/:id", auth.required, LojaValidation.admin, validate(LojaValidation.update), lojasController.update)
router.delete("/:id", auth.required, LojaValidation.admin, lojasController.remove)


module.exports = router