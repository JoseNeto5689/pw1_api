import { SupplyRepository } from "../../repositories/implementations/SupplyRepository"
import { CreateSupplyController } from "./createSupllyController"
import { CreateSupplyUseCase } from "./createSupplyUseCase"
import sequelize from "../../database/index"
import { ProductRepository } from "../../repositories/implementations/ProductRepository"

const productRepository = new ProductRepository(sequelize)

const supplyRepository = new SupplyRepository(sequelize)

const createSupplyUseCase = new CreateSupplyUseCase(supplyRepository, productRepository)

const createSupplyController = new CreateSupplyController(createSupplyUseCase)

export { createSupplyUseCase, createSupplyController}