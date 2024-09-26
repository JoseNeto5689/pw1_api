import GenerateToken from "../../providers/GenerateToken"
import { Request, Response } from "express"
import { IPersonRepository } from "../../repositories/IPersonRepository"
import bcrypt from "bcryptjs"


interface IRequest {
    email: string
    password: string
}

class AuthenticateUser {
    constructor(
        private personRepository: IPersonRepository
    ) { }
    async handle(req: Request, res: Response) {
        try {
            const { email, password } = <IRequest>req.body
            const user = await this.personRepository.findByEmail(email)


            if (!user) {
                return res.status(401).json({ status: "This user is not registered" })
            }
            const passwordMatch = await bcrypt.compare(password, user.password)

            if(!passwordMatch) {
                return res.status(401).json({ status: "Password dont match"})
            }

            const token = await GenerateToken.execute(user.id)
            return res.json({ token })

        }
        catch (error) {
            res.status(400).json({ error })
        }
    }
}

export default AuthenticateUser