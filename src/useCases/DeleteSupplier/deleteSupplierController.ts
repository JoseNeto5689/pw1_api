import { Response, Request } from "express"
import { DeleteSupplierUseCase } from "./deleteSupplierUseCase"
import { generateMessageArray } from "../../utils/zodError"

export class DeleteSupplierController {
    constructor(
        private deleteSupplierUseCase: DeleteSupplierUseCase
    ) {}
    
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const id = request.userId
            await this.deleteSupplierUseCase.execute(id)
            return response.json("Supplier deleted")
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