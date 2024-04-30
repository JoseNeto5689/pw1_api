import { PersonRepository } from "../../repositories/implementations/PersonRepository"
import { DeletePersonController } from "./deletePersonController"
import { DeletePersonUseCase } from "./deletePersonUseCase"

const personRepository = new PersonRepository()

const deletePersonUseCase = new DeletePersonUseCase(personRepository)

const deletePersonController = new DeletePersonController(deletePersonUseCase)

export { deletePersonController, deletePersonUseCase }