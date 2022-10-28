import { Switch } from '@headlessui/react'
import classNames from 'classnames'
import { ReactNode } from 'react'

interface VirtualTerminalSectionProps {
  header?: string

  /**
   * If provided, will display a subheader under the main header. If not provided, no subheader is displayed.
   */
  subheader?: string

  /**
   * If provided, the field can be toggled open.  If not provided, toggle is hidden and contents are always open.
   */
  open?: boolean
  setOpen?: (value: boolean) => void
  children: ReactNode
}

/** Provides base markup and styling for Virtual Terminal sections */
export const VirtualTerminalSection = ({
  header,
  subheader,
  open,
  setOpen = () => undefined,
  children,
}: VirtualTerminalSectionProps) => {
  return (
    <section>
      <div className="flex justify-between">
        {header && (
          <header className={classNames({ 'mb-5': open ?? true })}>
            <h1 className="text-xl font-medium text-gray-700">{header}</h1>
            {subheader && (
              <h2 className="text-sm text-gray-500">{subheader}</h2>
            )}
          </header>
        )}
        {open !== undefined && (
          // TODO fix switch styling in mobile view
          <Switch
            checked={open}
            onChange={setOpen}
            className={`${
              open ? 'bg-primary-color' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Show content</span>
            <span
              className={`${
                open ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white`}
            />
          </Switch>
        )}
      </div>
      {(open ?? true) && children}
    </section>
  )
}

export default VirtualTerminalSection
