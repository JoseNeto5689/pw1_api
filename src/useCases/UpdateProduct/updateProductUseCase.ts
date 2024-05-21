import { IProductRepository } from "../../repositories/IProductRepository" 
import { Product } from "../../types/Product" 
import { IUpdateProductRequestDTO } from "./updateProductDTO"

export class UpdateProductUseCase {

    constructor(
        private productRepository: IProductRepository
    ) {}

    
    async execute(data: IUpdateProductRequestDTO, id: string) {
        const product = await this.productRepository.findById(id) as Product
        const newProduct: Product = {
            barcode: product.barcode,
            name: data.name || product.name,
            description: data.description || product.description,
            price: data.price || product.price,
            batch: data.batch || product.batch,
            manufacturing_date: data.manufacturing_date || product.manufacturing_date,
            expiration_date: data.expiration_date || product.expiration_date,
            image: data.image || product.image,
            ammount: data.ammount || product.ammount,
            type: data.type || product.type,
            supplier_id: data.supplier_id || product.supplier_id
        }

        await this.productRepository.update(newProduct, id)
    }
}