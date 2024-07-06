import { Request, Response } from "express"
import { CreateSupplierUseCase } from "./createSupplierUseCase"
import { CreateSupplierDTO } from "./createSupplierDTO"
import { z } from "zod"
import { generateMessageArray } from "../../utils/zodError"

export class CreateSupplierController {
    
    constructor(
        private createSupplierUseCase: CreateSupplierUseCase,
    ) {}

    async handle (request: Request, response: Response) {
        try {
            CreateSupplierDTO.parse(request.body)

            const data:z.infer<typeof CreateSupplierDTO> = request.body
            
            await this.createSupplierUseCase.execute({
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