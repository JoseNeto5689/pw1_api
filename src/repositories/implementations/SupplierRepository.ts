import sequelize from "../../database/connection"
import { Supplier } from "../../types/Supplier"
import { ISupplierRepository } from "../ISupplierRepository"

export class SupplierRepository implements ISupplierRepository {

    async findById(id: string): Promise<Supplier | null> {
        const result: Supplier | null = await sequelize.models.Supplier.findByPk(id) as Supplier | null
        return result
    }
    
    async findAll(): Promise<Supplier[]> {
        const result = await sequelize.models.Supplier.findAll()
        const suppliers: Supplier[] = []
        result.forEach((supplier: any) => {
            suppliers.push(supplier)
        })
        return suppliers
    }

    async save(supplier: Supplier): Promise<void> {
        await sequelize.models.Supplier.create({
            ...supplier
        })
    }

    async remove(id: string): Promise<void> {
        await sequelize.models.Supplier.destroy({
            where: {
                id
            }
        })
    }

    async update(supplier: Supplier, id: string): Promise<void> {
        await sequelize.models.Supplier.update({
            ...supplier
        }, {
            where: {
                id
            }
        })
    }

}