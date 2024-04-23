import { SupplyRepository } from "../../repositories/implementations/SupplyRepository"
import { CreateSupplyController } from "./createSupllyController"
import { CreateSupplyUseCase } from "./createSupplyUseCase"


const supplyRepository = new SupplyRepository()

const createSupplyUseCase = new CreateSupplyUseCase(supplyRepository)

const createSupplyController = new CreateSupplyController(createSupplyUseCase)

export { createSupplyUseCase, createSupplyController}