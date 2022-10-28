import { XIcon } from '@heroicons/react/solid'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableProvided,
  DroppableProvided,
} from 'react-beautiful-dnd'

import Button from '../Button/Button'
import { HasPermission } from '../HasPermission/HasPermission'

import DraggableItem from './DraggableItem/DraggableItem'

export type DraggableItemListItem = {
  id: string
  header: string
  description: string
  active?: boolean
  locked?: boolean
  priv?: string
}

export type DraggableItemListProps = {
  header?: string
  subTitle?: string
  items: DraggableItemListItem[]
  onListChanged(items: DraggableItemListItem[]): void
  handleClose(): void
}

const DraggableItemList = ({
  header,
  subTitle,
  items: listItems,
  onListChanged,
  handleClose,
}: DraggableItemListProps) => {
  const { t } = useTranslation('DraggableItemList')

  const reorder = useCallback(
    (list: DraggableItemListItem[], startIndex: number, endIndex: number) => {
      const result = Array.from(list)
      const [removed] = result.splice(startIndex, 1)
      result.splice(endIndex, 0, removed)
      return result
    },
    []
  )

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return
      const items = reorder(
        listItems,
        result.source.index,
        result.destination.index
      )
      onListChanged([...items])
    },
    [reorder, listItems]
  )

  const onActiveChanged = useCallback(
    (item: DraggableItemListItem, active: boolean) => {
      item.active = active
      onListChanged([...listItems])
    },
    [listItems]
  )

  return (
    <div className="flex flex-col h-full w-96 fixed top-0 right-0 bg-white p-6 shadow z-50">
      <div className="flex justify-between items-center">
        <h1 className="text-gray-900 font-semibold text-lg">
          {header ? header : t('dashboard widget settings')}
        </h1>
        <Button
          buttonType="outline"
          onClick={handleClose}
          icon={<XIcon className="w-5 h-5 text-gray-400" />}
        />
      </div>
      <div className="flex-1 flex-col mt-4 overflow-y-auto h-">
        <div className="flex py-3 items-center mb-5">
          <span className="text-sm text-gray-600">
            {subTitle
              ? subTitle
              : t(
                  'enable and reorder the widgets you would like to see on your dashboard'
                )}
          </span>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided: DroppableProvided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {listItems.map(
                  (item, index) =>
                    item.header && (
                      <HasPermission permission={item.priv}>
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided: DraggableProvided) => (
                            <div
                              className="mb-5"
                              key={item.id}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <DraggableItem
                                item={item}
                                onActiveChanged={(active) =>
                                  onActiveChanged(item, active)
                                }
                              />
                            </div>
                          )}
                        </Draggable>
                      </HasPermission>
                    )
                )}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  )
}

export default DraggableItemList
