export class Product {
    public id!: string
    public name!: string
    public description: string | undefined

    constructor(props: Omit<Product, "id">) {
        Object.assign(this, props)
    }
}