import classNames from 'classnames'
import * as yup from 'yup'
import { Field, FieldProps } from 'formik'
import { ReactNode } from 'react'
import Input from '../../components/Input/Input'
import { useTranslation } from 'react-i18next'

interface PasswordInputProps {
  name: string
  label: string
  placeholder?: string
  touched?: boolean //Required to show "gray" pegs before field has been edited.
}

//These are exported for testing so that tests don't have to be rewritten for color changes.
export const PasswordInputIndicatorColors = {
  error: 'bg-red-500',
  neutral: 'bg-gray-300',
  pass: 'bg-green-400',
}

/**
 * Provides a more advanced field for authenticating password inputs in Formik forms.
 *
 * Formik's "validate" function can't handle multiple errors, so we have to use a custom validation solution for this field.
 * Also, because the validate property is defined on "Field" and the value of the field is not available at that level, we can't
 * stash the result of the validation check so we have to check the validation function twice.  Otherwise we'd have to implement
 * the check for the rules in the form using this input or make the API for this input more complex.
 */
export const PasswordInput = ({
  name,
  label,
  placeholder = '',
  touched = false,
}: PasswordInputProps) => {
  const { t } = useTranslation('CreateNewPassword')

  //Error types are defined here so that the messages can be translated.
  const errorTypes = [
    {
      message: t('at least one letter (upper or lower case)'),
      validator: yup.string().matches(/[a-zA-Z]/),
    },
    {
      message: t('at least one number'),
      validator: yup.string().matches(/\d/),
    },
    {
      message: t('at least 8 characters'),
      validator: yup.string().min(8),
    },
    {
      message: t('at least 1 special character (!, @, #, etc.)'),
      validator: yup.string().matches(/[^\da-zA-Z\s]/),
    },
  ]

  const getPasswordErrors = (password: string) =>
    errorTypes.reduce<string[]>((errors, { message, validator }) => {
      try {
        validator.validateSync(password)
        return errors
      } catch (err) {
        return [...errors, message]
      }
    }, [])

  return (
    <div className="flex flex-col gap-1">
      <Field
        name={name}
        validate={(value: string) =>
          getPasswordErrors(value).length > 0 ? 'invalid password' : undefined
        }
      >
        {({ field }: FieldProps) => {
          const errors = getPasswordErrors(field.value)

          return (
            <>
              <Input
                id={name}
                label={label}
                placeholder={placeholder}
                hasError={errors.length > 0}
                type="password"
                {...field}
              />
              <ul className="contents text-xs">
                {errorTypes.map(({ message }) => (
                  <PasswordInputError
                    key={message}
                    touched={touched}
                    isError={errors.includes(message)}
                  >
                    {message}
                  </PasswordInputError>
                ))}
              </ul>
            </>
          )
        }}
      </Field>
    </div>
  )
}

interface PasswordInputErrorProps {
  isError?: boolean
  touched?: boolean
  children: ReactNode
}

const PasswordInputError = ({
  isError = false,
  touched = false,
  children,
}: PasswordInputErrorProps) => (
  <li className="flex items-center" aria-hidden={!isError}>
    <div
      aria-hidden
      className={classNames(
        'inline-block w-[0.375rem] h-[0.375rem] mr-1 rounded',
        {
          [PasswordInputIndicatorColors.pass]: !isError,
          [PasswordInputIndicatorColors.neutral]: isError && !touched,
          [PasswordInputIndicatorColors.error]: isError && touched,
        }
      )}
    />
    {children}
  </li>
)
