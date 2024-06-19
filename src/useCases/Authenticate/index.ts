import AuthenticateUser from "./authenticate"
import { PersonRepository } from "../../repositories/implementations/PersonRepository"

const personRepository = new PersonRepository()

const authenticateUser = new AuthenticateUser(personRepository)

export { authenticateUser }