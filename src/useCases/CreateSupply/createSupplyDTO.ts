import { z } from "zod"

export const CreateSupplyDTO = z.object({
    product_id: z.string({
        required_error: "Product is required",
        invalid_type_error: "Product must be a string",
    }),
    person_id: z.string({
        required_error: "Person is required",
        invalid_type_error: "Person must be a string",
    }),
})