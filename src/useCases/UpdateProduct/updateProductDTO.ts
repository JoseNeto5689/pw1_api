export interface IUpdateProductRequestDTO {
    name: string
    description: string | undefined
    price: number
    batch: string | undefined
    manufacturing_date: Date | undefined
    expiration_date: Date | undefined
    image: string | undefined
    ammount: number
    type: string
    supplier_id: string
}