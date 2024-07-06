import EnsureAuthenticate from "../middlewares/EnsureAuthenticate"
import { authenticateUser } from "../useCases/Authenticate"
import { Application } from "express"

const authRoutes = (app: Application) => {
    app.get("/", EnsureAuthenticate.handle, (request, response) => {return response.json({ message: "Hello, world!" })})
    app.post("/auth",  (req, res) => {authenticateUser.handle(req, res) })
}

export default authRoutes