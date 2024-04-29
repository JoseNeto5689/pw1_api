import { PersonRepository } from "../../repositories/implementations/PersonRepository"
import { FindByIdPersonController } from "./findByIdControllerController"
import { FindByIdPersonUseCase } from "./findByIdPersonUseCase"


const personRepository = new PersonRepository()

const findByIdPersonUseCase = new FindByIdPersonUseCase(personRepository)

const findByIdPersonController = new FindByIdPersonController(findByIdPersonUseCase)

export { findByIdPersonController, findByIdPersonUseCase }