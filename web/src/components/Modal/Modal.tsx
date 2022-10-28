import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import { noop } from 'lodash'
import { Fragment, ReactNode } from 'react'
import Portal from '../Portal/Portal'

interface ModalProps {
  //Provides the title element.  If no element is provided, no title element is rendered.
  title?: ReactNode

  //Indicates whether the dialog should be visible.
  isOpen: boolean

  //Provides the functionality for the close button.  If no function is provided, the button is not rendered.
  onClose?: () => void

  //Indicates whether or not clicking outside of the dialog should close it.  If this is false, a close function or some other control will need to be provided for the modal to be closed.
  clickOutToClose?: boolean

  //Provides the body for the modal. If no element is provided, no body is rendered.
  body?: ReactNode

  //Provides the buttons for the modal.  The modal dialog with automatically size and space buttons evenly.  If no elements are provided, this is not rendered.
  buttons?: ReactNode

  //This can be used to make the modal fill the screen instead of being displayed as a modal. Intended for popup forms and similarly large content.
  fullscreenOnMobile?: boolean
}

export const Modal = ({
  title,
  isOpen,
  onClose = noop,
  clickOutToClose = true,
  body,
  buttons,
  fullscreenOnMobile,
}: ModalProps) => (
  <Portal>
    <Transition
      show={isOpen}
      enter="transition duration-100 ease-out"
      enterFrom="transform opacity-0"
      enterTo="transform opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform opacity-100"
      leaveTo="transform opacity-0"
      as={Fragment}
    >
      <Dialog
        open={isOpen}
        onClose={clickOutToClose ? onClose : noop}
        className="absolute left-0 top-0 w-screen h-screen flex justify-center z-[99] overflow-y-auto"
      >
        <Dialog.Panel
          as="div"
          className={classNames(
            'rounded shadow bg-white mt-4 mx-3 p-4 text-sm font-regular w-min h-min max-w-screen',
            {
              'mobile:w-full mobile:mt-0 mobile:mx-0 mobile:rounded-none':
                fullscreenOnMobile,
            }
          )}
        >
          {(title || onClose) && (
            <div className="flex justify-end items-center mb-6">
              {title && (
                <Dialog.Title as="h1" className="text-lg font-semibold mr-auto">
                  {title}
                </Dialog.Title>
              )}

              {onClose !== noop && (
                <button
                  className="hover:bg-gray-100 text-gray-700 rounded-full p-1"
                  onClick={onClose}
                >
                  <XIcon className="w-5 h-5 text-gray-400" />
                </button>
              )}
            </div>
          )}

          {body && (
            <Dialog.Description as="div" className="mb-6">
              {body}
            </Dialog.Description>
          )}

          {buttons && <div className="grid grid-flow-col gap-6">{buttons}</div>}
        </Dialog.Panel>
      </Dialog>
    </Transition>
  </Portal>
)
