import { Product } from '@/data'
import Image from 'next/image'

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className='group relative'>
            <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80'>
                <Image
                    src={product.image}
                    alt='product image'
                    className='h-full w-full object-cover object-center'
                    width={300}
                    height={500}
                />
            </div>
            <div className='mt-4 flex justify-between'>
                <div>
                    <h3 className='text-sm text-gray-700'>{product.name}</h3>
                </div>

                <p className='text-sm font-medium text-gray-900'>{product.price}</p>
            </div>
        </div>
    )
}
