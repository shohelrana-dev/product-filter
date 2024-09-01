import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Filter } from 'lucide-react'
import Filters from './filters'

export default function MobileFilter() {
    return (
        <Sheet>
            <SheetTrigger>
                <button className='-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden'>
                    <Filter className='h-5 w-5' />
                </button>
            </SheetTrigger>
            <SheetContent className='overflow-y-auto'>
                <SheetTitle>Filter prodducts</SheetTitle>

                <Filters />
            </SheetContent>
        </Sheet>
    )
}
