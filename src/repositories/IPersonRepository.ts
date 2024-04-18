import { Person } from "../types/Person"

export interface IPersonRepository {
    save(person:Person): Promise<void>
}