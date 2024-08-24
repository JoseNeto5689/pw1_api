import AuthenticateSupplier from "./authenticate"
import { SupplierRepository } from "../../repositories/implementations/SupplierRepository"
import sequelize from "../../database/index"

const supplierRepository = new SupplierRepository(sequelize)

const authenticateSupplier = new AuthenticateSupplier(supplierRepository)

export { authenticateSupplier }