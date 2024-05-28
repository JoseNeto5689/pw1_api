import { Request, Response } from "express"
import { UpdateSupplierUseCase } from "./updateSupplierUseCase"
import { IUpdateSupplierRequestDTO } from "./updateSupplierDTO"

export class CreateSupplierController{

    constructor(
        private updateSupplierUseCase: UpdateSupplierUseCase,
    ) {}

    async handle (request: Request, reponse: Response) {

        const data:IUpdateSupplierRequestDTO = request.body
        const { id } = request.params
        await this.updateSupplierUseCase.execute({
            ...data
        }, id)

        return reponse.json("ok")

    }
}