import { Disclosure, Popover, Transition } from '@headlessui/react'
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
} from '@heroicons/react/solid'
import classNames from 'classnames'
import { Dispatch, SetStateAction, Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { Location } from '@fortis/api'
import packageJSON from '../../../../package.json'
import { HasPermission } from '../../../components/HasPermission/HasPermission'
import Locations from '../Locations/Locations'
import ApplicationDrawerOptions from './ApplicationDrawerOptions'

type NavChild = { name: string; href: string }

function atChildLocation(location: string, children: NavChild[]): boolean {
  return !!children.find((c: NavChild) => location.includes(c.href))
}

type ApplicationDrawerProps = {
  showAppDrawer: boolean
  setShowAppDrawer: Dispatch<SetStateAction<boolean>>
  locations: Location[]
}

function ApplicationDrawer({
  showAppDrawer,
  setShowAppDrawer,
  locations,
}: ApplicationDrawerProps) {
  const { navigation, secondaryNavigation } = ApplicationDrawerOptions()
  const location = useLocation()
  const { t } = useTranslation('ApplicationDrawer')

  const navClasses = {
    default: classNames(
      'flex-1 bg-white flex flex-col justify-between overflow-x-visible border-r border-gray-200 pt-5',
      {
        'px-3': showAppDrawer,
      }
    ),
  }

  return (
    <nav className={navClasses.default} aria-label="Application Navigation">
      <div
        className={classNames(
          'flex',
          !showAppDrawer && 'flex-col items-center'
        )}
      >
        <Locations locations={locations} showAppDrawer={showAppDrawer} />

        <button
          type="button"
          className="bg-white rounded-full text-gray-400 hover:text-gray-500"
          data-testid="show-app-drawer"
          onClick={() => setShowAppDrawer(!showAppDrawer)}
        >
          <ChevronDoubleLeftIcon
            className={classNames(
              'text-gray-500 w-5 h-5 md:block hidden',
              !showAppDrawer && 'rotate-180 closed-arrow mt-2',
              showAppDrawer && 'ml-2'
            )}
          />
        </button>
      </div>
      <div className="space-y-1 flex-1 flex flex-col mt-2">
        {navigation.map((item) =>
          !item.children ? (
            <HasPermission somePermissions={item.somePrivs} key={item.name}>
              <Link
                to={item.href}
                className={classNames(
                  'rounded-md my-1',
                  item.href === location.pathname
                    ? 'bg-gray-100 text-gray-900'
                    : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-900',
                  !showAppDrawer && 'items-center justify-center',
                  showAppDrawer && 'pl-3',
                  'group w-full flex items-center py-3 text-sm font-medium section'
                )}
              >
                {item.icon}
                {showAppDrawer && <span className="ml-2">{t(item.name)}</span>}
              </Link>
            </HasPermission>
          ) : showAppDrawer ? (
            <HasPermission somePermissions={item.somePrivs} key={item.name}>
              <Disclosure as="div" className="my-1">
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      className={classNames(
                        'rounded-md',
                        item.href === location.pathname
                          ? 'bg-gray-100 text-gray-900'
                          : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-900',
                        'group w-full flex items-center pl-3 py-3 text-left text-sm font-medium section parent'
                      )}
                    >
                      {item.icon}
                      <span className="flex-1 ml-2">{t(item.name)}</span>
                      <ChevronDownIcon
                        className={classNames(
                          open ||
                            location.pathname.includes(
                              item.name.toLocaleLowerCase()
                            )
                            ? 'text-gray-500 -rotate-180 open-arrow transition-all delay-75'
                            : 'text-gray-500 closed-arrow transition-all delay-75',
                          'mr-2 flex-shrink-0 h-5 w-5'
                        )}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel
                      static={atChildLocation(location.pathname, item.children)}
                      className="space-y-1"
                    >
                      <div className="flex flex-col ml-4 border-l border-l-gray-100">
                        {item.children &&
                          item.children.map((subItem) => (
                            <HasPermission
                              allPermissions={subItem.allPrivs}
                              key={subItem.name}
                            >
                              <Link to={subItem.href}>
                                <div
                                  key={subItem.name}
                                  className={classNames(
                                    'relative flex items-center justify-between cursor-pointer rounded-md',
                                    subItem.href === location.pathname
                                      ? 'bg-gray-100 text-gray-900'
                                      : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-900',
                                    'group flex items-center ml-[6px] p-3 pl-[6px] pr-2 text-left text-sm font-medium section child'
                                  )}
                                >
                                  <div className="absolute border border-gray-100 -left-2 w-3 rounded-l" />
                                  <Disclosure.Button className="relative">
                                    {t(subItem.name)}
                                  </Disclosure.Button>
                                  <ChevronRightIcon className="w-5 h-5 text-gray-500 hover:text-gray-900 text-right hidden group-hover:block" />
                                </div>
                              </Link>
                            </HasPermission>
                          ))}
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </HasPermission>
          ) : (
            <Popover className="relative" key={item.name}>
              {() => (
                <>
                  <Popover.Button
                    className={classNames(
                      'rounded-md',
                      item.href === location.pathname
                        ? 'text-gray-900'
                        : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-900',
                      !showAppDrawer && 'items-center justify-center pl-0',
                      'group w-full flex items-center pl-0 py-2 text-left text-sm font-medium focus:outline-none section parent'
                    )}
                  >
                    {item.icon}
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 w-60 left-20 transform -translate-x-14 mt-1 px-2 max-w-xs sm:px-0">
                      <div className="bg-white py-3 pr-3 shadow-xl rounded-md relative border-l border-l-gray-100">
                        <div className="flex flex-col ml-4 border-l border-l-gray-100">
                          {item.children.map((subItem) => (
                            <div
                              key={subItem.name}
                              className={classNames(
                                'flex items-center justify-between cursor-pointer rounded-md',
                                subItem.href === location.pathname
                                  ? 'border-gray-600 border-l-4 text-gray-900'
                                  : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-900',
                                'group flex items-center ml-[6px] p-3 pl-[6px] pr-2 text-left text-sm font-medium section child'
                              )}
                            >
                              <div className="absolute border border-gray-100 left-4 w-3 rounded-l" />
                              <Popover.Button as={Link} to={subItem.href}>
                                {t(subItem.name)}
                              </Popover.Button>
                              <ChevronRightIcon className="w-5 h-5 text-gray-500 hover:text-gray-900 text-right hidden group-hover:block" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          )
        )}
      </div>

      {showAppDrawer && (
        <div
          className="flex flex-col md:mb-0 mb-16"
          role="group"
          aria-labelledby="support-help"
        >
          {secondaryNavigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="group flex items-center p-3 py-2 text-sm font-normal text-gray-500 hover:text-gray-900 hover:bg-gray-50 secondary-section"
            >
              <span className="truncate">{t(item.name)}</span>
            </a>
          ))}
          <div className="group flex items-center p-3 py-2 text-xs font-normal text-gray-500">
            <span className="truncate">v{packageJSON.version}</span>
          </div>
        </div>
      )}
    </nav>
  )
}

export default ApplicationDrawer
