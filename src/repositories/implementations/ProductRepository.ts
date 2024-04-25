import sequelize from "../../database/connection"
import { Product } from "../../types/Product"
import { IProductRepository } from "../IProductRepository"

export class ProductRepository implements IProductRepository {
    async findAll(): Promise<unknown> {
        const products = await sequelize.models.Product.findAll()
        return products
    }
    
    async save(product: Product): Promise<void> {
        await sequelize.models.Product.create({
            ...product
        })
    }
}