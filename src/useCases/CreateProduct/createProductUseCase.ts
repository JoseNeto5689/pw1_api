import { IProductRepository } from "../../repositories/IProductRepository"
import { Product } from "../../types/Product"
//import { IProductRequestDTO } from "./createProductDTO"

export class CreateProductUseCase {

    constructor(
        private productRepository: IProductRepository
    ) {}

    async execute(data: any) {

        if (!data.supplier_id) {
            throw Error('Supplier id não informado');
        }

        if (data.name.lenght < 4) {
            throw Error('Nome muito curto');
        }

        const product = new Product(data)
        return await this.productRepository.save(product)
    }
}