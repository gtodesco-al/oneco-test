import { Menu, Transition } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import { Fragment, ReactNode, useState } from 'react'
import { usePopper } from 'react-popper'
import Portal from '../Portal/Portal'

interface MenuItemProps {
  children: string
  action?: () => void
}

const MenuItem = ({ children, action }: MenuItemProps) => (
  <Menu.Item as="div">
    {({ active }) => (
      <button
        className={classNames(
          'w-full flex justify-between p-3 text-sm font-medium rounded-md text-gray-500',
          {
            'bg-gray-100 text-gray-900 group': active,
          }
        )}
        onClick={action}
        type="button"
      >
        {children}
        <ChevronRightIcon className="hidden text-gray-500 group-hover:inline h-5 w-5" />
      </button>
    )}
  </Menu.Item>
)

interface PopupMenuProps {
  className?: string
  button: ReactNode
  children: ReactNode
}

export const PopupMenu = ({ button, children, className }: PopupMenuProps) => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null)

  const { styles, attributes } = usePopper(anchor, popperElement)

  return (
    <>
      <Menu as="div">
        <Menu.Button as={Fragment}>{button}</Menu.Button>

        <div className="w-0 h-0" ref={setAnchor} />
        <Portal>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Menu.Items
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
              className={classNames(
                'w-max min-w-[16.75rem] rounded-md shadow-sm bg-white focus:outline-none p-2 flex flex-col gap-2 my-2 mr-4',
                className ?? ''
              )}
            >
              {children}
            </Menu.Items>
          </Transition>
        </Portal>
      </Menu>
    </>
  )
}

PopupMenu.Item = MenuItem
