import { IPersonRepository } from "../repositories/IPersonRepository"
import { ISupplierRepository } from "../repositories/ISupplierRepository"
import { CreatePersonUseCase } from "../useCases/CreatePerson/createPersonUseCase"
import { CreateSupplierUseCase } from "../useCases/CreateSupplier/createSupplierUseCase"
import { DeletePersonUseCase } from "../useCases/DeletePerson/deletePersonUseCase"
import { DeleteSupplierUseCase } from "../useCases/DeleteSupplier/deleteSupplierUseCase"
import { FindAllPersonsUseCase } from "../useCases/FindAllPerson/findAllPersonUseCase"
import { FindAllSuppliersUseCase } from "../useCases/FindAllSupplier/findAllSupplierUseCase"
import { FindByIdPersonUseCase } from "../useCases/FindByIdPerson/findByIdPersonUseCase"
import { FindByIdSupplierUseCase } from "../useCases/FindByIdSupplier/findByIdSupplierUseCase"
import { UpdatePersonUseCase } from "../useCases/UpdatePerson/updatePersonUseCase"
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