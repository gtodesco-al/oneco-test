import classNames from 'classnames'
import { useCallback } from 'react'

import { ArrowUpIcon, ArrowDownIcon, FilterIcon } from '@heroicons/react/solid'

type IsFilteredProps = {
  filtered?: string
  sorted?: string
}

function IsFiltered({ filtered, sorted }: IsFilteredProps) {
  const renderArrow = useCallback(() => {
    switch (sorted) {
      case 'ASC':
        return <ArrowUpIcon className="w-3" />
      case 'DESC':
        return <ArrowDownIcon className="w-3" />
      default:
        return null
    }
  }, [sorted])

  return (
    <>
      <FilterIcon
        className={classNames('w-4 ml-3', {
          'text-yellow-500': filtered || sorted,
        })}
      />
      {sorted ? renderArrow() : <div className="w-3" />}
    </>
  )
}

export default IsFiltered
