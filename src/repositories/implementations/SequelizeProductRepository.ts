import sequelize from "../../database/connection"
import { Product } from "../../types/Product"
import { IProductRepository } from "../IProductRepository"

export class SequelizeProductRepository implements IProductRepository {
    async save(product: Product): Promise<void> {
        await sequelize.models.Product.create({
            name: product.name,
            description: product.description,
            price: product.price,
            batch: product.batch,
            manufacturing_date: product.manufacturing_date,
            expiration_date: product.expiration_date,
            image: product.image,
            ammount: product.ammount,
            type: product.type,
            supplier_id: product.supplier_id
        })
    }
}