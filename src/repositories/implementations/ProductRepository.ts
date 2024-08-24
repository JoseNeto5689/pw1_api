import sequelize from "../../database/index"
import { Product } from "../../types/Product"
import { IProductRepository } from "../IProductRepository"

export class ProductRepository implements IProductRepository {
    constructor(private sequelize: any) {}

    async findBySupplierId(supplier_id: string): Promise<Product[]> {
        const result = await this.sequelize.models.Product.findAll({
            where: {
                supplier_id
            }
        })
        const products: Product[] = []
        result.forEach((product: any) => {
            products.push(product)
        })
        return products
    }
    
    async findById(id: string): Promise<Product | null> {
        const result: Product | null = await this.sequelize.models.Product.findByPk(id) as Product | null
        return result
    }

    async findAll(): Promise<Product[]> {
        const result = await this.sequelize.models.Product.findAll()
        const products: Product[] = []
        result.forEach((product: any) => {
            products.push(product)
        })
        return products
    }
    
    async save(product: Product): Promise<unknown> {
        
        const productCreated = await this.sequelize.models.Product.create({
            ...product
        })

        return productCreated
    }

    async remove(barcode: string): Promise<void> {
        await this.sequelize.models.Product.destroy({
            where: {
                barcode
            }
        })
    }

    async update(product: Product, barcode: string): Promise<unknown> {
        const productUpdated = await this.sequelize.models.Product.update({
            ...product
        }, {
            where: {
                barcode
            }
        })

        return productUpdated
    }
}