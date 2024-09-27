import { z } from "zod"

export const CreatePersonDTO = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }),
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    }),
    address: z.object({type: z.string(), coordinates: z.array(z.number()), crs: z.any().optional() }).optional(),
    type: z.string({
        required_error: "Type is required",
        invalid_type_error: "Type must be a string",
    }),
    contact: z.array(z.string()).optional(),
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
    })
})