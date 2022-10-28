import { useEffect, useState } from 'react'

const MOBILE_BREAKPOINT = 768

export const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= MOBILE_BREAKPOINT
  )

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    }

    window.addEventListener('resize', handleWindowResize)

    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  return {
    isMobile,
  }
}
