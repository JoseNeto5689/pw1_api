import { ISupplierRepository } from "../../repositories/ISupplierRepository"
import { Supplier } from "../../types/Supplier"
import bcrypt from "bcryptjs"
//import { ISupplierRequestDTO } from "./createSupplierDTO"

export class CreateSupplierUseCase {

    constructor(
        private supplierRepository: ISupplierRepository
    ) {}

    async execute(data: any) {

        const password = await bcrypt.hash(data.password, 8)

        const supplier = new Supplier({
            ...data,
            password
        })

        return await this.supplierRepository.save(supplier)
    }
}