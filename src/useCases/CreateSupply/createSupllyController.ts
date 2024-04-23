import { Request, Response } from "express"
import { ISupplyRequestDTO } from "./createSupplyDTO"
import { CreateSupplyUseCase } from "./createSupplyUseCase"

export class CreateSupplyController {
    constructor(
        private createSupplyUseCase: CreateSupplyUseCase
    ) {}
    
    async handle (request: Request, reponse: Response) {
        const data:ISupplyRequestDTO = request.body
        await this.createSupplyUseCase.execute({
            ...data
        })
        return reponse.json("ok")
    }
}