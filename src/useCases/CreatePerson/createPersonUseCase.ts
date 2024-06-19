import { IPersonRepository } from "../../repositories/IPersonRepository"
import { Person } from "../../types/Person"
//import { IPersonRequestDTO } from "./createPersonDTO"

export class CreatePersonUseCase {

    constructor(
        private personRepository: IPersonRepository
    ) {}

    async execute(data: any) {
        const person = new Person(data)
        await this.personRepository.save(person)
    }
}