import { useField } from 'formik'
import Typeahead from '../Typeahead/Typeahead'

interface FormTypeaheadProps {
  label: string
  ariaClearLabel: string
  name: string
  placeholder?: string
  source: string[] | ((filter: string) => Promise<string[]>)
}

export const FormTypeahead = ({
  label,
  ariaClearLabel,
  name,
  placeholder = '',
  source,
}: FormTypeaheadProps) => {
  const [field, , helpers] = useField<string | undefined>(name)

  return (
    <Typeahead
      label={label}
      ariaClearLabel={ariaClearLabel}
      placeholder={placeholder}
      source={source}
      value={field.value}
      onChange={(value) => helpers.setValue(value)}
    />
  )
}
