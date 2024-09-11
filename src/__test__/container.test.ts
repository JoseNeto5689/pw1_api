import {
    TestContainer,
    StartedTestContainer,
    GenericContainer
} from "testcontainers";
import { SupplierRepository } from "../repositories/implementations/SupplierRepository";
import { CreateSupplierUseCase } from "../useCases/CreateSupplier/createSupplierUseCase";
import sequelize from "../database/index"
import { CreateProductUseCase } from "../useCases/CreateProduct/createProductUseCase";
import { ProductRepository } from "../repositories/implementations/ProductRepository";
import { FindAllProductsUseCase } from "../useCases/FindAllProduct/findAllProductsUsecase";
import { FindByIdProductUseCase } from "../useCases/FindByIdProduct/findByIdProductUseCase";

import sequelizeInit from "../database/connection";


describe("Testes com tabela Person sem autentificação", () => {
    jest.setTimeout(150000);
    let sequelize: any = null
    let startedContainer: StartedTestContainer
    let personPost: any 

    beforeAll(async () => {
        const container = new GenericContainer('postgis/postgis:12-3.0');
        startedContainer = await container
            .withEnvironment({ POSTGRES_USER: 'admin' })
            .withEnvironment({ POSTGRES_DB: 'postgres' })
            .withEnvironment({ POSTGRES_PASSWORD: '123' })
            .start();

        sequelize = sequelizeInit('postgres', '123', 'admin', startedContainer.getHost());

        try {
            await sequelize.sync();
            console.log('Database & tables created!');
        } catch (error) {
            console.log('Error syncing database:');
        }

        // create a person mock for use in all test
        const supplierRepository = new SupplierRepository(sequelize);
        const createSupplierUseCase = new CreateSupplierUseCase(supplierRepository);
        const data = {
            name: 'José',
            password: 'bandido'
        };

        personPost = await createSupplierUseCase.execute(data)
    });

    afterAll(async () => {
        await sequelize.close();
        await startedContainer.stop();
    });

    test("Deve adicionar um novo produto", async () => {
        const productRepository = new ProductRepository(sequelize)
        const createProductRepository = new CreateProductUseCase(productRepository)

        let product = {
            name: "Detergente Multiuso XYZ",
            description: "Detergente eficaz para limpeza de superfícies diversas.",
            price: 15.75,
            batch: "BATCH202409",
            manufacturing_date: "2024-07-15",
            expiration_date: "2026-07-15",
            ammount: 100,
            type: "Limpeza",
            supplier_id: personPost.data.id
        };
        
        expect(async () => {return await createProductRepository.execute(product)}).not.toThrow()
    })

    test("Deve retornar todos os produtos cadastrados", async () => {
        const productRepository = new ProductRepository(sequelize)
        const findAllProductRepository = new FindAllProductsUseCase(productRepository)

        expect(async () => {return await findAllProductRepository.execute()}).not.toThrow()
    })

    test("Deve retornar o produto cadastrado pelo seu id", async () => {
        const productRepository = new ProductRepository(sequelize)
        const findByIdProductUseCase = new FindByIdProductUseCase(productRepository)
        const createProductRepository = new CreateProductUseCase(productRepository)

        let product = {
            name: "Shampoo Hidratante ABC",
            description: "Shampoo com fórmula hidratante para cabelos secos e danificados.",
            price: 29.99,
            batch: "BATCH202409A",
            manufacturing_date: "2024-05-20",
            expiration_date: "2026-05-20",
            ammount: 50,
            type: "Higiene Pessoal",
            supplier_id: personPost.data.id
        };

        let newProduct = await createProductRepository.execute(product)
        console.log(newProduct)

        // expect(async () => {return await findByIdProductUseCase.execute(product.barcode)}).not.toThrow()

    })
});