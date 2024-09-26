import { ISupplyRepository } from "../../repositories/ISupplyRepository"

export class DeleteSupplyUseCase {
    constructor(
        private supplyRepository: ISupplyRepository
    ) {}

    async execute(id: string): Promise<string> {
        await this.supplyRepository.remove(id)
        return "Supply deleted successfully"
    }
}