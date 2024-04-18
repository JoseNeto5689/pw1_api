import { SequelizeProductRepository } from "../../repositories/implementations/SequelizeProductRepository"
import { CreateProductUseCase } from "./createProductUseCase"
import { CreateProductController } from "./createProductController"

const sequelizeProductRepository = new SequelizeProductRepository()

const createProductUseCase = new CreateProductUseCase(sequelizeProductRepository)

const createProductController = new CreateProductController(createProductUseCase)

export { createProductUseCase, createProductController }
