import { useState } from 'react'
import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/solid'

type NotificationProps = {
  children: React.ReactNode
  type?: 'error' | 'success'
  onClose?: () => void
  timeout?: number
}

export const Notification = ({
  onClose,
  children,
  type,
  timeout = 5000,
}: NotificationProps) => {
  const [visible, setVisible] = useState(true)
  const close = () => {
    setVisible(false)
    if (typeof onClose === 'function') {
      onClose()
    }
  }

  if (timeout !== 0) {
    setTimeout(close, timeout)
  }

  if (!visible) {
    return null
  }

  //The mobile width is calculated as 100vw minus twice the distance from the corner, so that it stays centered.  If the "right" property changes, the calc also has to change.
  return (
    <div
      aria-label="notification"
      aria-live="assertive"
      onClick={close}
      className="absolute flex right-2 top-2 p-6 w-96 mobile:w-[calc(100vw-1rem)] bg-gray-500 rounded-xl items-center space-x-4 text-white z-[100]"
    >
      {type === 'error' && (
        <ExclamationCircleIcon className="mr-1 h-8 w-8 text-red-500"></ExclamationCircleIcon>
      )}
      {type === 'success' && (
        <CheckCircleIcon className="mr-1 h-8 w-8 text-green-500"></CheckCircleIcon>
      )}
      {children}
    </div>
  )
}

export default Notification
