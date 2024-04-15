import { IProductRepository } from "../IProductRepository"
export class DatabaseBasicRepository implements IProductRepository {
    async findOne(): Promise<Record<string, never>> {
        return {}
    }
    async findAll(): Promise<unknown[]> {
        return []
    }

    
}