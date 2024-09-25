import { SupplierRepository } from "../../repositories/implementations/SupplierRepository"
import { CreateSupplierUseCase } from "./createSupplierUseCase"
import { CreateSupplierController } from "./createSupplierController"
import sequelize from "../../database/index"
import * as bcrypt from "bcryptjs"

const supplierRepository = new SupplierRepository(sequelize)

const createSupplierUseCase = new CreateSupplierUseCase(supplierRepository, bcrypt.hash)

const createSupplierController = new CreateSupplierController(createSupplierUseCase)

export { createSupplierUseCase, createSupplierController}
