import sequelize from "../../database/connection"
import Person from "../../database/models/Person"
import { IPersonRepository } from "../IPersonRepository"

export class SequelizePersonRepository implements IPersonRepository {

    async save(person: Person): Promise<void> {
        await sequelize.models.Person.create({
            ...person
        })
    }

}