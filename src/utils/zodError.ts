import { ZodIssue } from "zod"

export function generateMessage(error: ZodIssue){
    return `The request returned the following error: ${error.code} to ${error.path.join(" > ")}; ${error.message}`
}

export function generateMessageArray(errors: {issues: []}){
    return errors.issues.map((error: ZodIssue) => {
        return generateMessage(error)
    })
}