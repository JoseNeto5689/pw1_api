import {PostgreSqlContainer} from "@testcontainers/postgresql"
import { sequelizeInitURI } from "../database/connection"

import { createSupplierUseCase } from "../useCases/CreateSupplier"
import { deleteSupplierUseCase } from "../useCases/DeleteSupplier"
import { findByIdSupplierUseCase } from "../useCases/FindByIdSupplier"
import { createProductUseCase } from "../useCases/CreateProduct"

describe("Unit tests with Use Cases without authentication", () => {
    jest.setTimeout(15000)
    let sequelize: any = null
    let container: any = null

    beforeEach(async () => {
        container = await new PostgreSqlContainer("postgis/postgis:latest").start()
        sequelize = sequelizeInitURI(container.getConnectionUri())
        await sequelize.sync({force: true})
    }) as { id: string, name: string, password: string }

    test("Deve criar um supplier", async () => {
        const supplier: any = {
            name: "Gabriel",
            password: "654123"
        }

        const response = await createSupplierUseCase.execute(supplier)

        expect(response).toHaveProperty('name')
        expect(response).toHaveProperty('password')  
    })

    test("Deve retornar um erro ao tentar criar um supplier com um nome vazio", async () => {
        const supplier: any = {
            name: "",
            password: "654123"
        }

        try {
            await createSupplierUseCase.execute(supplier)
        } catch (err: any) {
            expect(err).toBeInstanceOf(Error)
        }
    })

    test("Deve adicionar produto depois de já ter um fornecedor cadastrado", async () => {
        const response: any = await createSupplierUseCase.execute({
            name: "Gabriel",
            password: "654123"
        })

        const product = {
            name: "Manjar",
            price: 10.00,
            ammount: 10,
            description: "Doce de leite",
            batch: "0011",
            expiration_date: "2022-12-12T00:00:00.000Z",
            manufacturing_date: "2022-12-12T00:00:00.000Z",
            type: "Doce",
            image: null,
            supplier_id: response.id
        }

        const responseProduct = await createProductUseCase.execute(product)

        expect(responseProduct).toHaveProperty('name')
        expect(responseProduct).toHaveProperty('price')
        expect(responseProduct).toHaveProperty('ammount')
        expect(responseProduct).toHaveProperty('description')
        expect(responseProduct).toHaveProperty('batch')
        expect(responseProduct).toHaveProperty('expiration_date')
        expect(responseProduct).toHaveProperty('manufacturing_date')
        expect(responseProduct).toHaveProperty('expiration_date')
        expect(responseProduct).toHaveProperty('type')
        expect(responseProduct).toHaveProperty('supplier_id')
    })

    test("Deve retornar um erro ao tentar adicionar um produto sem um fornecedor cadastrado", async () => {
        const product = {
            name: "Manjar",
            price: 10.00,
            ammount: 10,
            description: "Doce de leite",
            batch: "0011",
            expiration_date: "2022-12-12T00:00:00.000Z",
            manufacturing_date: "2022-12-12T00:00:00.000Z",
            type: "Doce",
            image: null,
            supplier_id: "123"
        }

        try {
            await createProductUseCase.execute(product)
        } catch (err) {
            expect(err).toBeInstanceOf(Error)
        }
    })

    test("Deve deletar um fornecedor", async () => {
        const responseSupplier: any = await createSupplierUseCase.execute({
            name: "Gabriel",
            password: "654123"
        })
        console.log(responseSupplier)

        await deleteSupplierUseCase.execute(responseSupplier.id)
        try {
            await findByIdSupplierUseCase.execute(responseSupplier.id)
        } catch(err) {
            expect(err).toBeInstanceOf(Error)
        }
    })
})