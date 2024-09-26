import { Request, Response } from "express"
import { SaveImageUseCase } from "./saveProductUseCase"
import { generateMessageArray } from "../../utils/zodError"

export class SaveImageController {

    constructor(
        private saveImageUseCase: SaveImageUseCase
    ) { }

    async handle(req: Request, res: Response) {
        try {
            //@ts-ignore
            const image = req.file?.buffer as Buffer
            const treatedImage = image.toString("base64")
            await this.saveImageUseCase.execute(req.params.id, treatedImage)
            res.json("ok")
        } catch(err:any){
            if(err.issues) {
                const message = generateMessageArray(err)
                return res.status(400).json({errors: message}) 
            }
            return res.status(400).json({error: err.message})
        }
    }

}

