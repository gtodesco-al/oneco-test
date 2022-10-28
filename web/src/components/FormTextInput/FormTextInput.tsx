import classNames from 'classnames'
import { useField } from 'formik'
import { ErrorMessageText, FormField } from '../FormField/FormField'

export interface FormInputProps {
  name: string
  label: string
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
  className?: string
  required?: boolean
  errorMessage?: ErrorMessageText
  autoComplete?: string
}

interface UnlabeledFormTextInputProps
  extends Omit<FormInputProps, 'label' | 'required'> {
  /**
   * If true, placeholder text will be used as the aria label text.
   */
  usePlaceholderAsAriaLabel?: boolean
}

/** This is exported so that the input's style and functionality can be reused by other components */
export const UnlabeledFormTextInput = ({
  name,
  type = 'text',
  placeholder = '',
  usePlaceholderAsAriaLabel = false,
  className = '',
  autoComplete = 'on',
}: UnlabeledFormTextInputProps) => {
  const [field, meta] = useField({
    name,
    type: 'text',
  })

  const stylesInput = classNames(
    'p-3 border border-solid rounded-md bg-transparent w-full h-11 font-medium text-sm text-gray-900 placeholder:text-gray-400',
    className,
    {
      'border-gray-300': meta.error === undefined,
      'border-red-400': meta.error !== undefined,
    }
  )

  return (
    <input
      type={type}
      id={name}
      className={stylesInput}
      placeholder={placeholder}
      aria-label={usePlaceholderAsAriaLabel ? placeholder : undefined}
      autoComplete={autoComplete}
      {...field}
      value={field.value ?? ''}
    />
  )
}

/**
 * Provides a Formik-compatible input that can display error messages.
 */
export const FormTextInput = ({
  name,
  label,
  errorMessage,
  type = 'text',
  placeholder = '',
  required = false,
}: FormInputProps) => (
  <FormField
    label={label}
    name={name}
    required={required}
    errorMessage={errorMessage}
  >
    <UnlabeledFormTextInput name={name} type={type} placeholder={placeholder} />
  </FormField>
)

export default FormTextInput
