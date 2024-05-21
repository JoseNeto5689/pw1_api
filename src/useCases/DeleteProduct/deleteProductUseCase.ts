import { IProductRepository } from "../../repositories/IProductRepository"

export class DeleteProductUseCase {

    constructor(
        private productRepository: IProductRepository
    ) {}

    async execute(barcode: string) {
        await this.productRepository.remove(barcode)
    }
}