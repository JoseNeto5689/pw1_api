import { ISupplierRepository } from "../../repositories/ISupplierRepository"
import { Supplier } from "../../types/Supplier"
import { IUpdateSupplierRequestDTO } from "./updateSupplierDTO"

export class UpdateSupplierUseCase {

    constructor(
        private supplierRepository: ISupplierRepository
    ) {}

    async execute(data: IUpdateSupplierRequestDTO, id: string) {
        const supplier = await this.supplierRepository.findById(id) as Supplier
        const newSupplier: Supplier = {
            id: supplier.id,
            name: data.name || supplier.name,
            geolocalization: data.geolocalization || supplier.geolocalization,
            image: data.image || supplier.image
        }

        await this.supplierRepository.update(newSupplier, id)
    }
}