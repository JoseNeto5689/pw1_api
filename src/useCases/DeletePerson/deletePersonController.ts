import { Request, Response } from "express"
import { DeletePersonUseCase } from "./deletePersonUseCase"
import { generateMessageArray } from "../../utils/zodError"

export class DeletePersonController{
    
    constructor(
        private deletePersonUseCase: DeletePersonUseCase,
    ) {}

    async handle (request: Request, response: Response) {
        try {
            const id = request.body.userId
            await this.deletePersonUseCase.execute(id)
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