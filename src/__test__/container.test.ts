import {
    TestContainer,
    StartedTestContainer,
    StoppedTestContainer,
    GenericContainer
} from "testcontainers"
import { SupplierRepository } from "../repositories/implementations/SupplierRepository"
import { CreateSupplierUseCase } from "../useCases/CreateSupplier/createSupplierUseCase"
import sequelizeInit from "../database/connection"

describe("Testes com tabela Person sem autentificação", () => {
    jest.setTimeout(15000)
    let sequelize: any = null
    let startedContainer: StartedTestContainer

    beforeAll(async () => {
        const container: TestContainer = new GenericContainer("postgis/postgis:latest")
        startedContainer = await container
        .withEnvironment({"POSTGRES_USER": "admin"})
        .withEnvironment({"POSTGRES_DB": "main"})
        .withEnvironment({"POSTGRES_PASSWORD": "123"})
        .start()
        sequelize = sequelizeInit("main", "123","admin", startedContainer.getHost())
        await sequelize.sync()
    })

    afterAll(async () => {
            await startedContainer.stop()
            await sequelize.close()
        }
    )

    test("Deve adicionar e selecionar uma pessoa", async () => {
        const supplierRepository = new SupplierRepository(sequelize)
        const createSupplierUseCase = new CreateSupplierUseCase(supplierRepository)
        let data = {
            name: 'JV',
            password: 'bandido'
        }
        
        expect(async () => {return await createSupplierUseCase.execute(data)}).not.toThrow()
    })
})