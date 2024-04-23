import { ProductRepository } from "../../repositories/implementations/ProductRepository"
import { CreateProductUseCase } from "./createProductUseCase"
import { CreateProductController } from "./createProductController"

const productRepository = new ProductRepository()

const createProductUseCase = new CreateProductUseCase(productRepository)

const createProductController = new CreateProductController(createProductUseCase)

export { createProductUseCase, createProductController }
