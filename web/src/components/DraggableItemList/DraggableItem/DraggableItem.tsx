import { LockClosedIcon } from '@heroicons/react/solid'
import { ArrowsExpandIcon } from '@heroicons/react/outline'
import { useState } from 'react'

import classNames from 'classnames'

import Switch from '../../Switch/Switch'
import { DraggableItemListItem } from '../DraggableItemList'

export type DraggableItemProps = {
  item: DraggableItemListItem
  onActiveChanged: (state: boolean) => void
}

const DraggableItem = ({ item, onActiveChanged }: DraggableItemProps) => {
  const [isGrabbing, setIsGrabbing] = useState(false)

  const draggableItemClasses = classNames(
    'flex w-full items-center justify-between',
    {
      ['cursor-grabbing']: isGrabbing,
      ['cursor-grab']: !isGrabbing,
    }
  )

  return (
    <div
      className={draggableItemClasses}
      key={item.id}
      onMouseDown={() => setIsGrabbing(true)}
      onMouseUp={() => setIsGrabbing(false)}
    >
      <div className="flex items-center flex-1 w-full mr-2">
        <ArrowsExpandIcon className="rotate-45 w-4 h-4 text-gray-400 mr-4" />
        <div className="flex flex-col w-full flex-1 select-none">
          <h2 className="text-gray-900 text-sm font-medium">{item.header}</h2>
          <p className="mt-1 text-xs text-gray-500">{item.description}</p>
        </div>
      </div>
      {item.locked && <LockClosedIcon className="w-7 h-7 text-gray-400" />}
      {item.active !== undefined && !item.locked && (
        <Switch
          active={item.active}
          handleChange={(newState) => onActiveChanged(newState)}
        />
      )}
    </div>
  )
}

export default DraggableItem
