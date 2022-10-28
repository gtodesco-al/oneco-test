import classNames from 'classnames'
import { useField } from 'formik'
import { FormField } from '../FormField/FormField'

export interface FormInputProps {
  name: string
  label: string
  placeholder?: string
  currency?: string
}

/**
 * Provides a Formik-compatible input that can display error messages.
 */
export const FormCurrencyInput = ({
  name,
  label,
  currency,
  placeholder = '0.00',
}: FormInputProps) => {
  const [field, meta] = useField({ name, type: 'text' })

  const stylesInput = classNames(
    'py-3 pl-6 border border-solid rounded-md bg-transparent w-full font-medium text-sm text-gray-900',
    {
      'border-gray-300': meta.error === undefined,
      'border-red-400': meta.error !== undefined,
      'pr-11': currency !== undefined,
      'pr-3': currency === undefined,
    }
  )

  return (
    <FormField label={label} name={name}>
      <div className="relative flex items-center">
        <span className="absolute left-3 text-sm text-gray-500 select-none pointer-events-none">
          $
        </span>
        <input
          type="text"
          id={name}
          className={stylesInput}
          placeholder={placeholder}
          {...field}
          value={field.value ?? ''} //null coalescing used to prevent uncontrolled instances
        />
        {currency && (
          <span
            className="absolute right-3 text-sm text-gray-500 select-none pointer-events-none"
            aria-label="currency"
          >
            {currency}
          </span>
        )}
      </div>
    </FormField>
  )
}

export default FormCurrencyInput
