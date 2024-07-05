import { z } from "zod"


export const CreateSupplierDTO = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }),
    geolocalization: z.object({type: z.string(), coordinates: z.array(z.number()), crs: z.any().optional() }).optional(),
    image: z.string().optional(),
})