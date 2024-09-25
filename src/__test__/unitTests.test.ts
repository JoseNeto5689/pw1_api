import { IPersonRepository } from "../repositories/IPersonRepository"
import { CreatePersonUseCase } from "../useCases/CreatePerson/createPersonUseCase"
describe("Unit tests", () => {
    const repositoryPerson: IPersonRepository = {
        save: jest.fn().mockReturnValue("Ola"),
        findAll: jest.fn(),
        findById: jest.fn(),
        findByName: jest.fn(),
        remove: jest.fn(),
        update: jest.fn()
    }

    const hash = jest.fn().mockReturnValue("###########")
    

    it("should pass", () => {
        //Trocar o findAll esse para o save
        repositoryPerson.findAll = jest.fn().mockReturnValue("Ola")
        const createPersonUseCase = new CreatePersonUseCase(repositoryPerson, hash)
        createPersonUseCase.execute({
            name: "test",
            age: 1,
        })

        //Corrigir para esperar que o useCase n lançe um erro
        expect(1 + 1).toBe(2)
    })
})