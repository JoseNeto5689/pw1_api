import { SupplyRepository } from "../../repositories/implementations/SupplyRepository"
import { FindAllSuppliesUseCase } from "./findAllSuppliesUseCase"
import { FindAllSuppliesController } from "./findAllSuppliesController"

const supplyRepository = new SupplyRepository()
const findAllSuppliesUseCase = new FindAllSuppliesUseCase(supplyRepository)
const findAllSuppliesController = new FindAllSuppliesController(findAllSuppliesUseCase)

export { findAllSuppliesController, findAllSuppliesUseCase }