import { Request, Response } from "express"
import { FindByIdProductUseCase } from "./findByIdImageUseCase"
import path from "path"
import { generateMessageArray } from "../../utils/zodError"

export class FindByIdProductImageController{
    
    constructor(
        private findByIdProductUseCase: FindByIdProductUseCase,
    ) {}

    async handle (request: Request, response: Response) {
        try{
            const { id } = request.params
            if (await this.findByIdProductUseCase.execute(id)){
                return response.sendFile(id + ".png", {root: path.join(__dirname + "/files")})
            }
            return response.json({ message: "This product does not exist or have an image"})
        }
        catch(err:any){
            if(err.issues) {
                const message = generateMessageArray(err)
                return response.status(400).json({errors: message}) 
            }
            return response.status(400).json({error: err.message})
        }
    }
}