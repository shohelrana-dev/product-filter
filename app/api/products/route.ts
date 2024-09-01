import { products } from '@/data'
import { NextRequest } from 'next/server'

export const GET = async (req: NextRequest) => {
    const searchParams = req.nextUrl.searchParams
    const sort = searchParams.get('sort')
    const categories = searchParams.get('category')?.split(',')
    const sizes = searchParams.get('size')?.split(',')
    const priceRange = searchParams.get('price')?.split(',')

    // Filter products based on search parameters
    const filteredProducts = products.filter((product) => {
        if (categories && !categories.includes(product.category)) return false
        if (sizes && !sizes.includes(product.size)) return false
        if (
            (priceRange && product.price < parseInt(priceRange[0])) ||
            (priceRange && product.price > parseInt(priceRange[1]))
        )
            return false
        return true
    })

    // Sort products based on sort parameter
    if (sort === 'price_asc') {
        filteredProducts.sort((a, b) => a.price - b.price)
    } else if (sort === 'price_desc') {
        filteredProducts.sort((a, b) => b.price - a.price)
    }

    await new Promise((resolve) => setTimeout(resolve, 500))

    return new Response(JSON.stringify(filteredProducts), { status: 200 })
}
