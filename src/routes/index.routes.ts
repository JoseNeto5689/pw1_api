import { Router, Request, Response } from "express"
import { createSupplierController } from "../useCases/CreateSupplier"

const router: Router = Router()

router.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello, world!" })
})

router.post("/supplier", createSupplierController.handle)

export default router