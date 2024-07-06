import { sign } from "jsonwebtoken"

class GenerateToken {
    async execute(userId: string, isAdmin: boolean = false) {
        const secret = String(process.env.SECRET)

        const token = sign({ isAdmin }, secret, {
            expiresIn: "5m",
            subject: userId
        })

        return token
    }
}

export default new GenerateToken