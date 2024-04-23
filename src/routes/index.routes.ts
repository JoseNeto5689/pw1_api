import { Router, request, response } from "express"
import { createSupplierController } from "../useCases/CreateSupplier"
import { createProductController } from "../useCases/CreateProduct"
import { createPersonController } from "../useCases/CreatePerson"
import { createSupplyController } from "../useCases/CreateSupply"
import { findAllPersonController } from "../useCases/FindAllPerson"

const router: Router = Router()

router.post("/supplier", (request, response) => createSupplierController.handle(request, response))
router.post("/product", (request, response) => createProductController.handle(request, response))
router.post("/person", (request, response) => createPersonController.handle(request, response))
router.post("/supply", (request, response) => createSupplyController.handle(request, response))
router.get("/person", (request, response) => findAllPersonController.handle(request, response))

export default router