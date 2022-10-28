import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AccessDenied } from '../components/RouteUnavailable/RouteUnavailable'
import { useUserProfile } from '../hooks/useUserProfile'
import { checkAllPermissions } from '../utils/permissions'

type CanViewPageProps = {
  root: string
  pagePrivs: PagePrivs
}

export type PagePrivs = {
  [key: string]: string[]
}

function findMatchingPrivs(path: string, privs: PagePrivs): string[] | void {
  // TODO how should we deal with paths that would include a variable like:
  // * edit/:contactID
  // * edit/:contactID/something-else
  const toIndex = path.indexOf('/')
  if (toIndex > -1) {
    return privs[path.slice(0, toIndex)]
  }

  return privs[path]
}

function CanViewPage({ root, pagePrivs }: CanViewPageProps) {
  const location = useLocation()
  const { userProfile } = useUserProfile()

  const [pagePath, setPagePath] = useState<string>('')

  useEffect(() => {
    setPagePath(location.pathname.slice(`/${root}/`.length))
  }, [location])

  if (!location || Object.keys(userProfile).length === 0) return null

  const foundPrivs = findMatchingPrivs(pagePath, pagePrivs)

  // If we don't have privs defined, go ahead
  // and render the page (i.e. only check if configured)
  if (!foundPrivs) return <Outlet />

  return !checkAllPermissions(userProfile, ...foundPrivs) ? (
    <AccessDenied />
  ) : (
    <Outlet />
  )
}

export default CanViewPage
