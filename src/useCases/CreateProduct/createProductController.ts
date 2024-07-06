import { Request, Response } from "express"
import { CreateProductUseCase } from "./createProductUseCase"
import { CreateProductDTO } from "./createProductDTO"
import { z } from "zod"
import { generateMessageArray } from "../../utils/zodError"

export class CreateProductController{
    
    constructor(
        private createProductUseCase: CreateProductUseCase,
    ) {}

    async handle (request: Request, response: Response) {
        try {
            CreateProductDTO.parse(request.body)

            const data:z.infer<typeof CreateProductDTO> = request.body

            await this.createProductUseCase.execute({
                ...data
            })

            return response.json("ok")
        }
        catch(err:any){
            if(err.issues) {
                const message = generateMessageArray(err)
                return response.status(400).json({errors: message}) 
            }
            return response.status(400).json({error: err.message})
        }
    }
}