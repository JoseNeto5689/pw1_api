import { SupplierRepository } from "../../repositories/implementations/SupplierRepository";
import { SaveImageController } from "./saveSupplierController";
import { SaveImageUseCase } from "./saveSupplierUseCase";

const supplierRepository = new SupplierRepository()
const saveImageSupplier = new SaveImageUseCase(supplierRepository)
const saveImageController = new SaveImageController(saveImageSupplier)

export {saveImageController}