import { createProductController } from "../useCases/CreateProduct"
import { findAllProductsController } from "../useCases/FindAllProduct"
import { findByIdProductController } from "../useCases/FindByIdProduct"
import { deleteProductController } from "../useCases/DeleteProduct"
import { updateProductController } from "../useCases/UpdateProduct"
import { saveImageController } from "../useCases/SaveProductImage"
import multer from "multer"
import { Application } from "express"
import EnsureAuthenticate from "../middlewares/EnsureAuthenticate"

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const productRoutes = (app: Application) => {
    app.post("/product", EnsureAuthenticate.handle, (request, response) => createProductController.handle(request, response))
    app.get("/product", EnsureAuthenticate.handle, (request, response) => findAllProductsController.handle(request, response))
    app.get("/product/:id", EnsureAuthenticate.handle, (request, response) => findByIdProductController.handle(request, response))
    app.delete("/product/:id", EnsureAuthenticate.handle, (request, response) => deleteProductController.handle(request, response))
    app.put("/product/:id", EnsureAuthenticate.handle, (request, response) => updateProductController.handle(request, response))
    app.patch("/product/:id", EnsureAuthenticate.handle, upload.single("image"), (request, response) => saveImageController.handle(request, response))
}

export default productRoutes