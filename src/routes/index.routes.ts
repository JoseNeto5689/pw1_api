import { Router } from "express"
import { createSupplierController } from "../useCases/CreateSupplier"

const router: Router = Router()

router.post("/supplier", createSupplierController.handle)

export default router