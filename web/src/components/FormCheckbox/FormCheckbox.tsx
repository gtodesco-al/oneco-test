import { useField } from 'formik'
import { ReactNode } from 'react'
import Checkbox from '../Checkbox/Checkbox'

interface FormCheckboxProps {
  label: ReactNode
  name: string
  checkboxCentered?: boolean
}
export const FormCheckbox = ({
  label,
  name,
  checkboxCentered = true,
}: FormCheckboxProps) => {
  const [field, , helpers] = useField({ name, type: 'checkbox' })

  return (
    <Checkbox
      label={label}
      checkboxCentered={checkboxCentered}
      id={name}
      name={name}
      checked={field.checked}
      onChange={helpers.setValue}
    />
  )
}
