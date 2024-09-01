import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Slider } from '@/components/ui/slider'
import useQueryParam from '@/hooks/useQueryParam'
import { cn } from '@/lib/utils'
import InputGroup from '../input-group'

interface PriceFilterType {
    label: string
    value: [number, number]
}

const PRICE_FILTERS: PriceFilterType[] = [
    {
        label: 'Under 10$',
        value: [0, 10],
    },
    {
        label: 'Under 20$',
        value: [0, 20],
    },
]

const DEFAULT_CUSTOM_PRICE = [0, 20] as [number, number]
const CUSTOM_PRICE_LIMIT = [0, 100] as [number, number]

export default function PriceFilter() {
    const [price, setPrice, removePrice] = useQueryParam<number[]>('price', undefined, 'array')

    const isCustomPrice = price.length === 3

    function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPrice(e.target.value, true)
    }

    function handleCustomPriceChange(range: [number, number]) {
        setPrice(`${range.join(',')},1`, true)
    }

    const priceRange = price.length > 0 ? [Number(price[0]), Number(price[1])] : DEFAULT_CUSTOM_PRICE

    return (
        <AccordionItem value={'price'} key={'price'}>
            <AccordionTrigger className='py-3 text-sm text-gray-400 hover:text-gray-500'>
                <span className='font-medium text-gray-900'>Price</span>
            </AccordionTrigger>
            <AccordionContent className='pt-6 animate-none'>
                <ul className='space-y-4'>
                    <li className='flex items-center'>
                        <InputGroup
                            label='Any price'
                            type='radio'
                            onChange={() => removePrice()}
                            checked={!isCustomPrice && !price.length}
                        />
                    </li>
                    {PRICE_FILTERS.map((option, index) => (
                        <li key={index} className='flex items-center'>
                            <InputGroup
                                label={option.label}
                                type='radio'
                                value={option.value.join(',')}
                                onChange={handlePriceChange}
                                checked={!isCustomPrice && option.value.join(',') === price.join(',')}
                            />
                        </li>
                    ))}
                    <li className='flex items-center'>
                        <InputGroup
                            label='Custom'
                            type='radio'
                            onChange={() => {
                                setPrice(
                                    price.length > 0
                                        ? `${price.join(',')},1`
                                        : `${DEFAULT_CUSTOM_PRICE.join(',')},1`,
                                    true
                                )
                            }}
                            checked={isCustomPrice}
                        />
                    </li>
                </ul>

                {isCustomPrice && (
                    <>
                        <div className='flex justify-between mb-2 mt-3'>
                            <p className='font-medium'>Price</p>
                            <div>
                                {priceRange[0]}$ - {priceRange[1]}$
                            </div>
                        </div>
                        <Slider
                            className={cn({ 'opacity-50': !isCustomPrice })}
                            disabled={!isCustomPrice}
                            min={CUSTOM_PRICE_LIMIT[0]}
                            max={CUSTOM_PRICE_LIMIT[1]}
                            onValueChange={handleCustomPriceChange}
                            step={5}
                            value={priceRange}
                        />
                    </>
                )}
            </AccordionContent>
        </AccordionItem>
    )
}
