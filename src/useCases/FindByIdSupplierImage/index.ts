import { SupplierRepository } from "../../repositories/implementations/SupplierRepository"
import { FindByIdSupplierImageController } from "./findByIdSupplierController"
import { FindByIdSupplierUseCase } from "./findByIdSupplierUseCase"

const supplierRepository = new SupplierRepository()

const findByIdSupplierUseCase = new FindByIdSupplierUseCase(supplierRepository)

const findByIdSupplierImageController = new FindByIdSupplierImageController(findByIdSupplierUseCase)

export { findByIdSupplierImageController, findByIdSupplierUseCase}