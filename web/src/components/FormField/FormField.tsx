import { ErrorMessage } from 'formik'
import { ReactNode } from 'react'
import { FieldLabel } from '../FieldLabel/FieldLabel'

interface FormErrorMessageProps {
  name: string
  errorMessage?: ErrorMessageText
}

/**
 * Either returns a plain error message or converts an error
 * string or error object into a string error message
 */
export type ErrorMessageText = string | ((error: any) => string)

const getErrorMessage = (
  error: any,
  errorMessage: ErrorMessageText = (error) => error.message || error
) => {
  if (typeof errorMessage === 'string') {
    return errorMessage
  }

  return errorMessage(error)
}

const FormErrorMessage = ({ name, errorMessage }: FormErrorMessageProps) => (
  <div className="h-4 mt-1 text-xs text-red-500">
    <ErrorMessage name={name}>
      {(error: any) => (
        <span role="alert">{getErrorMessage(error, errorMessage)}</span>
      )}
    </ErrorMessage>
  </div>
)

interface FormFieldProps {
  label: string
  name: string
  required?: boolean
  errorMessage?: ErrorMessageText
  children: ReactNode
}

export const FormField = ({
  label,
  name,
  required = false,
  children,
  errorMessage,
}: FormFieldProps) => (
  <div>
    <FieldLabel name={name} required={required}>
      {label}
    </FieldLabel>
    {children}
    <FormErrorMessage name={name} errorMessage={errorMessage} />
  </div>
)
