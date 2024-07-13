import { ISupplierRepository } from "../../repositories/ISupplierRepository"
import fs from "fs"


export class FindByIdSupplierUseCase {

    constructor(
        private supplierRepository: ISupplierRepository
    ) {}

    async execute(id: string) {
        const person = await this.supplierRepository.findById(id)
        if(person?.image){
            fs.writeFileSync("./files/" +  id + ".png", person.image, {encoding: "base64"})
            return true
        }
        return false
    }
}