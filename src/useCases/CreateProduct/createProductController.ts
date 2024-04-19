import { Request, Response } from "express"
import { CreateProductUseCase } from "./createProductUseCase"
import { IProductRequestDTO } from "./createProductDTO"

export class CreateProductController{
    
    constructor(
        private createProductUseCase: CreateProductUseCase,
    ) {}

    async handle (request: Request, reponse: Response) {

        const data:IProductRequestDTO = request.body

        await this.createProductUseCase.execute({
            ...data
        })

        return reponse.json("ok")
        
    }
}