import { Response, Request } from "express"
import { DeleteSupplyUseCase } from "./deleteSupplyUseCase"
import { generateMessageArray } from "../../utils/zodError"

export class DeleteSupplyController {
    constructor(
        private deleteSupplyUseCase: DeleteSupplyUseCase
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params
            await this.deleteSupplyUseCase.execute(id)
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