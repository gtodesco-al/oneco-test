import {
  Formik,
  FormikConfig,
  FormikProps,
  FormikValues,
  isFunction,
} from 'formik'
import { Schema } from '@fortis/api'
import { ReactNode } from 'react'
import set from 'lodash/set'

interface FormContainerProps<Values> {
  initialValues: Values
  onSubmit: (values: Values) => Promise<void> | void
  className?: string
  children: ReactNode | ((bag: FormikProps<Values>) => ReactNode)
  jsonSchema?: Schema<any>
}

const convertAjvErrors = (errors: any[]) => {
  return errors.reduce((value, error) => {
    if (error.keyword === 'required') {
      value[error.params.missingProperty] = error
    } else {
      const path = error.instancePath.split('/').slice(1)

      set(value, path, error)
    }

    return value
  }, {} as any)
}

/**
 * Provides a simple wrapper to consolidate common <Formik> and <form> markup.
 */
export function FormContainer<Values extends FormikValues>({
  initialValues,
  onSubmit,
  className = '',
  children,
  jsonSchema: schema,
  ...formikProps
}: FormContainerProps<Values> & FormikConfig<Values>) {
  const validate = schema
    ? async (values: any) => {
        try {
          await schema.validate(values)
          return {}
        } catch (error: any) {
          return convertAjvErrors(error.data)
        }
      }
    : () => ({})

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async (value) => {
        await onSubmit(value)
      }}
      {...formikProps}
    >
      {(formikBag) => (
        <form onSubmit={formikBag.handleSubmit} className={className}>
          {isFunction(children) ? children(formikBag) : children}
        </form>
      )}
    </Formik>
  )
}

export default FormContainer
