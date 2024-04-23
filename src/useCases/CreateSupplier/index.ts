import { SupplierRepository } from "../../repositories/implementations/SupplierRepository"
import { CreateSupplierUseCase } from "./createSupplierUseCase"
import { CreateSupplierController } from "./createSupplierController"


const supplierRepository = new SupplierRepository()

const createSupplierUseCase = new CreateSupplierUseCase(supplierRepository)

const createSupplierController = new CreateSupplierController(createSupplierUseCase)

export { createSupplierUseCase, createSupplierController}
