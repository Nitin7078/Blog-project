import React , {useId} from 'react';

function Select({
    options,
    label,
    className="",
    ...props

} , ref){
    const id = useId();
    return (
        <div className='w-full'>
            {label && <label htmlFor={id} className='block text-sm font-medium text-gray-700'>{label}</label>}
            <select
                id={id}
                ref={ref}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${className}`}
                {...props}
                >
                    {options?.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select);