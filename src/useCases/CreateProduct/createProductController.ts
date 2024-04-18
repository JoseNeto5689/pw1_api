import { Request, Response } from "express"
import { CreateProductUseCase } from "./createProductUseCase"
import { IProductRequestDTO } from "./createProductDTO"

export class CreateProductController{
    
    constructor(
        private createProductUseCase: CreateProductUseCase,
    ) {}

    async handle (request: Request, reponse: Response) {

        const {name, description, price, batch, manufacturing_date, 
            expiration_date, image, ammount, type, supplier_id}:IProductRequestDTO
         = request.body
        await this.createProductUseCase.execute({
            name,
            description,
            price,
            batch,
            manufacturing_date,
            expiration_date,
            image,
            ammount,
            type,
            supplier_id,
        })

        return reponse.json("ok")
    }
}