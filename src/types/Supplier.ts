export class Supplier {
    public id!: string
    public name!: string
    public geolocalization: string | undefined
    public image: Blob | undefined

    constructor(props: Omit<Supplier, "id">) {
        Object.assign(this, props)
    }
}