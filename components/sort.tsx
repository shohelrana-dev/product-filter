'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import useQueryParam from '@/hooks/useQueryParam'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

const SORT_OPTIONS = [
    { label: 'None', value: 'none' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
] as const

export default function Sort() {
    const [sort, setSort] = useQueryParam('sort')

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='group inline-flex justify-center  text-sm font-medium text-gray-700 hover:text-gray-900'>
                {sort && sort !== 'none'
                    ? SORT_OPTIONS.find((option) => option.value === sort)?.label
                    : 'Sort'}{' '}
                <ChevronDown className='-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500' />
            </DropdownMenuTrigger>

            <DropdownMenuContent align='end'>
                {SORT_OPTIONS.map((option) => (
                    <button
                        key={option.label}
                        className={cn('text-left w-full block px-4 py-2 text-sm text-gray-500', {
                            'text-gray-900 bg-gray-100': option.value === sort,
                        })}
                        onClick={() => setSort(option.value)}
                    >
                        {option.label}
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
