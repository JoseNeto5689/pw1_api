import { Request, Response } from "express"
import { UpdatePersonUseCase } from "./updatePersonUseCase"
import { IUpdatePersonRequestDTO } from "./updatePersonDTO"

export class CreatePersonController{
    
    constructor(
        private updatePersonUseCase: UpdatePersonUseCase,
    ) {}

    async handle (request: Request, reponse: Response) {

        const data:IUpdatePersonRequestDTO = request.body
        const { id } = request.params
        await this.updatePersonUseCase.execute({
            ...data
        }, id)

        return reponse.json("ok")
        
    }
}