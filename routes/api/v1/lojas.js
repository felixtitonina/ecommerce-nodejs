const router = require("express").Router()
const lojaValidation = require("../../../controller/validacoes/lojaValidation")
const auth = require("../../auth")
const LojasController = require("../../../controller/LojasController")

const lojasController = new LojasController()

router.get("/", lojasController.index)
router.get("/:id", lojasController.show)


router.post("/", auth.required, lojasController.store)
router.put("/:id", auth.required, lojaValidation, lojasController.update)
router.delete("/:id", auth.required, lojaValidation, lojasController.remove)


module.exports = router