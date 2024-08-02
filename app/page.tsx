'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Slider } from '@/components/ui/slider'
import { Product } from '@/db'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { QueryResult } from '@upstash/vector'
import axios from 'axios'
import { ChevronDown, Filter } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import EmptyState from './components/empty-state'
import ProductCard from './components/product-card'
import ProductSkeleton from './components/product-skeleton'

const SORT_OPTIONS = [
    { label: 'None', value: 'none' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
] as const

const CATEGORIES = [
    { label: 'Hoodies', value: 'hoodies' },
    { label: 'Sweatshirts', value: 'sweatshirts' },
    { label: 'Accessories', value: 'accessories' },
] as const

const COLOR_FILTERS = [
    { label: 'White', value: 'white' },
    { label: 'Beige', value: 'beige' },
    { label: 'Blue', value: 'blue' },
    { label: 'Green', value: 'green' },
    { label: 'Purple', value: 'purple' },
] as const

const SIZE_FILTERS = [
    { label: 'XS', value: 'xs' },
    { label: 'S', value: 's' },
    { label: 'M', value: 'm' },
    { label: 'L', value: 'l' },
    { label: 'XL', value: 'xl' },
] as const

const PRICE_FILTERS = [
    {
        id: 'price-any',
        label: 'Any price',
        value: {
            min: 0,
            max: 100,
        },
    },
    {
        id: 'price-under-20',
        label: 'Under 20$',
        value: {
            min: 0,
            max: 20,
            isCustom: false,
        },
    },
    {
        id: 'price-under-40',
        label: 'Under 40$',
        value: {
            min: 0,
            max: 40,
            isCustom: false,
        },
    },
    {
        id: 'price-custom',
        label: 'Custom',
        value: {
            min: 0,
            max: 100,
            isCustom: true,
        },
    },
] as const

const DEFAULT_CUSTOM_PRICE = { min: 0, max: 100 } as const

const FILTER_OPTIONS = [
    { id: 'category', name: 'Category', type: 'checkbox', options: CATEGORIES },
    { id: 'color', name: 'Color', type: 'checkbox', options: COLOR_FILTERS },
    { id: 'size', name: 'Size', type: 'checkbox', options: SIZE_FILTERS },
    { id: 'price', name: 'Price', type: 'radio', options: PRICE_FILTERS },
]

export interface FilterState {
    sort: 'none' | 'price-asc' | 'price-desc'
    category: string[]
    color: string[]
    size: string[]
    price: null | { range: [number, number]; isCustom: boolean }
}

export default function HomePage() {
    const { data: products } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const { data } = await axios.get<QueryResult<Product>[]>(
                'http://localhost:3000/api/products',
                {
                    params: filter,
                }
            )
            return data
        },
    })
    const router = useRouter()
    const searchParams = useSearchParams()
    const getFilterQueries = useCallback(() => {
        const sort = searchParams.get('sort')
        let category: string[] | string | null = decodeURIComponent(searchParams.get('category')!)
        category = category ? category.split(',') : []
        let color: string[] | string | null = decodeURIComponent(searchParams.get('color')!)
        color = color ? color.split(',') : []
        let size: string[] | string | null = decodeURIComponent(searchParams.get('size')!)
        size = size ? size.split(',') : []
        let price: string | [number, number] | null = decodeURIComponent(searchParams.get('price')!)
        price = price && (price.split('-') as [number, number])

        return {
            sort,
            category,
            color,
            size,
            price,
        }
    }, [searchParams])

    const { sort, category, color, size, price } = getFilterQueries()

    /* const sort = searchParams.get('sort')
    const category = searchParams.getAll('category')
    const color = searchParams.getAll('color')
    const size = searchParams.getAll('size')
    let price: string | string[] | null = searchParams.get('price')
    price = price && price.split('-') */

    function applyChange(
        filterName: 'sort' | 'category' | 'color' | 'size' | 'price',
        value: string | string[] | object
    ) {
        const params = new URLSearchParams(searchParams.toString())

        if (filterName === 'category') {
            if (category.includes(value as string)) {
                delete category[category.indexOf(value as string)] //delete category if already exists
                params.set('category', category.join(',')) //set new category
            } else {
                category.push(value as string) //add new category
                params.set('category', category.join(',')) /// set new category
            }
        }

        console.log(params.toString())

        router.push(`?${params.toString()}`)
    }

    console.log(category)

    return (
        <main className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24'>
                <h1 className='text-4xl font-bold tracking-tight text-gray-900'>
                    High-quality cotton selection
                </h1>

                <div className='flex items-center'>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='group inline-flex justify-center  text-sm font-medium text-gray-700 hover:text-gray-900'>
                            Sort{' '}
                            <ChevronDown className='-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500' />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align='end'>
                            {SORT_OPTIONS.map((option) => (
                                <button
                                    key={option.label}
                                    className={cn(
                                        'text-left w-full block px-4 py-2 text-sm text-gray-500',
                                        {
                                            'text-gray-900 bg-gray-100': option.value === sort,
                                        }
                                    )}
                                    onClick={() => applyChange('sort', option.value)}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <button className='-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6'>
                        <Filter className='h-5 w-5' />
                    </button>
                </div>
            </div>

            <section className='pb-24 pt-6'>
                <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
                    {/* Filters */}
                    <div className='hidden lg:block'>
                        <Accordion type='multiple' defaultValue={['category']}>
                            {FILTER_OPTIONS.map(({ id, name, type, options }) => (
                                <AccordionItem value={id} key={id}>
                                    <AccordionTrigger className='py-3 text-sm text-gray-400 hover:text-gray-500'>
                                        <span className='font-medium text-gray-900'>{name}</span>
                                    </AccordionTrigger>
                                    <AccordionContent className='pt-6 animate-none'>
                                        <ul className='space-y-4'>
                                            {options.map((option, index) => (
                                                <li key={index} className='flex items-center'>
                                                    <input
                                                        type={type}
                                                        id={`${id}-${index}`}
                                                        className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                                                        onChange={() => applyChange(id, option.value)}
                                                    />
                                                    <label
                                                        htmlFor={`${id}-${index}`}
                                                        className='ml-3 text-sm text-gray-600'
                                                    >
                                                        {option.label}
                                                    </label>
                                                </li>
                                            ))}
                                            {id === 'price' && (
                                                <>
                                                    <div className='flex justify-between'>
                                                        <p className='font-medium'>Price</p>
                                                        <div>
                                                            {price && price[0]}$ -{'  '}
                                                            {price && price[1]} $
                                                        </div>
                                                    </div>

                                                    <Slider
                                                        className={cn({
                                                            'opacity-50': !!price,
                                                        })}
                                                        disabled={!price}
                                                        min={DEFAULT_CUSTOM_PRICE.min}
                                                        max={DEFAULT_CUSTOM_PRICE.max}
                                                        onValueChange={(value) =>
                                                            applyChange('price', value)
                                                        }
                                                        step={5}
                                                        value={
                                                            price
                                                                ? [price[0], price[1]]
                                                                : [
                                                                      DEFAULT_CUSTOM_PRICE.min,
                                                                      DEFAULT_CUSTOM_PRICE.max,
                                                                  ]
                                                        }
                                                    />
                                                </>
                                            )}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                    {/* Product grid */}
                    <ul className='lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
                        {products && products.length === 0 ? (
                            <EmptyState />
                        ) : products ? (
                            products.map((product) => (
                                <ProductCard key={product.id} product={product.metadata!} />
                            ))
                        ) : (
                            new Array(12).fill(null).map((_, i) => <ProductSkeleton key={i} />)
                        )}
                    </ul>
                </div>
            </section>
        </main>
    )
}
