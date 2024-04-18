import { Request, Response } from "express"
import { CreatePersonUseCase } from "./createPersonUseCase"
import { IPersonRequestDTO } from "./createPersonDTO"

export class CreatePersonController{
    
    constructor(
        private createPersonUseCase: CreatePersonUseCase,
    ) {}

    async handle (request: Request, reponse: Response) {

        const {name, address, type, contact}:IPersonRequestDTO
         = request.body
        await this.createPersonUseCase.execute({
            name,
            address,
            type,
            contact
        })

        return reponse.json("ok")
    }
}