import { SupplierRepository } from "../../repositories/implementations/SupplierRepository"
import { CreateSupplierController } from "./updateSupplierController"
import { UpdateSupplierUseCase } from "./updateSupplierUseCase"

const supplierRepository = new SupplierRepository()

const updateSupplierUseCase = new UpdateSupplierUseCase(supplierRepository)

const updateSupplierController = new CreateSupplierController(updateSupplierUseCase)

export { updateSupplierUseCase, updateSupplierController }