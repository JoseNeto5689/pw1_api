import { ISupplierRepository } from "../../repositories/ISupplierRepository"
import { Supplier } from "../../types/Supplier"


export class SaveImageUseCase {

    constructor(
        private supplierRepository: ISupplierRepository
    ) {}

    async execute(id: string, buffer: string) {
        const supplier = await this.supplierRepository.findById(id) as Supplier
        const newProduct = {
            ...supplier,
            image: buffer
        }

        if (!supplier) {
            throw new Error("Supplier is not found")
        }

        await this.supplierRepository.update(newProduct, id)
        return
    }
}