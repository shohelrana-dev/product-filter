import { Index } from '@upstash/vector'
import dotenv from 'dotenv'

dotenv.config()

export type Product = {
    id: string
    image: string
    name: string
    price: number
    size: 'xs' | 's' | 'm' | 'l' | 'xl'
    color: 'white' | 'beige' | 'blue' | 'green' | 'purple'
}

export const db = new Index<Product>()
