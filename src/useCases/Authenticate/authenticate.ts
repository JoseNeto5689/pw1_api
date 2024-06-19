import GenerateToken from "../../providers/GenerateToken"
import { Request, Response } from "express"
import { IPersonRepository } from "../../repositories/IPersonRepository"


interface IRequest {
    userName: string
}

class AuthenticateUser {
    constructor(
        private personRepository: IPersonRepository
    ) { }
    async handle(req: Request, res: Response) {
        try {
            const { userName } = <IRequest>req.body
            const user = await this.personRepository.findByName(userName)

            if (!user) {
                return res.status(401).json({ status: "This user is not registered" })
            }

            /*
            if(user.password != password){
                return res.status(401).json({ status: "Password dont match" })
            }
            */

            const token = await GenerateToken.execute(user.id)

            return res.json({ token })

        }
        catch (error) {
            res.status(400).json({ error })
        }
    }
}

export default AuthenticateUser