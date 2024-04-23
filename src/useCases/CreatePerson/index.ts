import { PersonRepository } from "../../repositories/implementations/PersonRepository"
import { CreatePersonController } from "./createPersonController"
import { CreatePersonUseCase } from "./createPersonUseCase"

const personRepository = new PersonRepository()
const createPersonUseCase = new CreatePersonUseCase(personRepository)
const createPersonController = new CreatePersonController(createPersonUseCase)

export { createPersonUseCase, createPersonController }

