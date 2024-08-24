import { PersonRepository } from "../../repositories/implementations/PersonRepository"
import { ChangePasswordUseCase } from "./changePasswordUseCase"
import { ChangePasswordController } from "./changePasswordController"
import sequelize from "../../database/index"

const personRepository = new PersonRepository(sequelize)

const changePasswordUseCase = new ChangePasswordUseCase(personRepository)

const changePasswordController = new ChangePasswordController(changePasswordUseCase)

export { changePasswordUseCase, changePasswordController }