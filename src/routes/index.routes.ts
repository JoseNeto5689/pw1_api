import { Router } from "express"
import { createSupplierController } from "../useCases/CreateSupplier"
import { createProductController } from "../useCases/CreateProduct"
import { createPersonController } from "../useCases/CreatePerson"
import { createSupplyController } from "../useCases/CreateSupply"
import { findAllPersonController } from "../useCases/FindAllPerson"
import { findAllSuppliersController } from "../useCases/FindAllSupplier"
import { findAllProductsController } from "../useCases/findAllProduct"
import { findAllSuppliesController } from "../useCases/findAllSupply"

const router: Router = Router()

router.post("/supplier", (request, response) => createSupplierController.handle(request, response))
router.post("/product", (request, response) => createProductController.handle(request, response))
router.post("/person", (request, response) => createPersonController.handle(request, response))
router.post("/supply", (request, response) => createSupplyController.handle(request, response))

router.get("/supplier", (request, response) => findAllSuppliersController.handle(request, response)) 
router.get("/person", (request, response) => findAllPersonController.handle(request, response))
router.get("/product", (request, response) => findAllProductsController.handle(request, response))
router.get("/supply", (request, response) => findAllSuppliesController.handle(request, response))


export default router