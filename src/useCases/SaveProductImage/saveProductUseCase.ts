import { IProductRepository } from "../../repositories/IProductRepository"
import { Product } from "../../types/Product"


export class SaveImageUseCase {

    constructor(
        private productRepository: IProductRepository
    ) {}

    async execute(id: string, image: string) {
        const product = await this.productRepository.findById(id) as Product
        const newProduct = {
            ...product,
            image
        }
        await this.productRepository.update(newProduct, id)
        return
    }
}

