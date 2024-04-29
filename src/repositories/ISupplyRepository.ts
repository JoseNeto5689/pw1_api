import { Supply } from "../types/Supply"

export interface ISupplyRepository {
    save(supply: Supply): Promise<void>
    findAll(): Promise<Supply[]>
    findById(id: string): Promise<Supply | null>
}