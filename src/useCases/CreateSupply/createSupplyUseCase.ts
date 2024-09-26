import { Supply } from "../../types/Supply"
import { ISupplyRepository } from "../../repositories/ISupplyRepository"
//import { ISupplyRequestDTO } from "./createSupplyDTO"

export class CreateSupplyUseCase {

    constructor(
        private supplyRepository: ISupplyRepository
    ) {}

    async execute(data: any) {

        if (!data.product_id) {
            throw new Error("product_id não informado")
        }

        if (!data.supplier_id) {
            throw new Error("supplier_id não informado")
        }

        if (!data.person_id) {
            throw new Error("person_id não informado")
        }

        const supply = new Supply(data)

        return await this.supplyRepository.save(supply)
    }
}