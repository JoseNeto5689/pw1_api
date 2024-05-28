import { Request, Response } from "express"
import { CreateSupplyDTO } from "./createSupplyDTO"
import { CreateSupplyUseCase } from "./createSupplyUseCase"
import { z } from "zod"

export class CreateSupplyController {
    constructor(
        private createSupplyUseCase: CreateSupplyUseCase
    ) {}
    
    async handle (request: Request, reponse: Response) {
        try {
            CreateSupplyDTO.parse(request.body)

            const data:z.infer<typeof CreateSupplyDTO> = request.body
            await this.createSupplyUseCase.execute({
                ...data
            })
            return reponse.json("ok")
        }
        catch(err:any){
            return reponse.status(400).json({error: err.issues.map((issue:z.ZodIssue) => issue.path[0] + ", " + issue.message)})
        }
        
    }
}