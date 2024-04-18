import { Router } from "express"
import { createSupplierController } from "../useCases/CreateSupplier"
import { createProductController } from "../useCases/CreateProduct"
import { createPersonController } from "../useCases/CreatePerson"

const router: Router = Router()

router.post("/supplier", (request, response) => createSupplierController.handle(request, response))
router.post("/product", (request, response) => createProductController.handle(request, response))
router.post("/person", (request, response) => createPersonController.handle(request, response))

export default router