import { Product } from "../../types/Product"
import { IProductRepository } from "../IProductRepository"
import sequelize from "../../database/connection"
import Supplier from "../../database/models/Supplier"
import { ISupplierRepository } from "../ISupplierRepository"

export class SequelizeSupplierRepository implements ISupplierRepository {

    async save(supplier: Supplier): Promise<void> {
        sequelize.models.Supplier.create({
            name: supplier.name,
            image: supplier.image,
            geolocalization: supplier.geolocalization
        })
    }

}