export type FieldValidatorsType = (value: string) => undefined | string



export const required: FieldValidatorsType = (value) => {
    if (value) return undefined
    return "The field is required"
}