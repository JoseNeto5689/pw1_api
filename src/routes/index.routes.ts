import { Router } from "express"
import { createSupplierController } from "../useCases/CreateSupplier"

const router: Router = Router()

router.post("/supplier", (request, response) => createSupplierController.handle(request, response))

export default router