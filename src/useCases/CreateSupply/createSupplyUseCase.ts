import { Supply } from "../../types/Supply"
import { ISupplyRepository } from "../../repositories/ISupplyRepository"
import { ISupplyRequestDTO } from "./createSupplyDTO"

export class CreateSupplyUseCase {

    constructor(
        private supplyRepository: ISupplyRepository
    ) {}

    async execute(data: ISupplyRequestDTO) {
        const supply = new Supply(data)
        await this.supplyRepository.save(supply)
    }
}