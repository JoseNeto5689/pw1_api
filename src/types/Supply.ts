export class Supply {
    public readonly id!: string
    public product_id!: string
    public supplier_id!: string
    public person_id!: string
    
    constructor(props: Omit<Supply, "id">, id?: string) {
        Object.assign(this, props)
        if (id) {
            this.id = id
        }
    }
}