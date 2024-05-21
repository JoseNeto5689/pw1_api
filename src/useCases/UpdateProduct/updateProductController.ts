import { Request, Response } from "express"
import { UpdateProductUseCase } from "./updateProductUseCase"
import { IUpdateProductRequestDTO } from "./updateProductDTO"

export class CreateProductController{
    
    constructor(
        private updateProductUseCase: UpdateProductUseCase,
    ) {}

    async handle (request: Request, reponse: Response) {

        const data:IUpdateProductRequestDTO = request.body
        const { id } = request.params
        await this.updateProductUseCase.execute({
            ...data
        }, id)

        return reponse.json("ok")
        
    }
}