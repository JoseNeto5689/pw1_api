import { SupplierRepository } from "../../repositories/implementations/SupplierRepository"
import { DeleteSupplierController } from "./deleteSupplierController"
import { DeleteSupplierUseCase } from "./deleteSupplierUseCase"

const supplierRepository = new SupplierRepository()
const deleteSupplierUseCase = new DeleteSupplierUseCase(supplierRepository)
const deleteSupplierController = new DeleteSupplierController(deleteSupplierUseCase)

export { deleteSupplierController, deleteSupplierUseCase } 