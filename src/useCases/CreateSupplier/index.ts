import { SequelizeSupplierRepository } from "../../repositories/implementations/SequelizeSupplierRepository";
import { CreateSupplierUseCase } from "./createSupplierUseCase";
import { CreateSupplierController } from "./createSupplierController";
import { SequelizeScopeError } from "sequelize";

const sequelizeSupplierRepository = new SequelizeSupplierRepository()
const createSupplierUseCase = new CreateSupplierUseCase(sequelizeSupplierRepository)
export const createSupplierController = new CreateSupplierController(createSupplierUseCase)
