import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function useQueryParam<T>(
    name: string,
    defaultValue?: string,
    type: 'array' | 'single' = 'single'
): [T, (value: string, replace?: boolean) => void, (value?: string) => void] {
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString())
        if (!params.has(name) && defaultValue) {
            params.set(name, defaultValue)
        }
        router.push(`?${params.toString()}`, { scroll: false })
    }, [defaultValue, name, router])

    function setQueryParam(value: string, replace = false) {
        const params = new URLSearchParams(searchParams.toString())

        if (type === 'single' || replace) {
            params.set(name, value)
        } else if (type === 'array') {
            const storedValue = params.get(name)
            const storedValues = storedValue ? storedValue.split(',') : []

            // Add the value if it's not in the array
            storedValues.push(value)
            params.set(name, storedValues.join(','))
        }

        router.push(`?${params.toString()}`, { scroll: false })
    }

    function removeQueryParam(value?: string) {
        const params = new URLSearchParams(searchParams.toString())

        if (type === 'array' && value) {
            const storedValue = params.get(name)
            const storedValues = storedValue ? storedValue.split(',') : []

            if (storedValues.includes(value)) {
                storedValues.splice(storedValues.indexOf(value), 1)
                if (storedValues.length > 0) {
                    params.set(name, storedValues.join(','))
                } else {
                    params.delete(name)
                }
            }
        } else {
            params.delete(name)
        }

        router.push(`?${params.toString()}`, { scroll: false })
    }

    const storedValue = searchParams.get(name)

    if (type === 'array') {
        const storedValueArray = storedValue ? storedValue.split(',') : []
        return [storedValueArray as T, setQueryParam, removeQueryParam]
    }

    return [storedValue as T, setQueryParam, removeQueryParam]
}
