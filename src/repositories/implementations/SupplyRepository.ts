import sequelize from "../../database/connection"
import { Supply } from "../../types/Supply"
import { ISupplyRepository } from "../ISupplyRepository"

export class SupplyRepository implements ISupplyRepository {
    
    async findById(id: string): Promise<Supply | null> {
        const result: Supply | null = await sequelize.models.Supply.findByPk(id) as Supply | null
        return result
    }
    async findAll(): Promise<Supply[]> {
        const result = await sequelize.models.Supply.findAll()
        const supplies: Supply[] = []
        result.forEach((supply: any) => {
            supplies.push(supply)
        })
        return supplies
    }
    
    async save(supply: Supply): Promise<unknown> {
        const supplyCreated = await sequelize.models.Supply.create({
            ...supply
        })

        return supplyCreated
    }

    async remove(id: string): Promise<void> {
        await sequelize.models.Supply.destroy({
            where: {
                id
            }
        })
    }

    async update(supply: Supply, id: string): Promise<unknown> {
        const supplyUpdated = await sequelize.models.Supply.update({
            ...supply
        }, {
            where: {
                id
            }
        })

        return supplyUpdated
    }

}