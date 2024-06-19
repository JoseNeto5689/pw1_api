import { IPersonRepository } from "../../repositories/IPersonRepository"
import { Person } from "../../types/Person"
import bcrypt from "bcrypt"
//import { IPersonRequestDTO } from "./createPersonDTO"

export class CreatePersonUseCase {

    constructor(
        private personRepository: IPersonRepository
    ) {}

    async execute(data: any) {
        const password = await bcrypt.hash(data.password, 8)

        const person = new Person({
            ...data,
            password
        })
        await this.personRepository.save(person)
    }
}