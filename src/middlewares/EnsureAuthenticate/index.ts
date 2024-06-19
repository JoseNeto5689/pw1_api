import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"

class EnsureAuthenticate {
    async handle(request: Request, response: Response, next: NextFunction) {
        try {
            const authToken = request.headers.authorization

            if (!authToken) {
                return response.status(401).json({ status: "Token is missing" })
            }
        
            const [, token] = authToken.split(" ")
        
            const secret = String(process.env.SECRET)           

            verify(token, secret)
            next()

        }
        catch (error) {
            response.status(400).json({ error })
        }
    }
}

export default new EnsureAuthenticate