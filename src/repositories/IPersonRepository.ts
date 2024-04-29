import { Person } from "../types/Person"

export interface IPersonRepository {
    save(person:Person): Promise<void>
    findAll(): Promise<Person[]>
    findById(id: string): Promise<Person | null>
}