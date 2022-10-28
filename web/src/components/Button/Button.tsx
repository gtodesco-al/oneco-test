import { ButtonHTMLAttributes, ReactElement } from 'react'
import classNames from 'classnames'

export type ButtonProps = {
  isEnabled?: boolean
  isLink?: boolean
  buttonType?: 'primary' | 'outline' | 'bordered'
  icon?: ReactElement
  circular?: boolean
  centerAlign?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({
  buttonType = 'primary',
  icon: Icon,
  isEnabled,
  isLink,
  className,
  children,
  circular = false,
  centerAlign = true,
  ...rest
}: ButtonProps) => {
  const classNamesStyles = classNames(
    className,
    'flex items-center text-sm font-medium transition-all',
    {
      ['justify-center']: centerAlign,
      'px-4 py-2 rounded-full rounded-md': !circular, //Added because buttons were initially designed with this padding in all cases.  Circular buttons specifically need to not have this.
      'rounded-full': circular,
      ['bg-primary-color text-white']: buttonType === 'primary',
      ['bg-gray-100 text-gray-700']: buttonType === 'outline' && isEnabled,
      ['hover:bg-gray-100 text-gray-700']: buttonType === 'outline',
      ['underline decoration-1 hover:bg-white bg-white underline-offset-2 text-gray-700']:
        isLink,
      ['bg-gray-100 text-gray-700 border-solid border border-gray-300']:
        buttonType === 'bordered' && isEnabled,
      ['hover:bg-gray-100 text-gray-700 border-solid border border-gray-300']:
        buttonType === 'bordered',
    }
  )

  return (
    <button type="button" className={classNamesStyles} {...rest}>
      {children} {Icon && Icon}
    </button>
  )
}

export default Button
