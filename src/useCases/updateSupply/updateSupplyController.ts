import { Request, Response } from 'express'
import { UpdateSupplyUseCase } from './updateSupplyUseCase'
import { IUpdateSupplyRequestDTO } from './updateSupplyDTO'

export class UpdateSupplyController {
    constructor(
        private updateSupplyUseCase: UpdateSupplyUseCase
    ) {}

    async handle(request: Request, response: Response) {
        const data:IUpdateSupplyRequestDTO = request.body
        const { id } = request.params
        await this.updateSupplyUseCase.execute(data, id)
        return response.json("ok")
    }
}