import classNames from 'classnames'
import { ReactNode } from 'react'

type CheckboxProps = {
  id: string
  name: string
  label: ReactNode
  checked?: boolean
  checkboxCentered?: boolean //Checkboxes with more complex or larger labels may not be centered with that content
  onChange: (state: boolean) => void
}

const Checkbox = ({
  id,
  name,
  label,
  checked = false,
  checkboxCentered = true,
  onChange,
}: CheckboxProps) => {
  return (
    <div
      className={classNames('relative flex', {
        'items-center': checkboxCentered,
      })}
    >
      <div className="flex items-center h-5">
        <input
          type="checkbox"
          className="h-4 w-4 text-gray-900 border-gray-300 rounded"
          id={id}
          name={name}
          onChange={(v) => onChange(v.target.checked)}
          checked={checked}
        />
      </div>
      <div className="ml-3 text-xs">
        <label htmlFor={id} className="font-medium text-gray-700">
          {label}
        </label>
      </div>
    </div>
  )
}

export default Checkbox
