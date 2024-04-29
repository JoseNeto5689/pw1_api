import { ProductRepository } from "../../repositories/implementations/ProductRepository"
import { FindByIdProductController } from "./findByIdProductController"
import { FindByIdProductUseCase } from "./findByIdProductUseCase"

const productRepository = new ProductRepository()

const findByIdProductUseCase = new FindByIdProductUseCase(productRepository)

const findByIdProductController = new FindByIdProductController(findByIdProductUseCase)

export { findByIdProductController, findByIdProductUseCase }