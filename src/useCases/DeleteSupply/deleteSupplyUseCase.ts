import { IProductRepository } from "../../repositories/IProductRepository"
import { ISupplyRepository } from "../../repositories/ISupplyRepository"

export class DeleteSupplyUseCase {
    constructor(
        private supplyRepository: ISupplyRepository,
        private productRepository: IProductRepository
    ) {}

    async execute(id: string): Promise<string> {

        const supply = await this.supplyRepository.findById(id)

        if (!supply) {
            throw new Error("Supply not found")
        }

        const product = await this.productRepository.findById(supply.product_id)

        if (!product) {
            throw new Error("Some error occurred")
        }

        product.ammount = product.ammount + 1

        await this.productRepository.update({ammount: product.ammount}, product.barcode)

        await this.supplyRepository.remove(id)
        return "Supply deleted successfully"
    }
}