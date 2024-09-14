import { SupplierRepository } from "../repositories/implementations/SupplierRepository"
import { ProductRepository } from "../repositories/implementations/ProductRepository"
import { PersonRepository } from "../repositories/implementations/PersonRepository"

import { CreateSupplierUseCase } from "../useCases/CreateSupplier/createSupplierUseCase"
import { CreateProductUseCase } from "../useCases/CreateProduct/createProductUseCase"
import { CreatePersonUseCase } from "../useCases/CreatePerson/createPersonUseCase"

import { DeleteProductUseCase } from "../useCases/DeleteProduct/deleteProductUseCase"
import { DeleteSupplierUseCase } from "../useCases/DeleteSupplier/deleteSupplierUseCase"
import { DeletePersonUseCase } from "../useCases/DeletePerson/deletePersonUseCase"


import { UpdateProductUseCase } from "../useCases/UpdateProduct/updateProductUseCase"
import { UpdateSupplierUseCase } from "../useCases/UpdateSupplier/updateSupplierUseCase"
import { UpdatePersonUseCase } from "../useCases/UpdatePerson/updatePersonUseCase"


import { FindByIdProductUseCase } from "../useCases/FindByIdProduct/findByIdProductUseCase"
import { FindByIdSupplierUseCase } from "../useCases/FindByIdSupplier/findByIdSupplierUseCase"
import { FindByIdPersonUseCase } from "../useCases/FindByIdPerson/findByIdPersonUseCase"

import { FindAllProductsUseCase } from "../useCases/FindAllProduct/findAllProductsUsecase"
import { FindAllSuppliersUseCase } from "../useCases/FindAllSupplier/findAllSupplierUseCase"
import { FindAllPersonsUseCase } from "../useCases/FindAllPerson/findAllPersonUseCase"


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

        const supplier: any = {
            name: "Samuel",
            password: "1234"
        }

        supplierExemplo = await createSupplierUseCase.execute(supplier)
    })


    /// Supplier UseCases

    test("Deve criar um supplier", async () => {
        const supplierRepository = await new SupplierRepository(sequelize)
        const createSupplierUseCase = await new CreateSupplierUseCase(supplierRepository)

        const supplier: any = {
            name: "Gabriel",
            password: "654123"
        }

        expect(async () => {return await createSupplierUseCase.execute(supplier)}).not.toThrow()
    })

    test("Deve retornar todos os produtos cadastrados", async () => {
        const supplierRepository = await new SupplierRepository(sequelize)
        const findAllSupplierUseCase = await new FindAllSuppliersUseCase(supplierRepository)
        const createSupplierUseCase = await new CreateSupplierUseCase(supplierRepository)

        const supplier: any = {
            name: "Gabriel",
            password: "654123"
        }

        await createSupplierUseCase.execute(supplier)
        expect(async () => {return await findAllSupplierUseCase.execute()}).not.toThrow()


    })

    test("Deve retornar o supplier pelo id", async () => {
        const supplierRepository = await new SupplierRepository(sequelize)
        const findByIdSupplierUseCase = await new FindByIdSupplierUseCase(supplierRepository)
        const createSupplierUseCase = await new CreateSupplierUseCase(supplierRepository)

        const supplier: any = {
            name: "Osvaldo",
            password: "654123"
        }

        let response: any = await createSupplierUseCase.execute(supplier)
        expect(async () => {return await findByIdSupplierUseCase.execute(response.dataValues.id)}).not.toThrow()

    })

    test("Deve atualizar um supplier cadastrado pelo id", async () => {
        const supplierRepository = await new SupplierRepository(sequelize)
        const updateSupplierUseCase = await new UpdateSupplierUseCase(supplierRepository)
        const createSupplierUseCase = await new CreateSupplierUseCase(supplierRepository)

        const supplier: any = {
            name: "Osvaldo",
            password: "654123"
        }

        const updateSupplier: any = {
            name: "Osvaldo Code",
            password: "654123"
        }

        let response: any = await createSupplierUseCase.execute(supplier)
        expect(async () => {return await updateSupplierUseCase.execute(updateSupplier, response.dataValues.id)}).not.toThrow()
    })

    test("Deve deletar um supplier pelo id", async () => {
        const supplierRepository = await new SupplierRepository(sequelize)
        const deleteSupplierUseCase = await new DeleteSupplierUseCase(supplierRepository)
        const createSupplierUseCase = await new CreateSupplierUseCase(supplierRepository)

        const supplier: any = {
            name: "Osvaldo",
            password: "654123"
        }

        let response: any = await createSupplierUseCase.execute(supplier)
        expect(async () => {return await deleteSupplierUseCase.execute(response.dataValues.id)}).not.toThrow()
    })
        
    /// Person UsesCases

    test("Deve criar um person", async () => {
        const personRepository = await new PersonRepository(sequelize)
        const createPersonUseCase = await new CreatePersonUseCase(personRepository)

        const person: any = {
            name: "Gabriel",
            password: "654123",
            type: "PJ"
        }

        expect(async () => {return await createPersonUseCase.execute(person)}).not.toThrow()
    })

    test("Deve retornar todos os person cadastrado", async () => {
        const personRepository = await new PersonRepository(sequelize)
        const createPersonUseCase = await new CreatePersonUseCase(personRepository)
        const findAllPersonUseCase = await new FindAllPersonsUseCase(personRepository)

        const person: any = {
            name: "Gabriel",
            password: "654123",
            type: "PJ"
        }

        await createPersonUseCase.execute(person)
        expect(async () => {return await findAllPersonUseCase.execute()}).not.toThrow()
    })

    test("Deve retornar um person cadastrado pelo id", async () => {
        const personRepository = await new PersonRepository(sequelize)
        const createPersonUseCase = await new CreatePersonUseCase(personRepository)
        const findByIdPersonUseCase = await new FindByIdPersonUseCase(personRepository)

        const person: any = {
            name: "Gabriel",
            password: "654123",
            type: "PJ"
        }

        let response: any = await createPersonUseCase.execute(person)
        expect(async () => {return await findByIdPersonUseCase.execute(response.dataValues.id)}).not.toThrow()
    })

    test("Deve atualizar um person cadastrado pelo id", async () => {
        const personRepository = await new PersonRepository(sequelize)
        const createPersonUseCase = await new CreatePersonUseCase(personRepository)
        const updatePersonUseCase = await new UpdatePersonUseCase(personRepository)

        const person: any = {
            name: "Gabriel",
            password: "654123",
            type: "PJ"
        }

        const updatePerson: any = {
            name: "Gabriel Marcos",
            password: "654123",
            type: "CLT"
        }

        let response: any = await createPersonUseCase.execute(person)
        expect(async () => {return await updatePersonUseCase.execute(updatePerson, response.dataValues.id)}).not.toThrow()
    })

    test("Deve deletar um person cadastrado pelo id", async () => {
        const personRepository = await new PersonRepository(sequelize)
        const createPersonUseCase = await new CreatePersonUseCase(personRepository)
        const deletePersonUseCase = await new DeletePersonUseCase(personRepository)

        const person: any = {
            name: "Gabriel",
            password: "654123",
            type: "PJ"
        }

        let response: any = await createPersonUseCase.execute(person)
        expect(async () => {return await deletePersonUseCase.execute(response.dataValues.id)}).not.toThrow()
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