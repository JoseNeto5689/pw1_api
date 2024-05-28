import { Request, Response } from "express"
import { CreateSupplierUseCase } from "./createSupplierUseCase"
import { CreateSupplierDTO } from "./createSupplierDTO"
import { z } from "zod"

export class CreateSupplierController {
    
    constructor(
        private createSupplierUseCase: CreateSupplierUseCase,
    ) {}

    async handle (request: Request, reponse: Response) {
        try {
            CreateSupplierDTO.parse(request.body)

            const data:z.infer<typeof CreateSupplierDTO> = request.body
            
            await this.createSupplierUseCase.execute({
                ...data
            })

            return reponse.json("ok")
        }
        catch(err:any){
            return reponse.status(400).json({error: err.issues.map((issue:z.ZodIssue) => issue.path[0] + ", " + issue.message)})
        }
    }
}