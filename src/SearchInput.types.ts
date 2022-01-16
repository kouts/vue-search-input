export const fieldType = ['search', 'text'] as const

export type FieldType = typeof fieldType[number]
