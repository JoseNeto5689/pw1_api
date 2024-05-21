import { ProductRepository } from "../../repositories/implementations/ProductRepository" 
import { DeleteProductController } from "./deleteProductController" 
import { DeleteProductUseCase } from "./deleteProductUseCase" 

const productRepository = new ProductRepository()

const deleteProductUseCase = new DeleteProductUseCase(productRepository)

const deleteProductController = new DeleteProductController(deleteProductUseCase)

export { deleteProductController, deleteProductUseCase }