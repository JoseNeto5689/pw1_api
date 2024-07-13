import { Request, Response } from "express"
import { FindByIdSupplierUseCase } from "./findByIdSupplierUseCase"

export class FindByIdSupplierImageController{
    
    constructor(
        private findByIdSupplierUseCase: FindByIdSupplierUseCase,
    ) {}

    async handle (request: Request, response: Response) {
        const { id } = request.params
        if (await this.findByIdSupplierUseCase.execute(id)){
            return response.sendFile("./files/" + id + ".png", { root: "." })
        }
        return response.json({ message: "This supplier does not exist or have an image"})
        
    }
}