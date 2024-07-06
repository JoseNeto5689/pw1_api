import EnsureAuthenticate from "../middlewares/EnsureAuthenticate"
import { authenticateUser } from "../useCases/AuthenticatePerson"
import { Application } from "express"

const authRoutes = (app: Application) => {
    app.get("/", EnsureAuthenticate.handlePerson, (request, response) => {return response.json({ message: "Hello, world!", request: request.body.userId })})
    app.post("/auth",  (req, res) => {authenticateUser.handle(req, res) })
}

export default authRoutes