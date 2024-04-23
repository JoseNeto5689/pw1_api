import { SupplierRepository } from "../../repositories/implementations/SupplierRepository"
import { FindAllSuppliersUseCase } from "./findAllSupplierUseCase"
import { FindAllSupplierController } from "./findAllSuppliersController"

const supplierRepository = new SupplierRepository()
const findAllSuppliersUseCase = new FindAllSuppliersUseCase(supplierRepository)
const findAllSuppliersController = new FindAllSupplierController(findAllSuppliersUseCase)

export { findAllSuppliersController, findAllSuppliersUseCase}