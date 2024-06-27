import { Request, Response } from "express"
import { CreatePersonUseCase } from "./createPersonUseCase"
import { CreatePersonDTO } from "./createPersonDTO"
import { ZodIssue, z} from "zod"

export class CreatePersonController{
    
    constructor(
        private createPersonUseCase: CreatePersonUseCase,
    ) {}

    async handle (request: Request, reponse: Response) {
        try {
            CreatePersonDTO.parse(request.body)

            const data:z.infer<typeof CreatePersonDTO> = request.body


            await this.createPersonUseCase.execute({
                ...data
            })

            return reponse.json("ok")
        }
        catch (err:any) {
            return reponse.status(400).json({error: err.issues.map((issue:ZodIssue) => issue.path[0] + ", " + issue.message)})
        }
        
    }
}