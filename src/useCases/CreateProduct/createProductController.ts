import { Request, Response } from "express"
import { CreateProductUseCase } from "./createProductUseCase"
import { CreateProductDTO } from "./createProductDTO"
import { z } from "zod"

export class CreateProductController{
    
    constructor(
        private createProductUseCase: CreateProductUseCase,
    ) {}

    async handle (request: Request, reponse: Response) {
        try {
            CreateProductDTO.parse(request.body)

            const data:z.infer<typeof CreateProductDTO> = request.body

            await this.createProductUseCase.execute({
                ...data
            })

            return reponse.json("ok")
        }
        catch(err:any){
            return reponse.status(400).json({error: err.issues.map((issue:z.ZodIssue) => issue.path[0] + ", " + issue.message)})
        }
    }
}