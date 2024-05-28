import { z } from "zod"


export const CreateSupplierDTO = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }),
    geolocalization: z.string().optional(),
    image: z.string().optional(),
})