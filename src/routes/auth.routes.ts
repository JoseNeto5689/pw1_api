import EnsureAuthenticate from "../middlewares/EnsureAuthenticate"
import { authenticateUser } from "../useCases/AuthenticatePerson"
import { Application } from "express"
import { authenticateSupplier } from "../useCases/AuthenticateSupplier"

const authRoutes = (app: Application) => {
    app.get("/", EnsureAuthenticate.handlePerson, (request, response) => {return response.json({ message: "Hello, world!", request: request.body.userId })})
    app.post("/auth/person",  (req, res) => {authenticateUser.handle(req, res) })
    app.post("/auth/supplier",  (req, res) => {authenticateSupplier.handle(req, res) })
}

export default authRoutes