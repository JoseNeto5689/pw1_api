import { ISupplyRepository } from "../../repositories/ISupplyRepository"
import { Supply } from "../../types/Supply"
import { IUpdateSupplyRequestDTO } from "./updateSupplyDTO"

export class UpdateSupplyUseCase {
    constructor(
        private supplyRepository: ISupplyRepository
    ) {}

    async execute(data: IUpdateSupplyRequestDTO, id: string): Promise<void> {
        const supply = await this.supplyRepository.findById(id) as Supply
        const newSupply: Supply = {
            id: id,
            product_id: data.product_id || supply.product_id,
            supplier_id: data.supplier_id || supply.supplier_id,
            person_id: data.person_id || supply.person_id
        }

        await this.supplyRepository.update(newSupply, id)
    }
}