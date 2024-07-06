import GenerateToken from "../../providers/GenerateToken"
import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import { ISupplierRepository } from "../../repositories/ISupplierRepository"


interface IRequest {
    id: string
    password: string
}

class AuthenticateSupplier {
    constructor(
        private supplierRepository: ISupplierRepository
    ) { }
    async handle(req: Request, res: Response) {
        try {
            const { id, password } = <IRequest>req.body
            const user = await this.supplierRepository.findById(id)

            if (!user) {
                return res.status(401).json({ status: "This id is not registered" })
            }
            const passwordMatch = await bcrypt.compare(password, user.password)

            if(!passwordMatch) {
                return res.status(401).json({ status: "Password dont match"})
            }

            const token = await GenerateToken.execute(user.id, true)
            return res.json({ token })

        }
        catch (error) {
            res.status(400).json({ error })
        }
    }
}

export default AuthenticateSupplier