import Filters from '@/components/filters'
import MobileFilter from '@/components/mobile-filters'
import ProductList from '@/components/product-list'
import ProductSkeleton from '@/components/product-skeleton'
import Sort from '@/components/sort'
import { Suspense } from 'react'

export default function HomePage() {
    return (
        <main className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24'>
                <h1 className='text-4xl font-bold tracking-tight text-gray-900'>
                    High-quality cotton selection
                </h1>

                <div className='flex items-center'>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Sort />
                    </Suspense>
                    <MobileFilter />
                </div>
            </div>

            <section className='pb-24 pt-6'>
                <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
                    <div className='hidden lg:block'>
                        <Filters />
                    </div>

                    <Suspense fallback={<ProductSkeleton />}>
                        <ProductList />
                    </Suspense>
                </div>
            </section>
        </main>
    )
}
