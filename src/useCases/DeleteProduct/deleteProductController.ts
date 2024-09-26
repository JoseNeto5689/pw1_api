import { Request, Response } from "express"
import { DeleteProductUseCase } from "./deleteProductUseCase"
import { generateMessageArray } from "../../utils/zodError"

export class DeleteProductController{
    
    constructor(
        private deleteProductUseCase: DeleteProductUseCase,
    ) {}

    async handle (request: Request, response: Response) {
        try {
            const { id } = request.params
            const supplier_id = request.body.userId
            await this.deleteProductUseCase.execute(id, supplier_id)
            return response.json("ok")
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