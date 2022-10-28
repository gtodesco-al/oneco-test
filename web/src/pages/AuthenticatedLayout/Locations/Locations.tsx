import React, { Fragment, useEffect, useState, memo } from 'react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { ExclamationCircleIcon } from '@heroicons/react/outline'

import Input from '../../../components/Input/Input'
import { api, Location } from '../../../api'

import Button from '../../../components/Button/Button'
import { useLocations } from '../../../hooks/useLocations'

type TLocationsProps = {
  locations: Location[]
  showAppDrawer: boolean
}

type TLocationOptionProps = {
  close: (
    focusableElement?:
      | HTMLElement
      | React.MutableRefObject<HTMLElement | null>
      | undefined
  ) => void
  location: Location
}

const LocationOption = ({ location, close }: TLocationOptionProps) => {
  const { setSelectedLocation } = useLocations()
  return (
    <div
      key={location.id}
      className={classNames(
        'flex items-center justify-between cursor-pointer rounded-md bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-900',
        'group flex items-center mt-3 text-left text-sm font-medium'
      )}
    >
      <Button
        buttonType="outline"
        centerAlign={false}
        className="px-3 py-x hover:bg-transparent overflow-hidden whitespace-nowrap"
        onClick={() => {
          setSelectedLocation(location)
          close()
        }}
      >
        {location.name}
      </Button>
      <ChevronRightIcon className="w-5 h-5 text-gray-500 hover:text-gray-900 mr-2 text-right hidden group-hover:block" />
    </div>
  )
}

const Locations = ({ locations, showAppDrawer }: TLocationsProps) => {
  const { selectedLocation } = useLocations()
  const { t } = useTranslation('ApplicationDrawer')
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([])
  const [searchText, setSearchText] = useState<string>()
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>()

  const popOverButtonClasses = {
    default: `group bg-gray-100 flex justify-between rounded-md flex-1 w-full items-center text-base font-medium hover:text-gray-900 ${
      showAppDrawer ? 'pl-1 py-1 pr-2' : 'py-1 px-0'
    }`,
  }
  const transitionProps = {
    enter: 'transition ease-out duration-200',
    enterFrom: 'opacity-0 translate-y-1',
    enterTo: 'opacity-100 translate-y-0',
    leave: 'transition ease-in duration-25',
    leaveFrom: 'opacity-100 translate-y-0',
    leaveTo: 'opacity-0 translate-y-1',
  }

  async function getFilteredLocations(text: string) {
    const locations = (await api.service('locations').find({
      query: {
        filter: {
          name: text,
        },
      },
    })) as Location[]
    setFilteredLocations(locations)
  }

  useEffect(() => {
    setFilteredLocations(locations)
  }, [locations, selectedLocation])

  useEffect(() => {
    if (searchTimeout) clearTimeout(searchTimeout)

    if (searchText) {
      const timeoutID = setTimeout(() => getFilteredLocations(searchText), 1000)
      setSearchTimeout(timeoutID)
    } else {
      setFilteredLocations(locations)
    }
  }, [searchText])

  return (
    <Popover className="relative flex-1">
      {({ close, open }) => {
        // TODO: I do not like this... how do we clear the locations when we are no
        // longer open? Popover does not offer an onClose-type property for us
        // to capture the change in state.
        useEffect(() => {
          if (locations.length > 0 && !open && filteredLocations.length > 0) {
            setFilteredLocations(locations)
          }
        }, [open])

        return (
          <>
            <Popover.Button className={popOverButtonClasses.default}>
              <div className="flex flex-1 items-center">
                <div
                  className={classNames(
                    'flex w-16 h-14 bg-fortis-logo bg-center bg-contain bg-no-repeat',
                    !showAppDrawer && 'w-full mobile:w-0'
                  )}
                />

                {showAppDrawer && (
                  <>
                    <div className="flex flex-1 flex-col ml-2 pt-">
                      <h1 className="text-xs text-gray-500 text-left">
                        Location
                      </h1>
                      <h2 className="text-sm text-gray-900 w-[90px] line-clamp-1 text-left">
                        {selectedLocation?.name}
                      </h2>
                    </div>
                    <ChevronDownIcon
                      className="ml-2 h-5 w-5 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </>
                )}
              </div>
            </Popover.Button>

            <Transition as={Fragment} {...transitionProps}>
              <Popover.Panel className="absolute z-10 left-14 transform -translate-x-14 mt-3 px-2 w-screen max-w-xs sm:px-0">
                <div className="rounded-lg shadow-2xl ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div className=" bg-white p-2 flex flex-col h-64">
                    <Input
                      onInput={({ target }) =>
                        setSearchText((target as HTMLInputElement).value)
                      }
                      placeholder={t('which location youre looking for')}
                    />

                    {filteredLocations.length ? (
                      <div className="flex flex-col flex-1 h-full overflow-y-auto">
                        {filteredLocations.map((location) => (
                          <LocationOption
                            key={location.id}
                            location={location}
                            close={close}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center h-full text-center">
                        <div
                          className="w-16 h-16 rounded-full bg-gray-100 text-gray-500 flex justify-center mb-3 mt-5"
                          aria-hidden
                        >
                          <ExclamationCircleIcon className="w-8" />
                        </div>

                        <p className="text-gray-500 text-sm">
                          {t('sorry, we couldnt find any matches for that')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )
      }}
    </Popover>
  )
}

export default memo(Locations)
