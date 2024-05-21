import { PersonRepository } from "../../repositories/implementations/PersonRepository"
import { CreatePersonController } from "./updatePersonController"
import { UpdatePersonUseCase } from "./updatePersonUseCase"

const personRepository = new PersonRepository()

const updatePersonUseCase = new UpdatePersonUseCase(personRepository)

const updatePersonController = new CreatePersonController(updatePersonUseCase)

export { updatePersonUseCase, updatePersonController }