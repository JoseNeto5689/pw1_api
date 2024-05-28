import { z } from "zod"

export const CreatePersonDTO = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }),
    address: z.string().optional(),
    type: z.string({
        required_error: "Type is required",
        invalid_type_error: "Type must be a string",
    }),
    contact: z.array(z.string()).optional(),
})