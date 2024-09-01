import { useId } from 'react'

interface Props extends React.ComponentPropsWithoutRef<'input'> {
    label: string
}

export default function InputGroup({ label, ...rest }: Props) {
    const id = useId()

    return (
        <>
            <input
                id={id}
                className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                {...rest}
            />
            <label htmlFor={id} className='ml-3 text-sm text-gray-600'>
                {label}
            </label>
        </>
    )
}
