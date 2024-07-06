import { Request, Response } from "express"
import { ZodError, z } from "zod"
import { ChangePasswordUseCase } from "./changePasswordUseCase"
import { ChangePasswordDTO } from "./changePasswordDTO"

export class ChangePasswordController{
    
    constructor(
        private changePasswordUseCase: ChangePasswordUseCase,
    ) {}

    async handle (request: Request, response: Response) {
        try {
            const {id} = request.params

            ChangePasswordDTO.parse(request.body)

            const data:z.infer<typeof ChangePasswordDTO> = request.body

            await this.changePasswordUseCase.execute(data.oldPassword,data.newPassword, id)

            return response.json("ok")
        }
        catch(err:any){
            if(err instanceof ZodError) return response.status(400).json({error: err.issues.map((issue:z.ZodIssue) => issue.path[0] + ", " + issue.message)})
            return response.status(400).json({error: err.message})
        }
    }
}