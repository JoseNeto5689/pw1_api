import axios from "axios";
import sequelize from "../database/index"
import { CreateProductUseCase } from "../useCases/CreateProduct/createProductUseCase";
import { ProductRepository } from "../repositories/implementations/ProductRepository";
import { FindAllProductsUseCase } from "../useCases/FindAllProduct/findAllProductsUsecase";
import { FindByIdProductUseCase } from "../useCases/FindByIdProduct/findByIdProductUseCase";

describe("testando caso de usos relacionados a product", () => {
    let token: string
    let postPersonResponse: any

    beforeEach(async () => {

        const person = {
            name: "José",
            type: "PF",
            password: "ponteiro"
        }

        postPersonResponse = await axios.post("http://localhost:3000/person", person)

        const authResponse = await axios.post("http://localhost:3000/auth/person", {
            "id": postPersonResponse.data.id,
            "password": "ponteiro"
        })
        expect(authResponse.status).toBe(200)
        token = authResponse.data.token
    })

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
            supplier_id: postPersonResponse.data.id
        };
        
        expect(async () => {return await createProductRepository.execute(product)}).not.toThrow()
    })

    test("Deve retornar todos os produtos cadastrados", async () => {
        const productRepository = new ProductRepository(sequelize)
        const findAllProductRepository = new FindAllProductsUseCase(productRepository)

        expect(async () => {return await findAllProductRepository.execute()}).not.toThrow()
    })

    test("Deve retornar retornar o produto cadastrado pelo seu id", async () => {
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
            supplier_id: postPersonResponse.data.id
        };

        let postProduct = await axios.post("http://localhost:3000/product", product, {
            headers: {
                "Authorization": `Bearer ${token}`
            }})

        expect(async () => {return await findByIdProductUseCase.execute(postProduct.data.barcode)}).not.toThrow()
    })

})
