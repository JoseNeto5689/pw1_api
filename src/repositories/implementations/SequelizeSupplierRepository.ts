import sequelize from "../../database/connection"
import Supplier from "../../database/models/Supplier"
import { ISupplierRepository } from "../ISupplierRepository"

export class SequelizeSupplierRepository implements ISupplierRepository {

    async save(supplier: Supplier): Promise<void> {
        await sequelize.models.Supplier.create({
            name: supplier.name,
            image: supplier.image,
            geolocalization: supplier.geolocalization
        })
    }

}