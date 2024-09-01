import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import useQueryParam from '@/hooks/useQueryParam'
import InputGroup from '../input-group'

const CATEGORIES = [
    { label: 'T shirts', value: 't-shirts' },
    { label: 'Jackets', value: 'jackets' },
    { label: 'Shirts', value: 'shirts' },
    { label: 'Sweatshirts', value: 'sweatshirts' },
    { label: 'Polo T-shirts', value: 'polo-t-shirts' },
] as const

export default function CategoryFilter() {
    const [categories, setCategory, removeCategory] = useQueryParam<string[]>(
        'category',
        undefined,
        'array'
    )

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.checked) setCategory(e.target.value)
        else removeCategory(e.target.value)
    }

    return (
        <AccordionItem value={'category'} key={'category'}>
            <AccordionTrigger className='py-3 text-sm text-gray-400 hover:text-gray-500'>
                <span className='font-medium text-gray-900'>Category</span>
            </AccordionTrigger>
            <AccordionContent className='pt-6 animate-none'>
                <ul className='space-y-4'>
                    {CATEGORIES.map((option, index) => (
                        <li key={index} className='flex items-center'>
                            <InputGroup
                                label={option.label}
                                type='checkbox'
                                onChange={handleChange}
                                value={option.value}
                                checked={categories.includes(option.value)}
                            />
                        </li>
                    ))}
                </ul>
            </AccordionContent>
        </AccordionItem>
    )
}
