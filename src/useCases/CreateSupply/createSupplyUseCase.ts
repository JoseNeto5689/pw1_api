import { Supply } from "../../types/Supply"
import { ISupplyRepository } from "../../repositories/ISupplyRepository"
import { IProductRepository } from "../../repositories/IProductRepository"
//import { ISupplyRequestDTO } from "./createSupplyDTO"

export class CreateSupplyUseCase {

    constructor(
        private supplyRepository: ISupplyRepository,
        private productRepository: IProductRepository
    ) {}

    async execute(data: any) {

        if (!data.product_id) {
            throw new Error("product_id não informado")
        }

        if (!data.supplier_id) {
            throw new Error("supplier_id não informado")
        }

        if (!data.person_id) {
            throw new Error("person_id não informado")
        }

        const supply = new Supply(data)


        const product = await this.productRepository.findById(data.product_id)


        if(!product || product.ammount == 0){
            throw new Error("Produto em falta")
        }

        product.ammount = product.ammount - 1

        console.log(product.ammount)

        await this.productRepository.update({ammount: product.ammount}, data.product_id)

        return await this.supplyRepository.save(supply)
    }
}