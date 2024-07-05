import { SupplierRepository } from "../../repositories/implementations/SupplierRepository"
import { UpdateSupplierController } from "./updateSupplierController"
import { UpdateSupplierUseCase } from "./updateSupplierUseCase"

const supplierRepository = new SupplierRepository()

const updateSupplierUseCase = new UpdateSupplierUseCase(supplierRepository)

const updateSupplierController = new UpdateSupplierController(updateSupplierUseCase)

export { updateSupplierUseCase, updateSupplierController }