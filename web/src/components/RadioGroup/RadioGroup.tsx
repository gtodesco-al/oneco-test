import classNames from 'classnames'
import { ChangeEventHandler, FocusEventHandler, ReactNode } from 'react'
import { FieldLabel } from '../FieldLabel/FieldLabel'

interface RadioButtonProps {
  name: string
  checked?: boolean
  value: string
  label: string
  onBlur?: FocusEventHandler<HTMLInputElement>
  onChange?: ChangeEventHandler<HTMLInputElement>
  outline?: boolean
}

export const RadioButton = ({
  name,
  checked,
  value,
  label,
  onBlur = undefined,
  onChange = undefined,
  outline = false,
}: RadioButtonProps) => {
  const id = name + value //ids are combination of group name and option value to minimize id conflicts on the page.

  return (
    <li>
      <input
        className="peer sr-only"
        id={id}
        type="radio"
        name={name}
        checked={checked}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
      />

      <label
        className={classNames(
          'border-2 rounded-md h-11 px-5 flex items-center justify-start text-sm cursor-pointer bg-white hover:bg-gray-50 border-gray-300 hover:border-grey-400 text-gray-700 peer-checked:bg-gray-100 peer-checked:hover:bg-gray-200 peer-checked:text-gray-900 peer-checked:font-semibold peer-checked:border-primary-700 peer-checked:hover:border-primary-900',
          outline &&
            'border-none hover:bg-transparent peer-checked:bg-transparent peer-checked:hover:bg-transparent'
        )}
        htmlFor={id}
      >
        {label}
      </label>
    </li>
  )
}

interface BaseRadioGroupProps {
  verticalOptions?: boolean
  children: ReactNode
}

/**
 * Exported so that other elements can share the markup and styling for this even if they aren't using its onChange functionality
 */
export const BaseRadioGroup = ({
  verticalOptions,
  children,
}: BaseRadioGroupProps) => {
  return (
    <ul
      className={classNames(
        'flex justify-start gap-2 mobile:flex-col',
        verticalOptions && 'flex-col'
      )}
    >
      {children}
    </ul>
  )
}

export interface RadioGroupOption {
  value: string
  label: string
}

interface RadioGroupProps {
  label?: string
  name: string
  options: RadioGroupOption[]
  selectedValue: string
  outline?: boolean
  verticalOptions?: boolean
  onChange: (value: string) => void
}

export const RadioGroup = ({
  label,
  name,
  options,
  selectedValue,
  outline,
  verticalOptions,
  onChange,
}: RadioGroupProps) => (
  <div className="mb-4">
    {label && <FieldLabel>{label}</FieldLabel>}

    <BaseRadioGroup verticalOptions={verticalOptions}>
      {options.map(({ value, label }) => (
        <RadioButton
          key={label}
          value={value}
          label={label}
          name={name}
          outline={outline}
          checked={selectedValue === value}
          onChange={(e) => onChange(e.target.value)}
        />
      ))}
    </BaseRadioGroup>
  </div>
)
