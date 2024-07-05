export class Supplier {
    public readonly id!: string
    public name!: string
    public geolocalization: object | undefined
    public image: string | undefined

    constructor(props: Omit<Supplier, "id">, id?: string) {
        Object.assign(this, props)
        if(id){
            this.id = id
        }
    }
}