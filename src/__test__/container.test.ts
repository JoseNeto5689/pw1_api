import {
    TestContainer,
    StartedTestContainer,
    GenericContainer
} from "testcontainers";
import { SupplierRepository } from "../repositories/implementations/SupplierRepository";
import { CreateSupplierUseCase } from "../useCases/CreateSupplier/createSupplierUseCase";
import sequelizeInit from "../database/connection";

describe("Testes com tabela Person sem autentificação", () => {
    jest.setTimeout(150000);
    let sequelize: any = null;
    let startedContainer: StartedTestContainer;

    beforeAll(async () => {
        const container: TestContainer = new GenericContainer("postgis/postgis:12-3.0");
        startedContainer = await container
            .withEnvironment({"POSTGRES_USER": "admin"})
            .withEnvironment({"POSTGRES_DB": "main"})
            .withEnvironment({"POSTGRES_PASSWORD": "123"})
            .start();

        sequelize = sequelizeInit("main", "123", "admin", startedContainer.getHost());
        await sequelize.authenticate(); 
        await sequelize.sync();
        console.log("Conexão com o banco de dados estabelecida e sincronizada.");
    });

    afterAll(async () => {
        await sequelize.close();
        await startedContainer.stop();
    });

    test("Deve adicionar e selecionar uma pessoa", async () => {
        const supplierRepository = new SupplierRepository(sequelize);
        const createSupplierUseCase = new CreateSupplierUseCase(supplierRepository);
        const data = {
            name: 'JV',
            password: 'bandido'
        };

        await expect(createSupplierUseCase.execute(data)).resolves.not.toThrow();
    });
});