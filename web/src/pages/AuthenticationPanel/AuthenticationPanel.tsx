import { ReactNode } from 'react'

export interface AuthenticationPanelProps {
  title: string
  children: ReactNode
}

/**
 * Provides consistent styling and wrapping for elements in the Authentication section of the application.
 */
export const AuthenticationPanel = ({
  title,
  children,
}: AuthenticationPanelProps) => (
  <div className="text-gray-600 mt-8">
    <h1 className="text-2xl font-semibold mb-4 text-gray-900">{title}</h1>
    {children}
  </div>
)
