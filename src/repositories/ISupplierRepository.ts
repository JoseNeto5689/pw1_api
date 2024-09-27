import { Supplier } from "../types/Supplier"

export interface ISupplierRepository {
    save(supplier:Supplier): Promise<unknown>
    findAll(): Promise<Supplier[]>
    findById(id: string): Promise<Supplier | null>
    remove(id: string): Promise<void>
    update(supplier: any, id: string): Promise<unknown>
    findByEmail(email: string): Promise<Supplier | null>
}