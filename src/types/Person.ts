export class Person {
    public id!: string
    public name!: string
    public address: string | undefined
    public type!: string
    public contact: string[] | undefined

    constructor(props: Omit<Person, "id">) {
        Object.assign(this, props)
    }
}