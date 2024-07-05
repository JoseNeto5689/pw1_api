import { createSupplyController } from "../useCases/CreateSupply"
import { findAllSuppliesController } from "../useCases/FindAllSupply"
import { findByIdSupplyController } from "../useCases/FindByIdSupply"
import { deleteSupplyController } from "../useCases/DeleteSupply"
import { updateSupplyController } from "../useCases/UpdateSupply"
import { Application } from 'express';

const supplyRoutes = (app: Application) => {
    app.post("/supply", (request, response) => createSupplyController.handle(request, response))
    app.get("/supply", (request, response) => findAllSuppliesController.handle(request, response))
    app.get("/supply/:id", (request, response) => findByIdSupplyController.handle(request, response))
    app.delete("/supply/:id", (request, response) => deleteSupplyController.handle(request, response))
    app.put("/supply/:id", (request, response) => updateSupplyController.handle(request, response))
}

export default supplyRoutes