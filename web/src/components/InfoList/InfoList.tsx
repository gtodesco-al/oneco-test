import classNames from 'classnames'
import { ReactNode } from 'react'

interface InfoListProps {
  className?: string
  children: ReactNode
}

/* Used for various read-only lists of data in the application */
export const InfoList = ({ className = '', children }: InfoListProps) => (
  <dl
    className={classNames(
      'grid gap-5 grid-cols-2 mobile:flex mobile:flex-col',
      className
    )}
  >
    {children}
  </dl>
)

interface InfoListItemProps {
  title: string
  children: ReactNode
  fullWidth?: boolean
}

InfoList.Item = ({ title, children, fullWidth = false }: InfoListItemProps) => (
  <div
    className={classNames('text-sm flex gap-1', {
      'col-span-2': fullWidth,
    })}
  >
    <dt className="text-gray-600">{title}</dt>
    <dd className="font-medium text-gray-900">{children}</dd>
  </div>
)
