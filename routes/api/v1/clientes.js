const router = require("express").Router()
const ClientesController = require("../../../controller/ClienteController")

const { LojaValidation } = require("../../../controller/validacoes/lojaValidation");
const { ClienteValidation } = require("../../../controller/validacoes/clienteValidation");
const { validate, joi } = require("express-validation")

const clientesController = new ClientesController()
const auth = require("../../auth")

// ADMIN
router.get("/", auth.required, LojaValidation.admin, validate(ClienteValidation.index), clientesController.index)
// router.get("/search/:search/pedidos", auth.required, LojaValidation.admin, validate(ClienteValidation.searchPedidos), clientesController.searchPedidos)
router.get("/search/:search", auth.required, LojaValidation.admin,  validate(ClienteValidation.search), clientesController.search)

router.get("/admin/:id", auth.required, LojaValidation.admin, validate(ClienteValidation.showAdmin), clientesController.showAdmin)
// router.get("/admin/:id/:pedidos", auth.required, LojaValidation.admin, validate(ClienteValidation.showPedidosCliente), clientesController.showPedidosCliente)

router.get("/admin/:id", auth.required, LojaValidation.admin, validate(ClienteValidation.updateAdmin), clientesController.updateAdmin)

// CLIENTE
router.get("/:id", auth.required, validate(ClienteValidation.show), clientesController.show)

router.post("/", validate(ClienteValidation.store), clientesController.store)
router.put("/:id", auth.required, validate(ClienteValidation.update), clientesController.update)
router.delete("/:id", auth.required, clientesController.remove)

module.exports = router  