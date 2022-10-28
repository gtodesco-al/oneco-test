import { ReactNode } from 'react'
import { Modal } from '../Modal/Modal'

interface PopupFormProps {
  title: string
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export const PopupForm = ({
  title,
  isOpen,
  onClose,
  children,
}: PopupFormProps) => (
  <Modal
    isOpen={isOpen}
    clickOutToClose={false}
    fullscreenOnMobile
    title={<span className="text-lg font-semibold">{title}</span>}
    onClose={onClose}
    body={<div className="w-[40rem] mobile:w-auto">{children}</div>}
  />
)
