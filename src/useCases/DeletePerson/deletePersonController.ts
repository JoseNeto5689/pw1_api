import { Request, Response } from "express"
import { DeletePersonUseCase } from "./deletePersonUseCase"

export class DeletePersonController{
    
    constructor(
        private deletePersonUseCase: DeletePersonUseCase,
    ) {}

    async handle (request: Request, reponse: Response) {
        const { id } = request.params
        await this.deletePersonUseCase.execute(id)
        return reponse.json("ok")
        
    }
}