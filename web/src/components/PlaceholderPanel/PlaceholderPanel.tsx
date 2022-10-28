import { ReactNode } from 'react'

export interface PlaceholderPanelProps {
  children: ReactNode
  halfWidth?: boolean
}

/**
 * Provides a wrapper and styling for "placeholder" content within widgets that cannot display their normal information for whatever reason.
 */
export const PlaceholderPanel = ({
  children,
  halfWidth = false,
}: PlaceholderPanelProps) => (
  <div
    className={`flex justify-center px-20 ${
      halfWidth ? 'py-10' : 'py-[4.5rem]'
    } flex flex-col items-center bg-gray-50 text-sm grow`}
  >
    {children}
  </div>
)
