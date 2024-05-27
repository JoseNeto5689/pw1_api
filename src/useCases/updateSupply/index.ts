import { SupplyRepository } from '../../repositories/implementations/SupplyRepository'
import { UpdateSupplyController } from './updateSupplyController'
import { UpdateSupplyUseCase } from './updateSupplyUseCase'

const supplyRepository = new SupplyRepository()
const updateSupplyUseCase = new UpdateSupplyUseCase(supplyRepository)
const updateSupplyController = new UpdateSupplyController(updateSupplyUseCase)

export { updateSupplyUseCase, updateSupplyController }