import { Request, Response } from "express"
import { DeleteProductUseCase } from "./deleteProductUseCase"

export class DeleteProductController{
    
    constructor(
        private deleteProductUseCase: DeleteProductUseCase,
    ) {}

    async handle (request: Request, reponse: Response) {
        const { id } = request.params
        await this.deleteProductUseCase.execute(id)
        return reponse.json("ok")
        
    }
}