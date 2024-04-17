import { Supplier } from "../types/Supplier";

export interface ISupplierRepository {
    save(supplier:Supplier): Promise<void>
}