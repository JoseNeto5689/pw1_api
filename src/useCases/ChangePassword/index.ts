import { PersonRepository } from "../../repositories/implementations/PersonRepository"

import { ChangePasswordUseCase } from "./changePasswordUseCase"

import { ChangePasswordController } from "./changePasswordController"


const personRepository = new PersonRepository()

const changePasswordUseCase = new ChangePasswordUseCase(personRepository)

const changePasswordController = new ChangePasswordController(changePasswordUseCase)

export { changePasswordUseCase, changePasswordController }