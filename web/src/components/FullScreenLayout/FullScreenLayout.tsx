import { ReactNode } from 'react'

export type FullScreenLayoutProps = {
  children: ReactNode
  className?: string
}

export function FullScreenLayout({
  className,
  children,
}: FullScreenLayoutProps) {
  return (
    <div className={`flex items-stretch h-screen ${className}`}>{children}</div>
  )
}

export default FullScreenLayout
