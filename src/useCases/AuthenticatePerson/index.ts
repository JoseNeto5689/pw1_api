import AuthenticateUser from "./authenticate"
import { PersonRepository } from "../../repositories/implementations/PersonRepository"
import sequelize from "../../database/index"

const personRepository = new PersonRepository(sequelize)

const authenticateUser = new AuthenticateUser(personRepository)

export { authenticateUser }