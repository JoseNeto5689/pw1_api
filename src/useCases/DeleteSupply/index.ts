import { SupplyRepository } from "../../repositories/implementations/SupplyRepository"
import { DeleteSupplyController } from "./deleteSupplyController"
import { DeleteSupplyUseCase } from "./deleteSupplyUseCase"
import sequelize from "../../database/index"
import { ProductRepository } from "../../repositories/implementations/ProductRepository"

const productRepository = new ProductRepository(sequelize)
const supplyRepository = new SupplyRepository(sequelize)
const deleteSupplyUseCase = new DeleteSupplyUseCase(supplyRepository, productRepository)
const deleteSupplyController = new DeleteSupplyController(deleteSupplyUseCase)

export { deleteSupplyController, deleteSupplyUseCase }