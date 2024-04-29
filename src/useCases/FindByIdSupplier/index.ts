import { SupplierRepository } from "../../repositories/implementations/SupplierRepository"
import { FindByIdSupplierController } from "./findByIdSupplierController"
import { FindByIdSupplierUseCase } from "./findByIdSupplierUseCase"

const supplierRepository = new SupplierRepository()

const findByIdSupplierUseCase = new FindByIdSupplierUseCase(supplierRepository)

const findByIdSupplierController = new FindByIdSupplierController(findByIdSupplierUseCase)

export { findByIdSupplierController, findByIdSupplierUseCase}