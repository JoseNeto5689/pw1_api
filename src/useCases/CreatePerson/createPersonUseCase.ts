import { IPersonRepository } from "../../repositories/IPersonRepository"
import { Person } from "../../types/Person"


export class CreatePersonUseCase {

    constructor(
        private personRepository: IPersonRepository,
        private hash: any
    ) {}

    async execute(data: any) {
        const password = await this.hash(data.password, 8)

        const person = new Person({
            ...data,
            password
        })
        const result = await this.personRepository.save(person)

        return result
    }
}