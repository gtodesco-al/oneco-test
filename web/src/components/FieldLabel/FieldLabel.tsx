interface FieldLabelProps {
  name?: string
  required?: boolean
  children: string
}

/**
 * Exported so that non-FieldLabel labels (ie. Headless UI labels) can use the same classes.
 */
export const FieldLabelClasses = 'font-medium text-gray-700 text-sm mb-1'

/**
 * Provides consistent labeling for Formik and non-Formik inputs.
 */
export const FieldLabel = ({
  name = undefined,
  required = false,
  children,
}: FieldLabelProps) => (
  <label htmlFor={name} className={FieldLabelClasses}>
    {children}{' '}
    {required && (
      <sup className="font-medium text-red-400 text-base top-[1px] leading-none">
        *
      </sup>
    )}
  </label>
)
