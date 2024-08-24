import {
    TestContainer,
    StartedTestContainer,
    StoppedTestContainer,
    GenericContainer
} from "testcontainers"
import axios from "axios"
import { SupplierRepository } from "../repositories/implementations/SupplierRepository"
import { CreateSupplierUseCase } from "../useCases/CreateSupplier/createSupplierUseCase"
import sequelizeInit from "../database/connection"

describe("Testes com tabela Person sem autentificação", () => {
    jest.setTimeout(15000)
    let sequelize: any = null

    beforeAll(async () => {
        
        const container: TestContainer = new GenericContainer("postgis/postgis:latest")
        console.log('bandido')
        const startedContainer: StartedTestContainer = await container.start()
        console.log('jose')
        console.log(startedContainer.getHost())
        sequelize = sequelizeInit('postgres', 'postgres', 'postgres', startedContainer.getHost())
        //const stoppedContainer: StoppedTestContainer = await startedContainer.stop()    
    })

    test("Deve adicionar e selecionar uma pessoa", async () => {
        const supplierRepository = new SupplierRepository(sequelize)
        const createSupplierUseCase = new CreateSupplierUseCase(supplierRepository)
        let data = {
            username: 'José',
            password: 'bandido'
        }
        expect(await createSupplierUseCase.execute(data)).not.toThrow()
    })
})