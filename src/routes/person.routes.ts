import { createPersonController } from "../useCases/CreatePerson"
import { findAllPersonController } from "../useCases/FindAllPerson"
import { findByIdPersonController } from "../useCases/FindByIdPerson"
import { deletePersonController } from "../useCases/DeletePerson"
import { updatePersonController } from "../useCases/UpdatePerson"
import { Application, Request, Response } from "express-serve-static-core";

const personRoutes = (app: Application) => {
    app.post("/person",(request, response) => createPersonController.handle(request, response))
    app.get("/person", (request, response) => findAllPersonController.handle(request, response))
    app.get("/person/:id", (request, response) => findByIdPersonController.handle(request, response))
    app.delete("/person/:id", (request, response) => deletePersonController.handle(request, response))
    app.put("/person/:id", (request, response) => updatePersonController.handle(request, response))
}

export default personRoutes