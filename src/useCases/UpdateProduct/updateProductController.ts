import { Request, Response } from "express"
import { UpdateProductUseCase } from "./updateProductUseCase"
import { UpdateProductDTO } from "./updateProductDTO"
import { z } from "zod"
import { generateMessageArray } from "../../utils/zodError"

export class CreateProductController{
    
    constructor(
        private updateProductUseCase: UpdateProductUseCase,
    ) {}

    async handle (request: Request, response: Response) {
        try {
            UpdateProductDTO.parse(request.body)
            const data:z.infer<typeof UpdateProductDTO> = request.body

            const { id } = request.params
            await this.updateProductUseCase.execute({
                ...data
            }, id)

            return response.json("ok")
        }
        catch (err:any) {
            const message = generateMessageArray(err)
            return response.status(400).json({errors: message}) 
        }
    }
}