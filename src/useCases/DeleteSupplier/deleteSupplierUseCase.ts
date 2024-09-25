import { ISupplierRepository } from "../../repositories/ISupplierRepository"

export class DeleteSupplierUseCase {

    constructor(
        private supplierRepository: ISupplierRepository
    ) {}

    async execute(id: string): Promise<string> {
        await this.supplierRepository.remove(id)
        return "Supplier deleted successfully"
    }
}
