import { Request, Response } from "express"
import { FindByIdProductUseCase } from "./findByIdImageUseCase"

export class FindByIdProductImageController{
    
    constructor(
        private findByIdProductUseCase: FindByIdProductUseCase,
    ) {}

    async handle (request: Request, response: Response) {
        const { id } = request.params
        if (await this.findByIdProductUseCase.execute(id)){
            return response.sendFile("./files/" + id + ".png", { root: "." })
        }
        return response.json({ message: "This product does not exist or have an image"})
        
    }
}