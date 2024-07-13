import { ProductRepository } from "../../repositories/implementations/ProductRepository"
import { FindByIdProductImageController } from "./findByIdImageController"
import { FindByIdProductUseCase } from "./findByIdImageUseCase"

const productRepository = new ProductRepository()

const findByIdSupplierUseCase = new FindByIdProductUseCase(productRepository)

const findByIdProductImageController = new FindByIdProductImageController(findByIdSupplierUseCase)

export { findByIdProductImageController, findByIdSupplierUseCase}