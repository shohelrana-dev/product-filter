import { z } from 'zod'

export const AVAILABLE_SIZES = ['xs', 's', 'm', 'l', 'xl'] as const
export const AVAILABLE_COLORS = ['white', 'beige', 'blue', 'green', 'purple'] as const
export const AVAILABLE_SORTS = ['none', 'price-asc', 'price-desc'] as const

export const ProductFilterValidator = z.object({
    size: z.array(z.enum(AVAILABLE_SIZES)),
    color: z.array(z.enum(AVAILABLE_COLORS)),
    sort: z.enum(['none', 'price-asc', 'price-desc']),
    price: z.tuple([z.number(), z.number()]),
})

export type ProductFilterState = Omit<z.infer<typeof ProductFilterValidator>, 'price'> & {
    price: { isCustom: boolean; range: [number, number] }
}