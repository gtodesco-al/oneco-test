import { InputHTMLAttributes } from 'react'
import classNames from 'classnames'

export type InputProps = {
  label?: string
  hasError?: boolean
} & InputHTMLAttributes<HTMLInputElement>

export function Input({ className, label, hasError, id, ...rest }: InputProps) {
  const stylesInput = classNames(
    'p-3 border border-solid rounded-md bg-transparent w-full font-medium text-sm text-gray-900',
    {
      'border-gray-300': !hasError,
      'border-red-400': hasError,
    },
    className
  )

  return (
    <>
      {label && (
        <label htmlFor={id} className="font-medium text-gray-700 text-sm mb-1">
          {label}
        </label>
      )}

      <input type="text" id={id} className={stylesInput} {...rest} />
    </>
  )
}

export default Input
