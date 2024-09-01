import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import useQueryParam from '@/hooks/useQueryParam'
import InputGroup from '../input-group'

const SIZES = [
    { label: 'XS', value: 'xs' },
    { label: 'S', value: 's' },
    { label: 'M', value: 'm' },
    { label: 'L', value: 'l' },
    { label: 'XL', value: 'xl' },
] as const

export default function SizeFilter() {
    const [sizes, setSize, removeSize] = useQueryParam<string[]>('size', undefined, 'array')

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.checked) setSize(e.target.value)
        else removeSize(e.target.value)
    }

    return (
        <AccordionItem value={'size'} key={'size'}>
            <AccordionTrigger className='py-3 text-sm text-gray-400 hover:text-gray-500'>
                <span className='font-medium text-gray-900'>Size</span>
            </AccordionTrigger>
            <AccordionContent className='pt-6 animate-none'>
                <ul className='space-y-4'>
                    {SIZES.map((option, index) => (
                        <li key={index} className='flex items-center'>
                            <InputGroup
                                label={option.label}
                                type='checkbox'
                                value={option.value}
                                onChange={handleChange}
                                checked={sizes.includes(option.value)}
                            />
                        </li>
                    ))}
                </ul>
            </AccordionContent>
        </AccordionItem>
    )
}
