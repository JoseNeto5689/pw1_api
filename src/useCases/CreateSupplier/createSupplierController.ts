import { Request, Response } from "express"
import { CreateSupplierUseCase } from "./createSupplierUseCase"

export class CreateSupplierController {
    
    constructor(
        private createSupplierUseCase: CreateSupplierUseCase,
    ) {}

    handle = (async (request: Request, reponse: Response) => {
        const {name}:{name:string} = request.body
        await this.createSupplierUseCase.execute({
            name,
            geolocalization: undefined,
            image: undefined
        })

        return reponse.json("ok")
    })//.bind(this)
}