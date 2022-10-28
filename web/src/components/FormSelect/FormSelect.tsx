import { useField } from 'formik'
import { FormField } from '../FormField/FormField'
import { Select, SelectOption } from '../Select/Select'

export type FormSelectOption = SelectOption<string>

interface FormSelectProps {
  name: string
  label: string
  placeholder?: string
  options: FormSelectOption[]
}

export const FormSelect = ({
  name,
  label,
  placeholder = '',
  options,
}: FormSelectProps) => {
  const [field, , helpers] = useField(name)

  return (
    <FormField name={name} label={label}>
      <Select
        label={label}
        placeholder={placeholder}
        options={options}
        value={field.value}
        onChange={helpers.setValue}
      />
    </FormField>
  )
}

export default FormSelect
