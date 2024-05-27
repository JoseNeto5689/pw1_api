import { Supply } from "../types/Supply"

export interface ISupplyRepository {
    save(supply: Supply): Promise<void>
    findAll(): Promise<Supply[]>
    findById(id: string): Promise<Supply | null>
    remove(id: string): Promise<void>
    update(supply: Supply, id: string): Promise<void>
}