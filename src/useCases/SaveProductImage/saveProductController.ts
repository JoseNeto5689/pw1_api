import { Request, Response } from "express"
import { SaveImageUseCase } from "./saveProductUseCase"
import { generateMessageArray } from "../../utils/zodError"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "../../services/firebase"

export class SaveImageController {

    constructor(
        private saveImageUseCase: SaveImageUseCase
    ) { }

    async handle(req: Request, res: Response) {
        try {

            const file: any = req.file
            console.log(file)
            const imageRef = ref(storage, `pw1/${file?.originalname}`)
            await uploadBytes(imageRef, file.buffer as Blob)
            const downloadURL = await getDownloadURL(imageRef)
            await this.saveImageUseCase.execute(req.params.id, downloadURL)

            res.json("Image saved")
        } catch(err:any){
            if(err.issues) {
                const message = generateMessageArray(err)
                return res.status(400).json({errors: message}) 
            }
            return res.status(400).json({error: err.message})
        }
    }

}

