import { Supply } from "../types/Supply"

export interface ISupplyRepository {
    save(supply: Supply): Promise<void>
}