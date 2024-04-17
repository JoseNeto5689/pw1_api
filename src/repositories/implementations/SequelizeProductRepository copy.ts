import { Product } from "../../types/Product"
import { IProductRepository } from "../IProductRepository"
import sequelize from "../../database/connection"

export class SequelizeProductRepository implements IProductRepository {

    async save(product: Product): Promise<void> {
        sequelize.models.Product
    }

}