import { useField } from 'formik'
import { FormField } from '../FormField/FormField'
import {
  RadioButton,
  BaseRadioGroup,
  RadioGroupOption,
} from '../RadioGroup/RadioGroup'

interface FormRadioButtonProps {
  name: string
  option: RadioGroupOption
}

const FormRadioButton = ({ name, option }: FormRadioButtonProps) => {
  const [field] = useField({ name, type: 'radio', value: option.value })

  return <RadioButton label={option.label} {...field} />
}

interface FormRadioGroupProps {
  name: string
  label: string
  options: RadioGroupOption[]
}

/**
 * Provides a radio group control to be used within Formik form elements.
 */
export const FormRadioGroup = ({
  name,
  label,
  options,
}: FormRadioGroupProps) => {
  return (
    <FormField label={label} name={name}>
      <BaseRadioGroup>
        {options.map((option) => (
          <FormRadioButton key={option.value} name={name} option={option} />
        ))}
      </BaseRadioGroup>
    </FormField>
  )
}
