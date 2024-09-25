import { IPersonRepository } from "../repositories/IPersonRepository"
import { ISupplierRepository } from "../repositories/ISupplierRepository"
import { CreatePersonUseCase } from "../useCases/CreatePerson/createPersonUseCase"
import { CreateSupplierUseCase } from "../useCases/CreateSupplier/createSupplierUseCase"
import { DeleteSupplierUseCase } from "../useCases/DeleteSupplier/deleteSupplierUseCase"
import { FindAllSuppliersUseCase } from "../useCases/FindAllSupplier/findAllSupplierUseCase"
import { FindByIdSupplierUseCase } from "../useCases/FindByIdSupplier/findByIdSupplierUseCase"
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
    });
    

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
    });

    it('Deve deletar um supplier pelo id', async () => {
        const mockSupplierId = '550e8400-e29b-41d4-a716-446655440000';

        repositorySupplier.remove = jest.fn().mockResolvedValue(undefined); 
    
        const deleteSupplierUseCase = new DeleteSupplierUseCase(repositorySupplier);
        await expect(deleteSupplierUseCase.execute(mockSupplierId)).resolves.toEqual("Supplier deleted successfully");

        expect(repositorySupplier.remove).toHaveBeenCalledWith(mockSupplierId);
    });
    
    

    // it("should pass", () => {
    //     //Trocar o findAll esse para o save
    //     repositoryPerson.findAll = jest.fn().mockReturnValue("Ola")
    //     const createPersonUseCase = new CreatePersonUseCase(repositoryPerson, hash)
    //     createPersonUseCase.execute({
    //         name: "test",
    //         age: 1,
    //     })

    //     //Corrigir para esperar que o useCase n lançe um erro
    //     expect(1 + 1).toBe(2)
    // })
})