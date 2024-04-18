import { SequelizePersonRepository } from "../../repositories/implementations/SequelizePersonRepository"
import { CreatePersonController } from "./createPersonController"
import { CreatePersonUseCase } from "./createPersonUseCase"

const sequelizePersonRepository = new SequelizePersonRepository()
const createPersonUseCase = new CreatePersonUseCase(sequelizePersonRepository)
const createPersonController = new CreatePersonController(createPersonUseCase)

export { createPersonUseCase, createPersonController }

