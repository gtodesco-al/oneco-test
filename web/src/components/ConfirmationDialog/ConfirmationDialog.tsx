import { ReactNode } from 'react'
import Button from '../Button/Button'
import { Modal } from '../Modal/Modal'

interface ConfirmationDialogProps {
  isOpen: boolean
  title?: string
  body: ReactNode
  confirmText: string
  cancelText: string
  onConfirm: () => void | Promise<void>
  onCancel: () => void
}

export const ConfirmationDialog = ({
  isOpen,
  title,
  body,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) => (
  <Modal
    isOpen={isOpen}
    onClose={onCancel}
    title={title}
    body={<p className="w-[25rem]">{body}</p>}
    buttons={
      <>
        <Button
          buttonType="outline"
          className="border bg-gray-50 border-gray-200"
          onClick={onCancel}
        >
          {cancelText}
        </Button>
        <Button
          onClick={async () => {
            await Promise.resolve(onConfirm())
            onCancel()
          }}
        >
          {confirmText}
        </Button>
      </>
    }
  />
)
