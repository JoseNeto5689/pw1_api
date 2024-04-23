import sequelize from "../../database/connection"
import { Person } from "../../types/Person"
import { IPersonRepository } from "../IPersonRepository"

export class PersonRepository implements IPersonRepository {
    
    async save(person: Person): Promise<void> {
        await sequelize.models.Person.create({
            ...person
        })
    }

    async findAll(): Promise<unknown> {
       const persons =  await sequelize.models.Person.findAll()
       return persons
    }


}