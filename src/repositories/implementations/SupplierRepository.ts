import { Supplier } from "../../types/Supplier"
import { ISupplierRepository } from "../ISupplierRepository"

export class SupplierRepository implements ISupplierRepository {
    constructor(private sequelize: any) {}
    async findByEmail(email: string): Promise<Supplier | null> {

        const result: Supplier | null = await this.sequelize.models.Supplier.findOne({
            where: {
                email
            }
        }) as Supplier | null

        return result
    }

    async findById(id: string): Promise<Supplier | null> {
        const result: Supplier | null = await this.sequelize.models.Supplier.findByPk(id) as Supplier | null
        return result
    }
    
    async findAll(): Promise<Supplier[]> {
        const result = await this.sequelize.models.Supplier.findAll()
        const suppliers: Supplier[] = []
        result.forEach((supplier: any) => {
            suppliers.push(supplier)
        })
        return suppliers
    }

    async save(supplier: Supplier): Promise<unknown> {
        const supplierCreated = await this.sequelize.models.Supplier.create({
            ...supplier
        })

        return supplierCreated
    }

    async remove(id: string): Promise<void> {
        await this.sequelize.models.Supplier.destroy({
            where: {
                id
            }
        })
    }

    async update(supplier: any, id: string): Promise<unknown> {
        
        const supplierUpdated = await this.sequelize.models.Supplier.update({
            ...supplier
        }, {
            where: {
                id
            }
        })

        return supplierUpdated
    }

}