import { ProductRepository } from "../../repositories/implementations/ProductRepository"
import { FindAllProductsUseCase } from "./findAllProductsUsecase"
import { FindAllProductsController } from "./findAllProductsController"

const productRepository = new ProductRepository()
const findAllProductsUseCase = new FindAllProductsUseCase(productRepository)
const findAllProductsController = new FindAllProductsController(findAllProductsUseCase)

export { findAllProductsController, findAllProductsUseCase }