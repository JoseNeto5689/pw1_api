import sequelize from "../../database/connection"
import Supplier from "../../database/models/Supplier"
import { ISupplierRepository } from "../ISupplierRepository"

export class SupplierRepository implements ISupplierRepository {

    async save(supplier: Supplier): Promise<void> {
        await sequelize.models.Supplier.create({
            ...supplier
        })
    }

}