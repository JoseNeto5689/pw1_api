import { Request, Response } from "express";
import { ISupplierRepository } from "../../repositories/ISupplierRepository";
import { Supplier } from "../../types/Supplier";
import { ISupplierRequestDTO } from "./createSupplierDTO";
import { CreateSupplierUseCase } from "./createSupplierUseCase";

export class CreateSupplierController {

    constructor(
        private createSupplierUseCase: CreateSupplierUseCase
    ) {}

    async handle(request: Request, reponse: Response) {
        const {name}:{name:string} = request.body

        await this.createSupplierUseCase.execute({
            name,
            geolocalization: undefined,
            image: undefined
        })

        reponse.json("ok")
    }
}