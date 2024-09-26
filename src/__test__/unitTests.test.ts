import { IPersonRepository } from "../repositories/IPersonRepository"
import { IProductRepository } from "../repositories/IProductRepository"
import { ISupplierRepository } from "../repositories/ISupplierRepository"
import { CreatePersonUseCase } from "../useCases/CreatePerson/createPersonUseCase"
import { CreateProductUseCase } from "../useCases/CreateProduct/createProductUseCase"
import { CreateSupplierUseCase } from "../useCases/CreateSupplier/createSupplierUseCase"
import { DeletePersonUseCase } from "../useCases/DeletePerson/deletePersonUseCase"
import { DeleteProductUseCase } from "../useCases/DeleteProduct/deleteProductUseCase"
import { DeleteSupplierUseCase } from "../useCases/DeleteSupplier/deleteSupplierUseCase"
import { FindAllPersonsUseCase } from "../useCases/FindAllPerson/findAllPersonUseCase"
import { FindAllProductsUseCase } from "../useCases/FindAllProduct/findAllProductsUsecase"
import { FindAllSuppliersUseCase } from "../useCases/FindAllSupplier/findAllSupplierUseCase"
import { FindByIdPersonUseCase } from "../useCases/FindByIdPerson/findByIdPersonUseCase"
import { FindByIdProductUseCase } from "../useCases/FindByIdProduct/findByIdProductUseCase"
import { FindByIdSupplierUseCase } from "../useCases/FindByIdSupplier/findByIdSupplierUseCase"
import { UpdatePersonUseCase } from "../useCases/UpdatePerson/updatePersonUseCase"
import { UpdateProductUseCase } from "../useCases/UpdateProduct/updateProductUseCase"
import { UpdateSupplierUseCase } from "../useCases/UpdateSupplier/updateSupplierUseCase"


describe("Unit tests", () => {

    const hash = jest.fn().mockReturnValue("###########")

    const repositoryPerson: IPersonRepository = {
        save: jest.fn().mockReturnValue("Ola"),
        findAll: jest.fn(),
        findById: jest.fn(),
        findByName: jest.fn(),
        remove: jest.fn(),
        update: jest.fn()
    }

    const repositorySupplier: ISupplierRepository = {
        save: jest.fn().mockReturnValue("supplier"),
        findAll: jest.fn(),
        findById: jest.fn(),
        remove: jest.fn(),
        update: jest.fn()
    }

    const repositoryProduct: IProductRepository = {
        save: jest.fn().mockReturnValue("product"),
        findAll: jest.fn(),
        findById: jest.fn(),
        findBySupplierId: jest.fn(),
        remove: jest.fn(),
        update: jest.fn()
    }

  
    // Unit Tests - Supplier

    it('Deve criar um supplier', async () => {
        const mockSupplier = {
            id: '550e8400-e29b-41d4-a716-446655440000', 
            name: "teste",
            image: 'https://example.com/image.jpg', 
            password: 'senhaSuperSecreta123!'
        };
    
        repositorySupplier.save = jest.fn().mockResolvedValue(mockSupplier);
        const createSupplierUseCase = new CreateSupplierUseCase(repositorySupplier, hash);
        
        await expect(createSupplierUseCase.execute(mockSupplier)).resolves.toEqual(mockSupplier);
    })
    
    it('Deve retornar todos os produtos cadastrados', async () => {

        const mockSuppliers = [
            { id: '1', name: 'Supplier 1', image: 'https://example.com/image1.jpg' },
            { id: '2', name: 'Supplier 2', image: 'https://example.com/image2.jpg' },
        ];
    
        repositorySupplier.findAll = jest.fn().mockResolvedValue(mockSuppliers);
        const findAllSupplierUseCase = new FindAllSuppliersUseCase(repositorySupplier);

        await expect(findAllSupplierUseCase.execute()).resolves.toEqual(mockSuppliers);
    })

    it('Deve retornar o supplier pelo id', async () => {

        const mockSupplier = {
            id: '550e8400-e29b-41d4-a716-446655440000',
            name: 'Supplier Test',
            image: 'https://example.com/image.jpg',
        };
    
        repositorySupplier.findById = jest.fn().mockResolvedValue(mockSupplier);
        const findBySupplierUseCase = new FindByIdSupplierUseCase(repositorySupplier);
    
        await expect(findBySupplierUseCase.execute(mockSupplier.id)).resolves.toEqual(mockSupplier);
    })

    it('Deve atualizar um supplier cadastrado pelo id', async () => {
        const mockSupplierId = '550e8400-e29b-41d4-a716-446655440000';
    
        const existingSupplier = {
            id: mockSupplierId,
            name: 'Old Supplier',
            geolocalization: { type: 'Point', coordinates: [0, 0] },
            image: 'https://example.com/old-image.jpg',
            password: 'oldPassword',
        };
    
        const updatedData = {
            name: 'Updated Supplier',
            image: 'https://example.com/new-image.jpg',
        };
    
        repositorySupplier.findById = jest.fn().mockResolvedValue(existingSupplier);
        repositorySupplier.update = jest.fn().mockResolvedValue(existingSupplier);
    
        const updateSupplierUseCase = new UpdateSupplierUseCase(repositorySupplier);
    
        await expect(updateSupplierUseCase.execute(updatedData, mockSupplierId)).resolves.toEqual({
            ...existingSupplier,
            ...updatedData,
        });
    })

    it('Deve deletar um supplier pelo id', async () => {
        const mockSupplierId = '550e8400-e29b-41d4-a716-446655440000';

        repositorySupplier.remove = jest.fn().mockResolvedValue(undefined); 
    
        const deleteSupplierUseCase = new DeleteSupplierUseCase(repositorySupplier);
        await expect(deleteSupplierUseCase.execute(mockSupplierId)).resolves.toEqual("Supplier deleted successfully");

        expect(repositorySupplier.remove).toHaveBeenCalledWith(mockSupplierId);
    })
    
    // Unit Tests - Person 

    it('Deve criar um person', async () => {
        const mockPerson = {
            id: 'a1b2c3d4e5',
            name: 'João da Silva',
            type: 'Cliente',
            password: 'senhaSegura123!',
        }

        repositoryPerson.save = jest.fn().mockResolvedValue(mockPerson)
        const createPersonUseCase = new CreatePersonUseCase(repositoryPerson, hash);
        await expect(createPersonUseCase.execute(mockPerson)).resolves.toEqual(mockPerson);
    })

    it('Deve retornar todos os persons cadastrados', async () => {

        const mockPersons = [
            { id: 'a1b2c3d4e5', name: 'João da Silva', type: 'Cliente', password: 'senhaSegura123!'},
            { id: 'f6g7h8i9j0', name: 'Maria Oliveira', type: 'Fornecedor', password: 'senhaSegura456!'},
        ];
    
        repositoryPerson.findAll = jest.fn().mockResolvedValue(mockPersons);
        const findAllPersonsUseCase = new FindAllPersonsUseCase(repositoryPerson);
        await expect(findAllPersonsUseCase.execute()).resolves.toEqual(mockPersons);
    })

    it('Deve retornar um person cadastrado pelo id', async () => {

        const mockPerson = {
            id: 'a1b2c3d4e5',
            name: 'João da Silva',
            type: 'Cliente',
            password: 'senhaSegura123!',
        };
    
        repositoryPerson.findById = jest.fn().mockResolvedValue(mockPerson);
        const findByIdPersonUseCase = new FindByIdPersonUseCase(repositoryPerson);
    
        await expect(findByIdPersonUseCase.execute(mockPerson.id)).resolves.toEqual(mockPerson);
    });

    it('Deve atualizar um person cadastrado pelo id', async () => {
        const mockPersonId = 'a1b2c3d4e5';
        
        const existingPerson = {
            id: mockPersonId,
            name: 'João da Silva',
            type: 'Cliente',
            password: 'senhaSegura123!',
            contact: ['(11) 91234-5678'],
        };
        
        const updatedData = {
            name: 'João Atualizado',
            contact: ['(11) 98765-4321'],
        };
        
        repositoryPerson.findById = jest.fn().mockResolvedValue(existingPerson);
        repositoryPerson.update = jest.fn().mockResolvedValue({ ...existingPerson, ...updatedData });
        
        const updatePersonUseCase = new UpdatePersonUseCase(repositoryPerson);
        
        await expect(updatePersonUseCase.execute(updatedData, mockPersonId)).resolves.toEqual({
            ...existingPerson,
            ...updatedData,
        });
    });

    it('Deve deletar um person pelo id', async () => {
        const mockPersonId = 'a1b2c3d4e5';
    
        repositoryPerson.remove = jest.fn().mockResolvedValue(undefined);
        
        const deletePersonUseCase = new DeletePersonUseCase(repositoryPerson);
        
        await expect(deletePersonUseCase.execute(mockPersonId)).resolves.toEqual("Person deleted successfully");
    
        expect(repositoryPerson.remove).toHaveBeenCalledWith(mockPersonId);
    });

    // Unit Tests - Product 

    it('Deve criar um product', async () => {
        const mockProduct = {
            barcode: '1234567890123',
            name: 'Produto Exemplo',
            description: 'Descrição do Produto Exemplo',
            price: 19.99,
            batch: 'Lote123',
            manufacturing_date: '2023-01-15',
            expiration_date: '2025-01-15',
            image: 'https://example.com/imagem-produto.jpg',
            ammount: 100,
            type: 'Categoria A',
            supplier_id: '550e8400-e29b-41d4-a716-446655440000',
        };
    
        repositoryProduct.save = jest.fn().mockResolvedValue(mockProduct);
        const createProductUseCase = new CreateProductUseCase(repositoryProduct);
    
        await expect(createProductUseCase.execute(mockProduct)).resolves.toEqual(mockProduct);
    });
    
    it('Deve retornar todos os products cadastrados', async () => {
        const mockProducts = [
            {
                barcode: '1234567890123',
                name: 'Produto Exemplo 1',
                description: 'Descrição do Produto 1',
                price: 19.99,
                batch: 'Lote123',
                manufacturing_date: '2023-01-15',
                expiration_date: '2025-01-15',
                image: 'https://example.com/imagem-produto1.jpg',
                ammount: 100,
                type: 'Categoria A',
                supplier_id: '550e8400-e29b-41d4-a716-446655440000',
            },
            {
                barcode: '9876543210987',
                name: 'Produto Exemplo 2',
                description: 'Descrição do Produto 2',
                price: 29.99,
                batch: 'Lote456',
                manufacturing_date: '2023-02-10',
                expiration_date: '2025-02-10',
                image: 'https://example.com/imagem-produto2.jpg',
                ammount: 50,
                type: 'Categoria B',
                supplier_id: '12345678-e29b-41d4-a716-446655440001',
            },
        ];
    
        repositoryProduct.findAll = jest.fn().mockResolvedValue(mockProducts);
        const findAllProductsUseCase = new FindAllProductsUseCase(repositoryProduct);
    
        await expect(findAllProductsUseCase.execute()).resolves.toEqual(mockProducts);
    });

    it('Deve retornar um product cadastrado pelo id', async () => {
        const mockProduct = {
            barcode: '1234567890123',
            name: 'Produto Exemplo',
            description: 'Descrição do Produto Exemplo',
            price: 19.99,
            batch: 'Lote123',
            manufacturing_date: '2023-01-15',
            expiration_date: '2025-01-15',
            image: 'https://example.com/imagem-produto.jpg',
            ammount: 100,
            type: 'Categoria A',
            supplier_id: '550e8400-e29b-41d4-a716-446655440000',
        };
    
        repositoryProduct.findById = jest.fn().mockResolvedValue(mockProduct);
        const findByIdProductUseCase = new FindByIdProductUseCase(repositoryProduct);
    
        await expect(findByIdProductUseCase.execute(mockProduct.barcode)).resolves.toEqual(mockProduct);
    });

    it('Deve atualizar um product cadastrado pelo id', async () => {
        const mockProductId = '1234567890123';
        const mockSupplierId = '550e8400-e29b-41d4-a716-446655440000';
    
        const existingProduct = {
            barcode: mockProductId,
            name: 'Produto Exemplo',
            description: 'Descrição do Produto Exemplo',
            price: 19.99,
            batch: 'Lote123',
            manufacturing_date: '2023-01-15',
            expiration_date: '2025-01-15',
            image: 'https://example.com/imagem-produto.jpg',
            ammount: 100,
            type: 'Categoria A',
            supplier_id: mockSupplierId,
        };
    
        const updatedData = {
            name: 'Produto Atualizado',
            price: 24.99,
        };
    
        repositoryProduct.findById = jest.fn().mockResolvedValue(existingProduct);
        repositoryProduct.update = jest.fn().mockResolvedValue({ ...existingProduct, ...updatedData });
    
        const updateProductUseCase = new UpdateProductUseCase(repositoryProduct);
    
        await expect(updateProductUseCase.execute(updatedData, mockProductId, mockSupplierId)).resolves.toEqual({
            ...existingProduct,
            ...updatedData,
        });
    });
    
    it('Deve deletar um product pelo id', async () => {
        const mockProductId = '1234567890123';
        const mockSupplierId = '550e8400-e29b-41d4-a716-446655440000';
    
        const existingProduct = {
            barcode: mockProductId,
            name: 'Produto Exemplo',
            supplier_id: mockSupplierId,
        };
    
        repositoryProduct.findById = jest.fn().mockResolvedValue(existingProduct);
        repositoryProduct.remove = jest.fn().mockResolvedValue(undefined);
        
        const deleteProductUseCase = new DeleteProductUseCase(repositoryProduct);
        
        await expect(deleteProductUseCase.execute(mockProductId, mockSupplierId)).resolves.toBeUndefined();
    
        expect(repositoryProduct.remove).toHaveBeenCalledWith(mockProductId);
    });
    

})