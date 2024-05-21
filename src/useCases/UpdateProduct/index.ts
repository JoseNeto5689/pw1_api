import { ProductRepository } from "../../repositories/implementations/ProductRepository" 
import { CreateProductController } from "./updateProductController" 
import { UpdateProductUseCase } from "./updateProductUseCase" 

const productRepository = new ProductRepository()

const updateProductUseCase = new UpdateProductUseCase(productRepository)

const updateProductController = new CreateProductController(updateProductUseCase)

export { updateProductUseCase, updateProductController }