import { Supplier } from "../types/Supplier"

export interface ISupplierRepository {
    save(supplier:Supplier): Promise<void>
    findAll(): Promise<Supplier[]>
    findById(id: string): Promise<Supplier | null>
}