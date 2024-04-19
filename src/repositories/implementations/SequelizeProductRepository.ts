import sequelize from "../../database/connection"
import { Product } from "../../types/Product"
import { IProductRepository } from "../IProductRepository"

export class SequelizeProductRepository implements IProductRepository {
    async save(product: Product): Promise<void> {
        await sequelize.models.Product.create({
            ...product
        })
    }
}