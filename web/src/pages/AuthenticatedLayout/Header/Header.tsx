import classNames from 'classnames'
import { Dispatch, Fragment, SetStateAction } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import {
  ChevronDownIcon,
  ChevronRightIcon,
  LogoutIcon,
  UserIcon,
} from '@heroicons/react/solid'
import { ViewListIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Location, User } from '../../../../../api'

import { api } from '../../../api'
import { HasPermission } from '../../../components/HasPermission/HasPermission'
import { useLocations } from '../../../hooks/useLocations'

type AuthenticatedHeaderProps = {
  user: User
  showAppDrawer: boolean
  setShowAppDrawer: Dispatch<SetStateAction<boolean>>
}

export function AuthenticatedHeader({
  user,
  showAppDrawer,
  setShowAppDrawer,
}: AuthenticatedHeaderProps) {
  const { t } = useTranslation('AuthenticatedHeader')
  const { setSelectedLocation } = useLocations()

  //Header is set to top z-index to ensure it isn't overlapped by page contents.
  return (
    <div className="AuthenticatedHeader z-50">
      <Disclosure as="nav" className="bg-white shadow">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 lg:justify-end">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <button
                  type="button"
                  className="bg-white p-1 md:mr-4 rounded-full text-gray-400 hover:text-gray-500 block md:hidden"
                  data-testid="show-app-drawer"
                  onClick={() => setShowAppDrawer(!showAppDrawer)}
                >
                  <span className="sr-only">
                    {t('open application drawer')}
                  </span>

                  <ViewListIcon
                    className="app-drawer-open h-6 w-6"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button
                      className="relative inline-flex items-center px-4 py-2 border border-solid text-sm text-gray-600 font-medium rounded-md bg-white shadow-sm hover:bg-gray-100 focus:outline-none"
                      data-testid="quick-access-button"
                    >
                      <span>Quick Access</span>
                      <ChevronDownIcon
                        className="-mr-1 ml-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-max rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                      <div className="py-1">
                        <HasPermission permission="v2.transactions.post">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/payments/virtual-terminal"
                                className={classNames(
                                  'flex px-4 py-2 text-sm text-gray-700',
                                  {
                                    'bg-gray-100': active,
                                  }
                                )}
                              >
                                {t('run transaction')}
                                <ChevronRightIcon className="ml-auto h-5 w-5 section-icon" />
                              </Link>
                            )}
                          </Menu.Item>
                        </HasPermission>
                        <HasPermission permission="v2.recurrings.post">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/payments/recurring"
                                className={classNames(
                                  'flex px-4 py-2 text-sm text-gray-700',
                                  {
                                    'bg-gray-100': active,
                                  }
                                )}
                              >
                                {t('create recurring payment')}
                                <div className="">
                                  <ChevronRightIcon className="ml-auto h-5 w-5 section-icon" />
                                </div>
                              </Link>
                            )}
                          </Menu.Item>
                        </HasPermission>
                        <HasPermission permission="v2.quickinvoices.post">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/payments/quick-invoice"
                                className={classNames(
                                  'flex px-4 py-2 text-sm text-gray-700',
                                  {
                                    'bg-gray-100': active,
                                  }
                                )}
                              >
                                {t('create quick invoice')}
                                <ChevronRightIcon className="ml-auto h-5 w-5 section-icon" />
                              </Link>
                            )}
                          </Menu.Item>
                        </HasPermission>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <div className="md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button
                      className="bg-white rounded-full flex text-sm focus:outline-none"
                      data-testid="open-user-menu"
                    >
                      <span className="sr-only">{t('quick access')}</span>
                      <div className="p-2 bg-gray-100 border border-gray-200 rounded-full">
                        <UserIcon className=" flex-shrink-0 h-5 w-5 section-icon fill-fortis-red" />
                      </div>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right z-50 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="mt-1 mb-1 px-4 py-3">
                        <p className="text-sm">{`${user?.first_name} ${user?.last_name}`}</p>
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user?.email}
                        </p>
                      </div>
                      <div className="divide-y divide-gray-100">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/settings/user"
                              className={classNames(
                                'block py-2 text-sm text-gray-700',
                                {
                                  'bg-gray-100': active,
                                }
                              )}
                            >
                              <div className="flex px-4 py-2 hover:bg-gray-100">
                                <LogoutIcon className="mr-3 flex-shrink-0 h-5 w-5 section-icon fill-red-600" />

                                {t('profile settings')}
                              </div>
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/signin"
                              onClick={() => {
                                setSelectedLocation({} as Location)
                                api.logout()
                              }}
                              className={classNames(
                                'block py-2 text-sm text-gray-700',
                                {
                                  'bg-gray-100': active,
                                }
                              )}
                            >
                              <div className="flex px-4 py-2 hover:bg-gray-100">
                                <UserIcon className="mr-3 flex-shrink-0 h-5 w-5 section-icon fill-fortis-red" />
                                {t('log out')}
                              </div>
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  )
}

export default AuthenticatedHeader
