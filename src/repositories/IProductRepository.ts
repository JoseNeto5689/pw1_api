import { Product } from "../types/Product"

export interface IProductRepository {
    save(product:Product): Promise<void>
    findAll(): Promise<Product[]>
    findById(id: string): Promise<Product | null>
}