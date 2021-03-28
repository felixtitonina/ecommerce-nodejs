const router = require("express").Router()
const ClientesController = require("../../../controller/ClienteController")

const { LojaValidation } = require("../../../controller/validacoes/lojaValidation");
const { ClienteValidation } = require("../../../controller/validacoes/clienteValidation");
const { validate, joi } = require("express-validation")

const clientesController = new ClientesController()
const auth = require("../../auth")

// ADMIN
router.get("/", auth.required, LojaValidation.admin, clientesController.index)
// router.get("/search/:search/pedidos", auth.required, LojaValidation.admin, clientesController.searchPedidos)
router.get("/search/:search", auth.required, LojaValidation.admin, clientesController.search)

router.get("/admin/:id", auth.required, LojaValidation.admin, clientesController.showAdmin)
// router.get("/admin/:id/:pedidos", auth.required, LojaValidation.admin, clientesController.showPedidosCliente)

router.get("/admin/:id", auth.required, LojaValidation.admin, clientesController.updateAdmin)

// CLIENTE
router.get("/:id", auth.required, clientesController.show)

router.post("/", clientesController.store)
router.put("/:id", auth.required, clientesController.update)
router.delete("/:id", auth.required, clientesController.remove)

module.exports = router  