import { SupplierRepository } from "../../repositories/implementations/SupplierRepository"

import { ChangePasswordUseCase } from "./changePasswordUseCase"

import { ChangePasswordController } from "./changePasswordController"


const supplierRepository = new SupplierRepository()

const changePasswordUseCase = new ChangePasswordUseCase(supplierRepository)

const changePasswordController = new ChangePasswordController(changePasswordUseCase)

export { changePasswordUseCase, changePasswordController }