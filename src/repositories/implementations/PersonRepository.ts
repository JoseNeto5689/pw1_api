import { Person } from "../../types/Person"
import { IPersonRepository } from "../IPersonRepository"

export class PersonRepository implements IPersonRepository {
    constructor(private sequelize: any) {}
    async findByEmail(email: string): Promise<Person | null> {
        const result: Person | null = await this.sequelize.models.Person.findOne({
            where: {
                email
            }
        }) as Person | null
        return result
    }

    async findByName(name: string): Promise<Person | null> {
        const person = await this.sequelize.models.Person.findOne({
            where: {
                name: name
            }
        })

        return person as Person | null
    }

    async update(person: Person, id: string): Promise<unknown> {
        const personUpdated = await this.sequelize.models.Person.update({
            ...person
        }, {
            where: {
                id: id
            }
        })
        return personUpdated
    }


    async remove(id: string): Promise<void> {
        await this.sequelize.models.Person.destroy({
            where: {
                id: id
            }
        })
    }

    async findById(id: string): Promise<Person | null> {
        const result: Person | null = await this.sequelize.models.Person.findByPk(id) as Person | null
        return result
    }
    
    async save(person: Person): Promise<unknown> {
        const personCreated = await this.sequelize.models.Person.create({
            ...person
        })
        return personCreated
    }

    async findAll(): Promise<Person[]> {
        const result =  await this.sequelize.models.Person.findAll()
        const persons: Person[] = []
        result.forEach((person: any) => {
            persons.push(person)
        })
        return persons
    }


}