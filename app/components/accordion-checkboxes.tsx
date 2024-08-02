import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

type Props = {
    id: string
    name: string
    options: {
        label: string
        value: string
    }[]
}

export default function AccordionCheckboxes({ filterOptions, filter }: Props) {
    return (
        <AccordionItem value={id} key={id}>
            <AccordionTrigger className='py-3 text-sm text-gray-400 hover:text-gray-500'>
                <span className='font-medium text-gray-900'>{name}</span>
            </AccordionTrigger>
            <AccordionContent className='pt-6 animate-none'>
                <ul className='space-y-4'>
                    {options.map((option) => (
                        <li key={option.value} className='flex items-center'>
                            <input
                                type='checkbox'
                                id={`color-${option.value}`}
                                className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                                checked={filter.color.includes(option.value)}
                            />
                            <label
                                htmlFor={`color-${option.value}`}
                                className='ml-3 text-sm text-gray-600'
                            >
                                {option.label}
                            </label>
                        </li>
                    ))}
                </ul>
            </AccordionContent>
        </AccordionItem>
    )
}
