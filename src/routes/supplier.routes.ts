
import { Application, Request, Response } from "express-serve-static-core";
import { createSupplierController } from "../useCases/CreateSupplier/"
import { findAllSuppliersController } from "../useCases/FindAllSupplier"
import { findByIdSupplierController } from "../useCases/FindByIdSupplier"
import { deleteSupplierController } from "../useCases/DeleteSupplier"
import { updateSupplierController } from "../useCases/UpdateSupplier"

const supplierRoutes = (app: Application) => {
    app.post("/supplier", (request, response) => createSupplierController.handle(request, response))
    app.get("/supplier", (request, response) => findAllSuppliersController.handle(request, response)) 
    app.get("/supplier/:id", (request, response) => findByIdSupplierController.handle(request, response))
    app.delete("/supplier/:id", (request, response) => deleteSupplierController.handle(request, response))
    app.put("/supplier/:id", (request, response) => updateSupplierController.handle(request, response))
}

export default supplierRoutes