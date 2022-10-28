import classNames from 'classnames'
import { useCallback, useState, useEffect } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'

import { api, Location, User } from '../../api'
import { FullScreenLayout } from '../../components/FullScreenLayout/FullScreenLayout'
import { useLocations } from '../../hooks/useLocations'
import { useUserProfile } from '../../hooks/useUserProfile'
import { useResponsive } from '../../hooks/useResponsive'

import ApplicationDrawer from './ApplicationDrawer/ApplicationDrawer'
import { AuthenticatedHeader } from './Header/Header'
import InactivityModal from './InactivityModal/InactivityModal'
import { ErrorNotification } from '../../components/ErrorNotification/ErrorNotification'

export function AuthenticatedLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { isMobile } = useResponsive()
  const { locations, setLocations, setUserPrimaryLocationID } = useLocations()
  const { userProfile, setUserProfile } = useUserProfile()
  const [authenticated, setAuthenticated] = useState<boolean>(true)
  const [showAppDrawer, setShowAppDrawer] = useState<boolean>(true)
  const [refreshedTokenOn, setRefreshedTokenOn] = useState<number>(0)
  const [expirationMins, setExpirationMins] = useState<number>(15)
  const [modalTimeoutID, setModalTimeoutID] = useState<NodeJS.Timeout>()
  const [showInactivityModal, setShowInactivityModal] = useState<boolean>(false)

  const apiErrorCallback = (error: any) =>
    error.name === 'NotAuthenticated' && setAuthenticated(false)
  useEffect(() => {
    api.on('apiError', apiErrorCallback)
    return () => {
      api.off('apiError', apiErrorCallback)
    }
  }, [])

  useEffect(() => {
    api
      .reAuthenticate(true)
      .then(({ token }) => {
        if (token) {
          setExpirationMins(token.expire)
        }
      })
      .catch(apiErrorCallback)
  }, [expirationMins])

  const refreshTokenCallback = useCallback(
    function (on: number) {
      setShowInactivityModal(false)
      if (modalTimeoutID) clearTimeout(modalTimeoutID)
      setRefreshedTokenOn(on)
    },
    [modalTimeoutID]
  )

  useEffect(() => {
    api.on('refreshToken', refreshTokenCallback)
    return () => {
      api.off('refreshToken', refreshTokenCallback)
    }
  }, [refreshTokenCallback])

  useEffect(() => {
    async function getUser() {
      const user = (await api.service('users').get('me')) as User
      setUserProfile(user)
      setUserPrimaryLocationID(user.primary_location_id)
    }
    getUser()
  }, [])

  useEffect(() => {
    async function getLocations() {
      const locations = (await api.service('locations').find({
        query: {
          filter: {
            relationship: 'direct',
          },
        },
      })) as Location[]
      setLocations(locations)
    }
    getLocations()
  }, [])

  useEffect(() => {
    const seconds = 1000
    const minutes = seconds * 60
    const showModalIn = expirationMins * minutes - 30 * seconds
    if (refreshedTokenOn > 0 && expirationMins > 0) {
      const id = setTimeout(() => setShowInactivityModal(true), showModalIn)
      // We clear any previous timeouts because there could be multiple
      // API requests which means multiple timeouts running. We only want
      // the last timeout to be running.
      if (modalTimeoutID) clearTimeout(modalTimeoutID)
      setModalTimeoutID(id)
    }
  }, [refreshedTokenOn, expirationMins])

  useEffect(() => {
    if (showInactivityModal) {
      // The modal SHOULD be cleared at this moment, so no need for an additional
      // call to `clearTimeout`.
      const seconds = 1000
      const id = setTimeout(() => {
        api.logout()
        navigate('/signin')
      }, 30 * seconds)
      setModalTimeoutID(id)
    }
  }, [showInactivityModal])

  useEffect(() => {
    setShowAppDrawer(!isMobile)
  }, [isMobile])

  if (!authenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />
  }

  if (!userProfile) return null

  return (
    <FullScreenLayout>
      {showInactivityModal && (
        <InactivityModal
          onClickOK={() => {
            api.service('users').get('me')
          }}
        />
      )}
      <ErrorNotification />
      <div
        className={classNames(
          'flex flex-col w-0 items-stretch overflow-visible',
          {
            'w-64': showAppDrawer,
            'fixed z-20 h-full top-16 border-y shadow': isMobile,
            'w-20': !showAppDrawer && !isMobile,
          }
        )}
      >
        <ApplicationDrawer
          showAppDrawer={showAppDrawer}
          setShowAppDrawer={setShowAppDrawer}
          locations={locations}
        />
      </div>
      <div
        className={classNames('flex flex-col flex-1 overflow-y-auto', {
          'overflow-y-hidden': showAppDrawer && isMobile,
        })}
      >
        <AuthenticatedHeader
          user={userProfile}
          showAppDrawer={showAppDrawer}
          setShowAppDrawer={setShowAppDrawer}
        />

        <div
          className={classNames({
            'bg-black z-10 opacity-50 absolute top-16 right-0 left-0 bottom-0 overflow-y-hidden':
              showAppDrawer && isMobile,
          })}
        />
        <div className="my-4 mx-8">
          <Outlet />
        </div>
      </div>
    </FullScreenLayout>
  )
}

export default AuthenticatedLayout
