'use client'
import { Product } from '@/data'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import EmptyState from './empty-state'
import ProductCard from './product-card'
import ProductSkeleton from './product-skeleton'

export default function ProductList() {
    const searchParams = useSearchParams()
    const { data: products } = useQuery({
        queryKey: ['products', searchParams.toString()],
        queryFn: async () => {
            const { data } = await axios.get<Product[]>(
                `http://localhost:3000/api/products?${searchParams.toString()}`
            )
            return data
        },
    })

    return (
        <ul className='lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
            {products && products.length === 0 ? (
                <EmptyState />
            ) : products ? (
                products.map((product) => <ProductCard key={product.id} product={product!} />)
            ) : (
                new Array(12).fill(null).map((_, i) => <ProductSkeleton key={i} />)
            )}
        </ul>
    )
}
