import { Listbox } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import classNames from 'classnames'

export interface SelectOption<T> {
  label: string
  value: T
}

interface SelectProps<T> {
  label: string
  showLabel?: boolean
  placeholder?: string
  options: SelectOption<T>[]
  value: T | undefined
  onChange: (value: T) => void
}

export function Select<T>({
  label,
  showLabel = false,
  placeholder = '',
  options,
  value,
  onChange,
}: SelectProps<T>) {
  const selectedOptionLabel =
    options.find((option) => option.value === value)?.label ?? placeholder

  return (
    <Listbox
      as="div"
      aria-label={label}
      className="relative"
      value={value}
      onChange={(value: T) => onChange(value)}
    >
      {showLabel && (
        <Listbox.Label className="text-gray-700 font-medium text-sm">
          {label}
        </Listbox.Label>
      )}
      <Listbox.Button
        className={classNames(
          'h-11 flex justify-between items-center p-3 border border-gray-300 rounded-md w-full font-medium text-sm bg-white hover:border-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500',
          {
            'text-gray-900': selectedOptionLabel !== placeholder,
            'text-gray-400': selectedOptionLabel === placeholder,
          }
        )}
      >
        <span>{selectedOptionLabel}</span>
        <ChevronDownIcon className="h-3" />
      </Listbox.Button>
      <Listbox.Options className="absolute w-full bg-white rounded-md text-sm shadow z-10">
        {options.map(({ label, value }, index) => (
          <Listbox.Option
            key={index}
            value={value}
            className="p-3 cursor-pointer border-b last:border-b-0 hover:bg-gray-300 first:rounded-t-md last:rounded-b-md"
          >
            {label}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}
