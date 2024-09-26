import { IPersonRepository } from "../repositories/IPersonRepository"
import { IProductRepository } from "../repositories/IProductRepository"
import { ISupplierRepository } from "../repositories/ISupplierRepository"
import { ISupplyRepository } from "../repositories/ISupplyRepository"
import { CreatePersonUseCase } from "../useCases/CreatePerson/createPersonUseCase"
import { CreateProductUseCase } from "../useCases/CreateProduct/createProductUseCase"
import { CreateSupplierUseCase } from "../useCases/CreateSupplier/createSupplierUseCase"
import { CreateSupplyUseCase } from "../useCases/CreateSupply/createSupplyUseCase"
import { DeletePersonUseCase } from "../useCases/DeletePerson/deletePersonUseCase"
import { DeleteProductUseCase } from "../useCases/DeleteProduct/deleteProductUseCase"
import { DeleteSupplierUseCase } from "../useCases/DeleteSupplier/deleteSupplierUseCase"
import { DeleteSupplyUseCase } from "../useCases/DeleteSupply/deleteSupplyUseCase"
import { FindAllPersonsUseCase } from "../useCases/FindAllPerson/findAllPersonUseCase"
import { FindAllProductsUseCase } from "../useCases/FindAllProduct/findAllProductsUsecase"
import { FindAllSuppliersUseCase } from "../useCases/FindAllSupplier/findAllSupplierUseCase"
import { FindAllSuppliesUseCase } from "../useCases/FindAllSupply/findAllSuppliesUseCase"
import { FindByIdPersonUseCase } from "../useCases/FindByIdPerson/findByIdPersonUseCase"
import { FindByIdProductUseCase } from "../useCases/FindByIdProduct/findByIdProductUseCase"
import { FindByIdSupplierUseCase } from "../useCases/FindByIdSupplier/findByIdSupplierUseCase"
import { FindByIdSupplyUseCase } from "../useCases/FindByIdSupply/findByIdSupplierUseCase"
import { UpdatePersonUseCase } from "../useCases/UpdatePerson/updatePersonUseCase"
import { UpdateProductUseCase } from "../useCases/UpdateProduct/updateProductUseCase"
import { UpdateSupplierUseCase } from "../useCases/UpdateSupplier/updateSupplierUseCase"
import { UpdateSupplyUseCase } from "../useCases/UpdateSupply/updateSupplyUseCase"


describe("Unit tests", () => {

    const hash = jest.fn().mockReturnValue("###########")

    const repositoryPerson: IPersonRepository = {
        save: jest.fn(),
        findAll: jest.fn(),
        findById: jest.fn(),
        findByName: jest.fn(),
        remove: jest.fn(),
        update: jest.fn()
    }

    const repositorySupplier: ISupplierRepository = {
        save: jest.fn(),
        findAll: jest.fn(),
        findById: jest.fn(),
        remove: jest.fn(),
        update: jest.fn()
    }

    const repositoryProduct: IProductRepository = {
        save: jest.fn(),
        findAll: jest.fn(),
        findById: jest.fn(),
        findBySupplierId: jest.fn(),
        remove: jest.fn(),
        update: jest.fn()
    }

    const repositorySupply: ISupplyRepository = {
        save: jest.fn(),
        findAll: jest.fn(),
        findById: jest.fn(),
        remove: jest.fn(),
        update: jest.fn()
    }

  
    // Unit Tests - Supplier

    it("Deve criar um supplier", async () => {
        const mockSupplier = {
            id: "550e8400-e29b-41d4-a716-446655440000", 
            name: "teste",
            image: "https://example.com/image.jpg", 
            password: "senhaSuperSecreta123!"
        }
    
        repositorySupplier.save = jest.fn().mockResolvedValue(mockSupplier)
        const createSupplierUseCase = new CreateSupplierUseCase(repositorySupplier, hash)
        
        await expect(createSupplierUseCase.execute(mockSupplier)).resolves.toEqual(mockSupplier)
    })
    
    it("Deve retornar todos os produtos cadastrados", async () => {

        const mockSuppliers = [
            { id: "1", name: "Supplier 1", image: "https://example.com/image1.jpg" },
            { id: "2", name: "Supplier 2", image: "https://example.com/image2.jpg" },
        ]
    
        repositorySupplier.findAll = jest.fn().mockResolvedValue(mockSuppliers)
        const findAllSupplierUseCase = new FindAllSuppliersUseCase(repositorySupplier)

        await expect(findAllSupplierUseCase.execute()).resolves.toEqual(mockSuppliers)
    })

    it("Deve retornar o supplier pelo id", async () => {

        const mockSupplier = {
            id: "550e8400-e29b-41d4-a716-446655440000",
            name: "Supplier Test",
            image: "https://example.com/image.jpg",
        }
    
        repositorySupplier.findById = jest.fn().mockResolvedValue(mockSupplier)
        const findBySupplierUseCase = new FindByIdSupplierUseCase(repositorySupplier)
    
        await expect(findBySupplierUseCase.execute(mockSupplier.id)).resolves.toEqual(mockSupplier)
    })

    it("Deve atualizar um supplier cadastrado pelo id", async () => {
        const mockSupplierId = "550e8400-e29b-41d4-a716-446655440000"
    
        const existingSupplier = {
            id: mockSupplierId,
            name: "Old Supplier",
            geolocalization: { type: "Point", coordinates: [0, 0] },
            image: "https://example.com/old-image.jpg",
            password: "oldPassword",
        }
    
        const updatedData = {
            name: "Updated Supplier",
            image: "https://example.com/new-image.jpg",
        }
    
        repositorySupplier.findById = jest.fn().mockResolvedValue(existingSupplier)
        repositorySupplier.update = jest.fn().mockResolvedValue(existingSupplier)
    
        const updateSupplierUseCase = new UpdateSupplierUseCase(repositorySupplier)
    
        await expect(updateSupplierUseCase.execute(updatedData, mockSupplierId)).resolves.toEqual({
            ...existingSupplier,
            ...updatedData,
        })
    })

    it("Deve deletar um supplier pelo id", async () => {
        const mockSupplierId = "550e8400-e29b-41d4-a716-446655440000"

        repositorySupplier.remove = jest.fn().mockResolvedValue(undefined) 
    
        const deleteSupplierUseCase = new DeleteSupplierUseCase(repositorySupplier)
        await expect(deleteSupplierUseCase.execute(mockSupplierId)).resolves.toEqual("Supplier deleted successfully")

        expect(repositorySupplier.remove).toHaveBeenCalledWith(mockSupplierId)
    })
    
    // Unit Tests - Person 

    it("Deve criar um person", async () => {
        const mockPerson = {
            id: "a1b2c3d4e5",
            name: "João da Silva",
            type: "Cliente",
            password: "senhaSegura123!",
        }

        repositoryPerson.save = jest.fn().mockResolvedValue(mockPerson)
        const createPersonUseCase = new CreatePersonUseCase(repositoryPerson, hash)
        await expect(createPersonUseCase.execute(mockPerson)).resolves.toEqual(mockPerson)
    })

    it("Deve retornar todos os persons cadastrados", async () => {

        const mockPersons = [
            { id: "a1b2c3d4e5", name: "João da Silva", type: "Cliente", password: "senhaSegura123!"},
            { id: "f6g7h8i9j0", name: "Maria Oliveira", type: "Fornecedor", password: "senhaSegura456!"},
        ]
    
        repositoryPerson.findAll = jest.fn().mockResolvedValue(mockPersons)
        const findAllPersonsUseCase = new FindAllPersonsUseCase(repositoryPerson)
        await expect(findAllPersonsUseCase.execute()).resolves.toEqual(mockPersons)
    })

    it("Deve retornar um person cadastrado pelo id", async () => {

        const mockPerson = {
            id: "a1b2c3d4e5",
            name: "João da Silva",
            type: "Cliente",
            password: "senhaSegura123!",
        }
    
        repositoryPerson.findById = jest.fn().mockResolvedValue(mockPerson)
        const findByIdPersonUseCase = new FindByIdPersonUseCase(repositoryPerson)
    
        await expect(findByIdPersonUseCase.execute(mockPerson.id)).resolves.toEqual(mockPerson)
    })

    it("Deve atualizar um person cadastrado pelo id", async () => {
        const mockPersonId = "a1b2c3d4e5"
        
        const existingPerson = {
            id: mockPersonId,
            name: "João da Silva",
            type: "Cliente",
            password: "senhaSegura123!",
            contact: ["(11) 91234-5678"],
        }
        
        const updatedData = {
            name: "João Atualizado",
            contact: ["(11) 98765-4321"],
        }
        
        repositoryPerson.findById = jest.fn().mockResolvedValue(existingPerson)
        repositoryPerson.update = jest.fn().mockResolvedValue({ ...existingPerson, ...updatedData })
        
        const updatePersonUseCase = new UpdatePersonUseCase(repositoryPerson)
        
        await expect(updatePersonUseCase.execute(updatedData, mockPersonId)).resolves.toEqual({
            ...existingPerson,
            ...updatedData,
        })
    })

    it("Deve deletar um person pelo id", async () => {
        const mockPersonId = "a1b2c3d4e5"
    
        repositoryPerson.remove = jest.fn().mockResolvedValue(undefined)
        
        const deletePersonUseCase = new DeletePersonUseCase(repositoryPerson)
        
        await expect(deletePersonUseCase.execute(mockPersonId)).resolves.toEqual("Person deleted successfully")
    
        expect(repositoryPerson.remove).toHaveBeenCalledWith(mockPersonId)
    })

    // Unit Tests - Product 

    it("Deve criar um product", async () => {
        const mockProduct = {
            barcode: "1234567890123",
            name: "Produto Exemplo",
            description: "Descrição do Produto Exemplo",
            price: 19.99,
            batch: "Lote123",
            manufacturing_date: "2023-01-15",
            expiration_date: "2025-01-15",
            image: "https://example.com/imagem-produto.jpg",
            ammount: 100,
            type: "Categoria A",
            supplier_id: "550e8400-e29b-41d4-a716-446655440000",
        }
    
        repositoryProduct.save = jest.fn().mockResolvedValue(mockProduct)
        const createProductUseCase = new CreateProductUseCase(repositoryProduct)
    
        await expect(createProductUseCase.execute(mockProduct)).resolves.toEqual(mockProduct)
    })
    
    it("Deve retornar todos os products cadastrados", async () => {
        const mockProducts = [
            {
                barcode: "1234567890123",
                name: "Produto Exemplo 1",
                description: "Descrição do Produto 1",
                price: 19.99,
                batch: "Lote123",
                manufacturing_date: "2023-01-15",
                expiration_date: "2025-01-15",
                image: "https://example.com/imagem-produto1.jpg",
                ammount: 100,
                type: "Categoria A",
                supplier_id: "550e8400-e29b-41d4-a716-446655440000",
            },
            {
                barcode: "9876543210987",
                name: "Produto Exemplo 2",
                description: "Descrição do Produto 2",
                price: 29.99,
                batch: "Lote456",
                manufacturing_date: "2023-02-10",
                expiration_date: "2025-02-10",
                image: "https://example.com/imagem-produto2.jpg",
                ammount: 50,
                type: "Categoria B",
                supplier_id: "12345678-e29b-41d4-a716-446655440001",
            },
        ]
    
        repositoryProduct.findAll = jest.fn().mockResolvedValue(mockProducts)
        const findAllProductsUseCase = new FindAllProductsUseCase(repositoryProduct)
    
        await expect(findAllProductsUseCase.execute()).resolves.toEqual(mockProducts)
    })

    it("Deve retornar um product cadastrado pelo id", async () => {
        const mockProduct = {
            barcode: "1234567890123",
            name: "Produto Exemplo",
            description: "Descrição do Produto Exemplo",
            price: 19.99,
            batch: "Lote123",
            manufacturing_date: "2023-01-15",
            expiration_date: "2025-01-15",
            image: "https://example.com/imagem-produto.jpg",
            ammount: 100,
            type: "Categoria A",
            supplier_id: "550e8400-e29b-41d4-a716-446655440000",
        }
    
        repositoryProduct.findById = jest.fn().mockResolvedValue(mockProduct)
        const findByIdProductUseCase = new FindByIdProductUseCase(repositoryProduct)
    
        await expect(findByIdProductUseCase.execute(mockProduct.barcode)).resolves.toEqual(mockProduct)
    })

    it("Deve atualizar um product cadastrado pelo id", async () => {
        const mockProductId = "1234567890123"
        const mockSupplierId = "550e8400-e29b-41d4-a716-446655440000"
    
        const existingProduct = {
            barcode: mockProductId,
            name: "Produto Exemplo",
            description: "Descrição do Produto Exemplo",
            price: 19.99,
            batch: "Lote123",
            manufacturing_date: "2023-01-15",
            expiration_date: "2025-01-15",
            image: "https://example.com/imagem-produto.jpg",
            ammount: 100,
            type: "Categoria A",
            supplier_id: mockSupplierId,
        }
    
        const updatedData = {
            name: "Produto Atualizado",
            price: 24.99,
        }
    
        repositoryProduct.findById = jest.fn().mockResolvedValue(existingProduct)
        repositoryProduct.update = jest.fn().mockResolvedValue({ ...existingProduct, ...updatedData })
    
        const updateProductUseCase = new UpdateProductUseCase(repositoryProduct)
    
        await expect(updateProductUseCase.execute(updatedData, mockProductId, mockSupplierId)).resolves.toEqual({
            ...existingProduct,
            ...updatedData,
        })
    })
    
    it("Deve deletar um product pelo id", async () => {
        const mockProductId = "1234567890123"
        const mockSupplierId = "550e8400-e29b-41d4-a716-446655440000"
    
        const existingProduct = {
            barcode: mockProductId,
            name: "Produto Exemplo",
            supplier_id: mockSupplierId,
        }
    
        repositoryProduct.findById = jest.fn().mockResolvedValue(existingProduct)
        repositoryProduct.remove = jest.fn().mockResolvedValue(undefined)
        
        const deleteProductUseCase = new DeleteProductUseCase(repositoryProduct)
        
        await expect(deleteProductUseCase.execute(mockProductId, mockSupplierId)).resolves.toBeUndefined()
    
        expect(repositoryProduct.remove).toHaveBeenCalledWith(mockProductId)
    })
    

    // Unit Tests - Supply 

    it("Deve criar um supply", async () => {
        const mockSupply = {
            id: "f47ac10b-58cc-4372-a567-0e02b2c3d479", 
            product_id: "550e8400-e29b-41d4-a716-446655440000", 
            supplier_id: "550e8400-e29b-41d4-a716-446655440001", 
            person_id: "550e8400-e29b-41d4-a716-446655440002" 
        }
    
        repositorySupply.save = jest.fn().mockResolvedValue(mockSupply)
        const createSupplyUseCase = new CreateSupplyUseCase(repositorySupply)
        await expect(createSupplyUseCase.execute(mockSupply)).resolves.toEqual(mockSupply)
    })

    it("Deve retornar todos os supplies cadastrados", async () => {
        const mockSupplies = [
            {
                id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
                product_id: "550e8400-e29b-41d4-a716-446655440000", 
                supplier_id: "550e8400-e29b-41d4-a716-446655440001", 
                person_id: "550e8400-e29b-41d4-a716-446655440002"
            },
            {
                id: "a0eeb6a0-7d58-4c2c-8e84-6c71c0d7c12a", 
                product_id: "550e8400-e29b-41d4-a716-446655440003", 
                supplier_id: "550e8400-e29b-41d4-a716-446655440004", 
                person_id: "550e8400-e29b-41d4-a716-446655440005" 
            }
        ]
    
        repositorySupply.findAll = jest.fn().mockResolvedValue(mockSupplies)
        const findAllSupplyUseCase = new FindAllSuppliesUseCase(repositorySupply)
        await expect(findAllSupplyUseCase.execute()).resolves.toEqual(mockSupplies)
    })

    it("Deve retornar um supply cadastrado pelo id", async () => {
        const mockSupply = {
            id: "f47ac10b-58cc-4372-a567-0e02b2c3d479", 
            product_id: "550e8400-e29b-41d4-a716-446655440000", 
            supplier_id: "550e8400-e29b-41d4-a716-446655440001", 
            person_id: "550e8400-e29b-41d4-a716-446655440002"
        }
    
        repositorySupply.findById = jest.fn().mockResolvedValue(mockSupply)
        const findByIdSupplyUseCase = new FindByIdSupplyUseCase(repositorySupply)
    
        await expect(findByIdSupplyUseCase.execute(mockSupply.id)).resolves.toEqual(mockSupply)
    })
    
    it("Deve atualizar um supply cadastrado pelo id", async () => {
        const mockSupplyId = "f47ac10b-58cc-4372-a567-0e02b2c3d479"
    
        const existingSupply = {
            id: mockSupplyId,
            product_id: "550e8400-e29b-41d4-a716-446655440000", 
            supplier_id: "550e8400-e29b-41d4-a716-446655440001", 
            person_id: "550e8400-e29b-41d4-a716-446655440002" 
        }
    
        const updatedData = {
            product_id: "550e8400-e29b-41d4-a716-446655440005", 
        }
    
        repositorySupply.findById = jest.fn().mockResolvedValue(existingSupply)
        repositorySupply.update = jest.fn().mockResolvedValue({
            ...existingSupply,
            ...updatedData,
        })
    
        const updateSupplyUseCase = new UpdateSupplyUseCase(repositorySupply)
    
        await expect(updateSupplyUseCase.execute(updatedData, mockSupplyId)).resolves.toEqual({
            ...existingSupply,
            ...updatedData,
        })
    })

    it("Deve deletar um supply pelo id", async () => {
        const mockSupplyId = "f47ac10b-58cc-4372-a567-0e02b2c3d479"
        repositorySupply.remove = jest.fn().mockResolvedValue(undefined) 
    
        const deleteSupplyUseCase = new DeleteSupplyUseCase(repositorySupply)
        await expect(deleteSupplyUseCase.execute(mockSupplyId)).resolves.toEqual("Supply deleted successfully")
    
        expect(repositorySupply.remove).toHaveBeenCalledWith(mockSupplyId)
    })

})