import { SequelizeSupplierRepository } from "../../repositories/implementations/SequelizeSupplierRepository"
import { CreateSupplierUseCase } from "./createSupplierUseCase"
import { CreateSupplierController } from "./createSupplierController"


const sequelizeSupplierRepository = new SequelizeSupplierRepository()

const createSupplierUseCase = new CreateSupplierUseCase(sequelizeSupplierRepository)

const createSupplierController = new CreateSupplierController(createSupplierUseCase)

export { createSupplierUseCase, createSupplierController}
