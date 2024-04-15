export interface IProductRepository {
    findAll(): Promise<unknown[]>;
    findOne(): Promise<Record<string, never>>
}