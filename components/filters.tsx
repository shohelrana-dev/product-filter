'use client'
import { Suspense } from 'react'
import CategoryFilter from './filters/category-filter'
import PriceFilter from './filters/price-filter'
import SizeFilter from './filters/size-filter'
import { Accordion } from './ui/accordion'

export default function Filters() {
    return (
        <Accordion type='multiple' defaultValue={['category', 'size', 'price']}>
            <Suspense fallback={<div>Loading...</div>}>
                <CategoryFilter />
                <SizeFilter />
                <PriceFilter />
            </Suspense>
        </Accordion>
    )
}
