import { Product } from "../types/Product"

export interface IProductRepository {
    save(product:Product): Promise<void>
    findAll(): Promise<unknown>
}