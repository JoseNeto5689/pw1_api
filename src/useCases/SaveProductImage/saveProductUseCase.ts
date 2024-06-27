import { IProductRepository } from "../../repositories/IProductRepository"
import { Product } from "../../types/Product"


export class SaveImageUseCase {

    constructor(
        private productRepository: IProductRepository
    ) {}

    async execute(id: string, buffer: Blob) {
        const product = await this.productRepository.findById(id) as Product
        const newProduct = {
            ...product,
            image: buffer
        }
        console.log(newProduct)
        await this.productRepository.update(newProduct, id)
        return
    }
}

