import { ChevronRightIcon } from '@heroicons/react/outline'
import { DotsHorizontalIcon } from '@heroicons/react/solid'
import { ReactElement, ReactNode } from 'react'
import Button from '../Button/Button'
import { PopupMenu } from '../PopupMenu/PopupMenu'

interface PageHeaderProps {
  /**
   * Text provided above the main header.
   */
  navText: string

  /**
   * Main header text.
   */
  headerText: string

  /**
   * Any buttons or dropdown elements that should display to the right should be inserted as children.
   */
  children?: ReactNode
}

export const PageHeader = ({
  navText,
  headerText,
  children,
}: PageHeaderProps) => (
  <header className="flex justify-between mb-6">
    <div>
      <h2 className="text-xs text-gray-500 mb-1 flex gap-2">
        <span>{navText}</span>
        <ChevronRightIcon className="w-3" />
      </h2>

      <h1 className="text-xl text-gray-900 font-semibold">{headerText}</h1>
    </div>

    {children}
  </header>
)

interface PageHeaderButtonsProps {
  /**
   * Provides a series of buttons to be rendered
   */
  options: {
    /**
     * The name of the option to be displayed.
     */
    name: string

    /**
     * The action to take when the option is clicked.
     */
    action: () => void

    /**
     * Determines whether or not to show the option.  True by default.
     */
    isShown?: boolean

    /**
     * If true, displays the button as a primary button.  False by default.
     */
    primary?: boolean

    /**
     * If provided, will show this icon in the button.
     */
    icon?: ReactElement | undefined
  }[]
}

/**
 * This provides a common markup and styling for page header buttons that will display properly across different screen sizes.
 */
PageHeader.Buttons = ({ options }: PageHeaderButtonsProps) => (
  <div className="flex gap-6 relative">
    {options.map(
      ({ name, action, isShown = true, primary = false, icon = undefined }) =>
        isShown && (
          <Button
            type="button"
            key={name}
            buttonType={primary ? 'primary' : 'bordered'}
            onClick={action}
            icon={icon}
            isEnabled
          >
            {name}
          </Button>
        )
    )}

    <PopupMenu
      className="right-0 top-11 xl:hidden"
      button={
        <Button
          type="button"
          className="w-11 h-11 bg-gray-50 text-sky-700 border-gray-200 shadow-sm xl:hidden"
          buttonType="outline"
          icon={<DotsHorizontalIcon className="w-4" />}
          circular
        />
      }
    >
      {options.reverse().map(
        ({ name, action, isShown = true }) =>
          isShown && (
            <PopupMenu.Item key={name} action={action}>
              {name}
            </PopupMenu.Item>
          )
      )}
    </PopupMenu>
  </div>
)
