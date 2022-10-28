import { isEmpty } from 'lodash'
import {
  createContext,
  useCallback,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react'
import { Location } from '../api'

type LocationContextState = {
  locations: Location[]
  setLocations(locations: Location[]): void
  selectedLocation: Location
  setSelectedLocation(location: Location): void
  setUserPrimaryLocationID(id: string): void
}

type LocationContextStateProps = {
  children: ReactNode
}

const LocationContext = createContext<LocationContextState>(
  {} as LocationContextState
)

export const LocationProvider = ({ children }: LocationContextStateProps) => {
  const [locations, _setLocations] = useState<Location[]>([] as Location[])
  const [selectedLocation, _setSelectedLocation] = useState<Location>(
    {} as Location
  )
  const [userPrimaryLocationID, _setUserPrimaryLocationID] = useState<
    string | undefined
  >()

  useEffect(() => {
    const selectedLocation = localStorage.getItem('fortis:location')
    if (selectedLocation) {
      try {
        const selected = JSON.parse(selectedLocation)
        if (!isEmpty(selected)) {
          setSelectedLocation(selected)
        }
      } catch (e) {
        console.log(e)
      }
    }

    if (userPrimaryLocationID) {
      const found = locations.find((l) => l.id === userPrimaryLocationID)
      if (found) {
        setSelectedLocation(found)
      }
    }
  }, [locations, userPrimaryLocationID])

  const setSelectedLocation = useCallback((location: Location) => {
    _setSelectedLocation(location)
    if (isEmpty(location)) {
      localStorage.removeItem('fortis:location')
    } else {
      localStorage.setItem('fortis:location', JSON.stringify(location))
    }
  }, [])

  const setLocations = useCallback((locations: Location[]) => {
    _setLocations(locations)
  }, [])

  const setUserPrimaryLocationID = useCallback((id: string) => {
    _setUserPrimaryLocationID(id)
  }, [])

  return (
    <LocationContext.Provider
      value={{
        locations,
        setLocations,
        selectedLocation,
        setSelectedLocation,
        setUserPrimaryLocationID,
      }}
    >
      {children}
    </LocationContext.Provider>
  )
}

export function useLocations(): LocationContextState {
  const context = useContext(LocationContext)
  if (!context) {
    throw new Error('useLocation must be used within an LocationProvider')
  }
  return context
}
