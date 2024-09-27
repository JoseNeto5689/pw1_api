import { IPersonRepository } from "../../repositories/IPersonRepository"
import { Person } from "../../types/Person"
import bcrypt from "bcryptjs"

export class ChangePasswordUseCase {

    constructor(
        private personRepository: IPersonRepository
    ) {}

    
    async execute(oldPassword: string, newPassword: string, id: string) {
        const person = await this.personRepository.findById(id) as Person

        const passwordMatch = await bcrypt.compare(oldPassword, person.password)

        if(!passwordMatch) {
            throw new Error("Old password dont match")
        }

        const password = await bcrypt.hash(newPassword, 8)

        await this.personRepository.update({password}, id)
    }
}