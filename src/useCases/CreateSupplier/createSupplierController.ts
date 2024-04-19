import { Request, Response } from "express"
import { CreateSupplierUseCase } from "./createSupplierUseCase"
import { ISupplierRequestDTO } from "./createSupplierDTO"

export class CreateSupplierController {
    
    constructor(
        private createSupplierUseCase: CreateSupplierUseCase,
    ) {}

    async handle (request: Request, reponse: Response) {
        const data:ISupplierRequestDTO = request.body
        
        await this.createSupplierUseCase.execute({
            ...data
        })

        return reponse.json("ok")
        
    }
}