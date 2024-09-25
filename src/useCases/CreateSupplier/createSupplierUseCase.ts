import { ISupplierRepository } from "../../repositories/ISupplierRepository"
import { Supplier } from "../../types/Supplier"
//import { ISupplierRequestDTO } from "./createSupplierDTO"

export class CreateSupplierUseCase {

    constructor(
        private supplierRepository: ISupplierRepository,
        private hash: any
    ) {}

    async execute(data: any) {

        if (!data.password) {
            throw Error('Password não foi informado');
        }
        
        if (data.password.length < 8) {
            throw Error('Senhar com tamanho menor que 8 caracteres');
        }

        if (data.password === "") {
            throw Error('Senhar está vazia');
        }

        if (!data.name) {
            throw Error('Nome não foi informado');
        }

        const password = await this.hash(data.password, 8)

        const supplier = new Supplier({
            ...data,
            password
        })

        return await this.supplierRepository.save(supplier)
    }
}