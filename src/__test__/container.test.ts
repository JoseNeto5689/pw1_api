import { SupplierRepository } from "../repositories/implementations/SupplierRepository"
import { CreateSupplierUseCase } from "../useCases/CreateSupplier/createSupplierUseCase"
import {PostgreSqlContainer} from "@testcontainers/postgresql"
import { sequelizeInitURI } from "../database/connection"

describe("Testes com tabela Person sem autentificação", () => {
    jest.setTimeout(15000)
    let sequelize: any = null
    let container: any = null

    beforeEach(async () => {
        container = await new PostgreSqlContainer("postgis/postgis:latest").start()
        sequelize = sequelizeInitURI(container.getConnectionUri())
        await sequelize.sync()
    })

    afterEach(async () => {
        await container.stop()
    })

    test("Deve adicionar e selecionar uma pessoa", async () => {
        const supplierRepository = await new SupplierRepository(sequelize)
        const createSupplierUseCase = await new CreateSupplierUseCase(supplierRepository)
        const data:any = {
            name: "Samuel",
            password: "bandido v2"
        }
        
        expect(async () => {return await createSupplierUseCase.execute(data)}).not.toThrow()
    })
})