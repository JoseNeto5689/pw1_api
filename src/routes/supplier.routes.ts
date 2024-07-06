
import { Application } from "express"
import { createSupplierController } from "../useCases/CreateSupplier/"
import { findAllSuppliersController } from "../useCases/FindAllSupplier"
import { findByIdSupplierController } from "../useCases/FindByIdSupplier"
import { deleteSupplierController } from "../useCases/DeleteSupplier"
import { updateSupplierController } from "../useCases/UpdateSupplier"
import EnsureAuthenticate from "../middlewares/EnsureAuthenticate"
//import multer from "multer"

/*
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
*/
const supplierRoutes = (app: Application) => {
    app.post("/supplier", EnsureAuthenticate.handle, (request, response) => createSupplierController.handle(request, response))
    app.get("/supplier", EnsureAuthenticate.handle, (request, response) => findAllSuppliersController.handle(request, response)) 
    app.get("/supplier/:id", EnsureAuthenticate.handle, (request, response) => findByIdSupplierController.handle(request, response))
    app.delete("/supplier/:id", EnsureAuthenticate.handle, (request, response) => deleteSupplierController.handle(request, response))
    app.put("/supplier/:id", EnsureAuthenticate.handle, (request, response) => updateSupplierController.handle(request, response))
}

export default supplierRoutes