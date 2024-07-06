import { PersonRepository } from "../../repositories/implementations/PersonRepository"
import { FindAllPersonController } from "./findAllPersonController"
import { FindAllPersonsUseCase } from "./findAllPersonUseCase"


const personRepository = new PersonRepository()
const findAllPersonUseCase = new FindAllPersonsUseCase(personRepository)
const findAllPersonController = new FindAllPersonController(findAllPersonUseCase)

export {findAllPersonController, findAllPersonUseCase}