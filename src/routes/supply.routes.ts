import { createSupplyController } from "../useCases/CreateSupply"
import { findAllSuppliesController } from "../useCases/FindAllSupply"
import { findByIdSupplyController } from "../useCases/FindByIdSupply"
import { deleteSupplyController } from "../useCases/DeleteSupply"
import { updateSupplyController } from "../useCases/UpdateSupply"
import { Application } from "express"
import EnsureAuthenticate from "../middlewares/EnsureAuthenticate"

const supplyRoutes = (app: Application) => {
    app.post("/supply", EnsureAuthenticate.handle, (request, response) => createSupplyController.handle(request, response))
    app.get("/supply", EnsureAuthenticate.handle, (request, response) => findAllSuppliesController.handle(request, response))
    app.get("/supply/:id", EnsureAuthenticate.handle, (request, response) => findByIdSupplyController.handle(request, response))
    app.delete("/supply/:id", EnsureAuthenticate.handle, (request, response) => deleteSupplyController.handle(request, response))
    app.put("/supply/:id", EnsureAuthenticate.handle, (request, response) => updateSupplyController.handle(request, response))
}

export default supplyRoutes