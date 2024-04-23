import { Request, Response } from "express"
import { FindAllPersonsUseCase } from "./findAllPersonUseCase"

export class FindAllPersonController{
    
    constructor(
        private findAllPersonUseCase: FindAllPersonsUseCase,
    ) {}

    async handle (request: Request, reponse: Response) {

        const persons = await this.findAllPersonUseCase.execute()
        return reponse.json(persons)
        
    }
}