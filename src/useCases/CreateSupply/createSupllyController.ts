import { Request, Response } from "express"
import { CreateSupplyDTO } from "./createSupplyDTO"
import { CreateSupplyUseCase } from "./createSupplyUseCase"
import { z } from "zod"
import { generateMessageArray } from "../../utils/zodError"

export class CreateSupplyController {
    constructor(
        private createSupplyUseCase: CreateSupplyUseCase
    ) {}
    
    async handle (request: Request, response: Response) {
        try {

            const supplier_id = request.userId

            CreateSupplyDTO.parse(request.body)

            const data:z.infer<typeof CreateSupplyDTO> = request.body


            const result = await this.createSupplyUseCase.execute({
                ...data,
                supplier_id
            })
            return response.json(result)
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