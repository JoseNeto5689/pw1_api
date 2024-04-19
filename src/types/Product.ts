export class Product {
    public readonly bar_code!: string //Observar depois tipo correto para código de barras
    public name!: string
    public description: string | undefined
    public price!: number
    public batch: string | undefined
    public manufacturing_date: Date | undefined
    public expiration_date: Date | undefined
    public image: Blob | undefined //Observar depois tipo correto para imagem
    public ammount!: number
    public type!: string
    public supplier_id!: string

    constructor(props: Omit<Product, "bar_code">, bar_code?: string) {
        Object.assign(this, props)

        if(bar_code){
            this.bar_code = bar_code
        }
    }
}