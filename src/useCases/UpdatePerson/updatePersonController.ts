import { Request, Response } from "express"
import { UpdatePersonUseCase } from "./updatePersonUseCase"
import { UpdatePersonDTO } from "./updatePersonDTO"
import { z } from "zod"
import { generateMessageArray } from "../../utils/zodError"

export class CreatePersonController{
    
    constructor(
        private updatePersonUseCase: UpdatePersonUseCase,
    ) {}

    async handle (request: Request, response: Response) {
        try {
            UpdatePersonDTO.parse(request.body)
            const data:z.infer<typeof UpdatePersonDTO> = request.body

            const { id } = request.params
            await this.updatePersonUseCase.execute({
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