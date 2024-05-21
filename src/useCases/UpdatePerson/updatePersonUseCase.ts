import { IPersonRepository } from "../../repositories/IPersonRepository"
import { Person } from "../../types/Person"
import { IUpdatePersonRequestDTO } from "./updatePersonDTO"

export class UpdatePersonUseCase {

    constructor(
        private personRepository: IPersonRepository
    ) {}

    async execute(data: IUpdatePersonRequestDTO, id: string) {
        const person = await this.personRepository.findById(id) as Person
        const newPerson: Person = {
            id: person.id,
            name: data.name || person.name,
            address: data.address || person.address,
            type: data.type || person.type,
            contact: data.contact || person.contact
        }

        await this.personRepository.update(newPerson, id)
    }
}