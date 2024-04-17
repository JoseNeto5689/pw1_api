"use strict"
import { ISupplierRepository } from "../../repositories/ISupplierRepository"
import { Supplier } from "../../types/Supplier"
import { ISupplierRequestDTO } from "./createSupplierDTO"

export class CreateSupplierUseCase {

    constructor(
        private supplierRepository: ISupplierRepository
    ) {}

    async execute(data: ISupplierRequestDTO) {
        const supplier = new Supplier(data)
        await this.supplierRepository.save(supplier)
    }
}