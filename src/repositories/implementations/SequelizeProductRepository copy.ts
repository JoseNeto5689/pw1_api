import { Product } from "../../types/Product"
import { IProductRepository } from "../IProductRepository"

export class SequelizeProductRepository implements IProductRepository {
    save(product: Product): Promise<void> {
        console.log(product)
        throw new Error("Method not implemented.")
    }

    /*async save(product: Product): Promise<void> {
        sequelize.models.Product
    }*/

}