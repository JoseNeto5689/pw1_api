import { IPersonRepository } from "../../repositories/IPersonRepository"
import { Person } from "../../types/Person"


export class CreatePersonUseCase {

    constructor(
        private personRepository: IPersonRepository,
        private hash: any
    ) {}

    async execute(data: any) {

        if (data.password.length < 8) {
            throw Error("Senha com tamanho menor que 8 caracteres")
        }

        if (data.password === "") {
            throw Error("Senha está vazia")
        }

        const password = await this.hash(data.password, 8)

        const person = new Person({
            ...data,
            password
        })
        const result = await this.personRepository.save(person)

        return result
    }
}