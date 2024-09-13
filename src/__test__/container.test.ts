import { SupplierRepository } from "../repositories/implementations/SupplierRepository"
import { CreateSupplierUseCase } from "../useCases/CreateSupplier/createSupplierUseCase"
import { CreateProductUseCase } from "../useCases/CreateProduct/createProductUseCase"
import { ProductRepository } from "../repositories/implementations/ProductRepository"
import { DeleteProductUseCase } from "../useCases/DeleteProduct/deleteProductUseCase"
import { UpdateProductUseCase } from "../useCases/UpdateProduct/updateProductUseCase"
import { FindByIdProductUseCase } from "../useCases/FindByIdProduct/findByIdProductUseCase"
import { FindAllProductsUseCase } from "../useCases/FindAllProduct/findAllProductsUsecase"
import {PostgreSqlContainer} from "@testcontainers/postgresql"
import { sequelizeInitURI } from "../database/connection"
import { password } from "bun"


describe("Testes unitários com os UseCases sem autenticação", () => {
    jest.setTimeout(15000)
    let sequelize: any = null
    let container: any = null
    let supplierExemplo: any = null

    beforeEach(async () => {
        container = await new PostgreSqlContainer("postgis/postgis:latest").start()
        sequelize = sequelizeInitURI(container.getConnectionUri())
        await sequelize.sync({force: true})

        const supplierRepository = await new SupplierRepository(sequelize)
        const createSupplierUseCase = await new CreateSupplierUseCase(supplierRepository)

        const data: any = {
            name: "Samuel",
            password: "1234"
        }

        supplierExemplo = await createSupplierUseCase.execute(data)
    })

    test("Deve adicionar e selecionar uma pessoa", async () => {
        const supplierRepository = await new SupplierRepository(sequelize)
        const createSupplierUseCase = await new CreateSupplierUseCase(supplierRepository)
        const data:any = {
            name: "Samuel",
            password: "bandido"
        }
        
        expect(async () => {return await createSupplierUseCase.execute(data)}).not.toThrow()
    })

    /// Product UsesCases 

    test("Deve criar um produto", async () => {
        const productRepository = await new ProductRepository(sequelize)
        const createProductUseCase = await new CreateProductUseCase(productRepository)

        const product = {
            name: "Produto Exemplo",
            description: "Um produto de exemplo para teste.",
            price: 29.99,
            batch: "BATCH202409",
            manufacturing_date: "2024-01-15",
            expiration_date: "2025-01-15",
            ammount: 100,
            type: "Eletrônicos",
            supplier_id: supplierExemplo.dataValues.id
        }

        expect(async () => {return await createProductUseCase.execute(product)}).not.toThrow()
    })

    test("Deve retornar todos os produtos cadastrados", async () => {
        const productRepository = await new ProductRepository(sequelize)
        const findAllProductsUseCase = await new FindAllProductsUseCase(productRepository)
        const createProductUseCase = await new CreateProductUseCase(productRepository)

        const product = {
            name: "Produto Exemplo",
            description: "Um produto de exemplo para teste.",
            price: 29.99,
            batch: "BATCH202409",
            manufacturing_date: "2024-01-15",
            expiration_date: "2025-01-15",
            ammount: 100,
            type: "Eletrônicos",
            supplier_id: supplierExemplo.dataValues.id
        }

        await createProductUseCase.execute(product)
        expect(async () => {return await findAllProductsUseCase.execute()}).not.toThrow()

    })

    test("Deve retornar um produto cadastrado pelo barcode", async () => {
        const productRepository = await new ProductRepository(sequelize)
        const findByIdProductsUseCase = await new FindByIdProductUseCase(productRepository)
        const createProductUseCase = await new CreateProductUseCase(productRepository)

        const product = {
            name: "Produto Exemplo",
            description: "Um produto de exemplo para teste.",
            price: 29.99,
            batch: "BATCH202409",
            manufacturing_date: "2024-01-15",
            expiration_date: "2025-01-15",
            ammount: 100,
            type: "Eletrônicos",
            supplier_id: supplierExemplo.dataValues.id
        }

        let response: any = await createProductUseCase.execute(product)
        expect(async () => {return await findByIdProductsUseCase.execute(response.dataValues.barcode)}).not.toThrow()

    })

    test("Deve atualizar um produto cadastrado pelo barcode", async () => {
        const productRepository = await new ProductRepository(sequelize)
        const updateProductUseCase = await new UpdateProductUseCase(productRepository)
        const createProductUseCase = await new CreateProductUseCase(productRepository)

        const product = {
            name: "Produto Exemplo",
            description: "Um produto de exemplo para teste.",
            price: 29.99,
            batch: "BATCH202409",
            manufacturing_date: "2024-01-15",
            expiration_date: "2025-01-15",
            ammount: 100,
            type: "Eletrônicos",
            supplier_id: supplierExemplo.dataValues.id
        }

        let response: any = await createProductUseCase.execute(product)

        const updateProduct = {
            name: "Gamepad",
            description: "Gamepad para PC.",
            price: 29.99,
            batch: "BATCH202409",
            manufacturing_date: "2024-01-15",
            expiration_date: "2025-01-15",
            ammount: 10,
            type: "Eletrônicos",
            supplier_id: supplierExemplo.dataValues.id
        }
        
        expect(async () => {return await updateProductUseCase.execute(updateProduct, response.dataValues.barcode, supplierExemplo.dataValues.id)}).not.toThrow()
    })

    test("Deve deletar um produto cadastrado pelo barcode", async () => {
        const productRepository = await new ProductRepository(sequelize)
        const deleteProductUseCase = await new DeleteProductUseCase(productRepository)
        const createProductUseCase = await new CreateProductUseCase(productRepository)

        const product = {
            name: "Produto Exemplo",
            description: "Um produto de exemplo para teste.",
            price: 29.99,
            batch: "BATCH202409",
            manufacturing_date: "2024-01-15",
            expiration_date: "2025-01-15",
            ammount: 100,
            type: "Eletrônicos",
            supplier_id: supplierExemplo.dataValues.id
        }

        let response: any = await createProductUseCase.execute(product)
        console.log(response.dataValues)

        expect(async () => {return await deleteProductUseCase.execute(response.dataValues.barcode, supplierExemplo.dataValues.id)}).not.toThrow()
    })




})